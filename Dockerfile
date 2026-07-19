
FROM node:20-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG VITE_API_BASE_URL
ARG VITE_APP_ENV=production
ARG VITE_ENABLE_MOCK_API=false
ARG VITE_ENABLE_DEVTOOLS=false
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_APP_ENV=$VITE_APP_ENV \
    VITE_ENABLE_MOCK_API=$VITE_ENABLE_MOCK_API \
    VITE_ENABLE_DEVTOOLS=$VITE_ENABLE_DEVTOOLS
RUN pnpm run build

FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1
CMD ["nginx", "-g", "daemon off;"]
