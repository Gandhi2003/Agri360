# 🌱 Agri360 CRM

Enterprise-grade agriculture CRM frontend. Built with **React 19, TypeScript, Vite, Tailwind CSS,
React Router v7, TanStack Query/Table, Zustand, React Hook Form + Zod, Axios and Recharts** — using
a **feature-based, clean architecture** with strict typing, lazy loading and role/permission-based
access control (RBAC).

---

## 🚀 Quick start

> **Package manager: [pnpm](https://pnpm.io)** (`pnpm@10`). Enable it with `corepack enable`.

```bash
# 1. Use the right Node version
nvm use            # Node 20+
corepack enable    # activates the pinned pnpm version

# 2. Install
pnpm install

# 3. Configure env
cp .env.example .env   # then edit VITE_API_BASE_URL etc.

# 4. Run
pnpm dev               # http://localhost:5173
```

### Scripts

| Script           | Purpose                                  |
| ---------------- | ---------------------------------------- |
| `pnpm dev`       | Start Vite dev server (HMR)              |
| `pnpm build`     | Type-check (`tsc -b`) + production build |
| `pnpm preview`   | Preview the production build             |
| `pnpm typecheck` | `tsc --noEmit`                           |
| `pnpm lint`      | ESLint (zero warnings allowed)           |
| `pnpm lint:fix`  | ESLint with autofix                      |
| `pnpm format`    | Prettier write                           |

---

## 🐳 Docker deployment

Multi-stage build (pnpm build → nginx static serving with SPA fallback, gzip,
asset caching, security headers and a `/healthz` endpoint).

```bash
# Build (VITE_* env is inlined at build time → pass as build args)
docker build -t agri360-crm \
  --build-arg VITE_API_BASE_URL=https://api.yourdomain.com/v1 .

# Run
docker run -p 8080:80 agri360-crm        # http://localhost:8080

# Or with compose
VITE_API_BASE_URL=https://api.yourdomain.com/v1 docker compose up -d --build
```

| File                 | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `Dockerfile`         | 3-stage build: deps → build → nginx runtime  |
| `nginx.conf`         | SPA routing, caching, gzip, security headers |
| `docker-compose.yml` | One-command build + serve on `:8080`         |
| `.dockerignore`      | Keeps the build context lean                 |

---

## 🧱 Tech stack

| Concern            | Library                                |
| ------------------ | -------------------------------------- |
| UI runtime         | React 19                               |
| Language           | TypeScript (strict)                    |
| Build/dev          | Vite 6                                 |
| Styling            | Tailwind CSS 3 (CSS-variable theming)  |
| Routing            | React Router v7 (data router)          |
| Server state       | TanStack Query v5                      |
| Tables             | TanStack Table v8                      |
| Client state       | Zustand                                |
| Forms + validation | React Hook Form + Zod                  |
| HTTP               | Axios (interceptors, refresh)          |
| Charts             | Recharts                               |
| Icons              | Lucide React (+ React Icons available) |
| Toasts             | React Hot Toast                        |
| Tooling            | ESLint, Prettier, Husky, lint-staged   |

---

## 📁 High-level structure

```
src/
├── app/         # Composition root: router, providers, layouts, guards, store
├── assets/      # images, icons, fonts, svg
├── common/      # Cross-cutting: api, hooks, utils, types, permissions, config…
├── components/  # Reusable, presentational component library
├── features/    # 27 self-contained feature modules (the business logic)
├── routes/      # App-level route pages (404 / 403)
├── styles/      # Global CSS + design tokens
├── lib/         # Tiny framework-agnostic helpers (cn)
└── main.tsx     # Entry
```

See **[ARCHITECTURE.md](./ARCHITECTURE.md)** for the full architecture, conventions and guidelines.

---

## 🔐 Auth & RBAC at a glance

- **JWT** access + refresh tokens (`@common/api/token.ts`), with a single-flight
  silent-refresh interceptor.
- **Route protection** via `ProtectedRoute` / `GuestRoute`.
- **RBAC** via `PermissionGuard` (pages) and `<PermissionGate>` (UI fragments),
  backed by `@common/permissions`.

```tsx
<PermissionGate permissions={[PERMISSIONS.FARMERS_CREATE]}>
  <Button>New Farmer</Button>
</PermissionGate>
```

---

## 🧩 Adding a new feature

Every feature follows an identical shape — copy an existing folder under `features/`:

```
features/<name>/
├── api/ components/ hooks/ pages/ services/ schemas/
├── types/ constants/ utils/ store/
├── routes.ts  index.ts  README.md
```

Then add the route entry to `src/app/router/feature.routes.ts` and a nav item in
`src/app/router/navigation.config.ts`.

---

© Agri360. Licensed for internal/enterprise use.
