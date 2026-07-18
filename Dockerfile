# ───────────────────────────────────────────────────────────────────
# Agri360 CRM — multi-stage production image
# Build:  docker build -t agri360-crm --build-arg VITE_API_BASE_URL=https://api.example.com/v1 .
# Run:    docker run -p 8080:80 agri360-crm
# ───────────────────────────────────────────────────────────────────

# ── Base: Node + pnpm (via corepack) ──
FROM node:20-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /app

# ── Dependencies (cached layer) ──
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# ── Build the static bundle ──
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Vite inlines VITE_* env at build time — pass them as build args.
ARG VITE_API_BASE_URL
ARG VITE_API_TIMEOUT=30000
ARG VITE_APP_NAME="Agri360 CRM"
ARG VITE_APP_VERSION=1.0.0
ARG VITE_APP_ENV=production
ARG VITE_ENABLE_MOCK_API=false
ARG VITE_ENABLE_DEVTOOLS=false
ARG VITE_AUTH_STORAGE_KEY=agri360.auth
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_API_TIMEOUT=$VITE_API_TIMEOUT \
    VITE_APP_NAME=$VITE_APP_NAME \
    VITE_APP_VERSION=$VITE_APP_VERSION \
    VITE_APP_ENV=$VITE_APP_ENV \
    VITE_ENABLE_MOCK_API=$VITE_ENABLE_MOCK_API \
    VITE_ENABLE_DEVTOOLS=$VITE_ENABLE_DEVTOOLS \
    VITE_AUTH_STORAGE_KEY=$VITE_AUTH_STORAGE_KEY
RUN pnpm run build

# ── Runtime: nginx serving the SPA ──
FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1
CMD ["nginx", "-g", "daemon off;"]
