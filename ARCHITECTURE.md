# Agri360 CRM — Architecture & Engineering Guidelines

This document is the single reference for **how Agri360 CRM is built** and **how to extend it**.

---

## 1. Architectural principles

| Principle                  | How it shows up                                                               |
| -------------------------- | ----------------------------------------------------------------------------- |
| **Feature-based**          | Business logic lives in self-contained `features/*` modules                   |
| **Clean architecture**     | `api` (transport) → `services` (domain) → `hooks` (state) → `pages` (UI)      |
| **SOLID**                  | Single-purpose modules, DI via the `apiClient` facade, small composable hooks |
| **Separation of concerns** | Transport, domain, server-state, client-state and presentation are distinct   |
| **Strict typing**          | `strict` + `noUnused*` + `noImplicitReturns`; no `any` in domain code         |
| **Lazy loading**           | Every route page is `React.lazy` + `Suspense`                                 |
| **RBAC everywhere**        | Route guards + `<PermissionGate>` + nav filtering, one permission registry    |

### Dependency direction (never violate)

```
features/*  ─────▶  components/  ─────▶  common/  ─────▶  lib/
    │                                      ▲
    └──────────────▶  app/  ───────────────┘
```

- `common/` and `lib/` know **nothing** about features.
- `components/` are presentational; they may use `common/` but never import a feature.
- `app/` is the composition root — it wires features, providers, router and guards.

---

## 2. Folder tree

```
src/
├── app/
│   ├── router/        # createBrowserRouter, feature.routes (aggregate), navigation.config
│   ├── providers/     # QueryProvider, ToastProvider, AuthProvider, AppProviders
│   ├── layouts/       # DashboardLayout, AuthLayout
│   ├── guards/        # ProtectedRoute, GuestRoute, PermissionGuard
│   └── store/         # auth.store, ui.store, theme.store (Zustand)
│
├── assets/            # images / icons / fonts / svg
│
├── common/
│   ├── api/           # axios, apiClient, interceptor, token, refreshToken, errorHandler
│   ├── hooks/         # useApi, useAuth, usePagination, useDebounce, useModal, …
│   ├── utils/         # pure formatters (currency, date, initials, truncate)
│   ├── constants/     # ROUTES, STORAGE_KEYS, query keys, page sizes
│   ├── types/         # common, api, auth, route domain types
│   ├── services/      # logger (cross-cutting services)
│   ├── validation/    # shared Zod primitives (email, password, phone…)
│   ├── permissions/   # PERMISSIONS registry, ROLE_PERMISSIONS, access-control helpers
│   ├── config/        # type-safe env access
│   └── helpers/       # safe localStorage wrapper
│
├── components/        # ui, table, charts, sidebar, navbar, breadcrumb, empty-state,
│                      # shared (+ re-export folders: forms/inputs/buttons/cards/…)
│
├── features/          # 27 modules — see §5
├── routes/            # NotFoundPage (404), ForbiddenPage (403)
├── styles/            # globals.css + themes.css (design tokens)
├── lib/               # cn() (clsx + tailwind-merge)
└── main.tsx
```

---

## 3. API architecture

All HTTP flows through one layered pipeline. **Feature code never imports `axios` directly.**

```
feature api  →  apiClient (facade)  →  axiosInstance (+interceptors)  →  server
                                            │
                  token.ts ◀───────────────┤ request: inject Bearer
                  refreshToken.ts ◀────────┘ response 401: single-flight refresh + replay
                  errorHandler.ts            normalize → toast (mutations via QueryProvider)
```

| File              | Responsibility                                                     |
| ----------------- | ------------------------------------------------------------------ |
| `axios.ts`        | Bare axios instance (baseURL, timeout, headers)                    |
| `interceptor.ts`  | Request auth header + response 401 → refresh → replay → bounce     |
| `token.ts`        | `tokenStore`: get/set/clear, JWT decode, expiry check              |
| `refreshToken.ts` | Single-flight `/auth/refresh` so concurrent 401s share one request |
| `errorHandler.ts` | `normalizeError` + `handleApiError` (status → friendly toast)      |
| `apiClient.ts`    | Typed `get/post/put/patch/delete` returning parsed `<T>`           |

```ts
// feature/api/*.api.ts
export const farmersApi = {
  list: (params) => apiClient.get<PaginatedResponse<Farmer>>('/farmers', { params }),
  create: (dto) => apiClient.post<Farmer>('/farmers', dto),
};
```

---

## 4. State management

| Kind               | Tool            | Where                                  |
| ------------------ | --------------- | -------------------------------------- |
| **Server state**   | TanStack Query  | feature `hooks/` (`use<Feature>`, …)   |
| **Global client**  | Zustand         | `app/store` (auth, ui, theme)          |
| **Feature client** | Zustand         | feature `store/` (filters, pagination) |
| **Form state**     | React Hook Form | feature `components/*Form.tsx`         |
| **URL state**      | React Router    | `useSearchParams`, route params        |

**Rule:** server data is owned by Query (cache keys are namespaced per feature). Zustand holds only
UI/ephemeral state. Never duplicate server data into Zustand.

---

## 5. Feature module contract

Every feature is identical in shape — predictable, greppable, and independently ownable:

```
features/<name>/
├── api/            # <name>.api.ts        — pure transport (apiClient)
├── services/       # <name>.service.ts    — domain logic / orchestration
├── hooks/          # use<Name>.ts         — TanStack Query hooks
├── components/     # <Entity>Form.tsx …   — feature-scoped UI
├── pages/          # <Name>ListPage.tsx … — route targets (default export)
├── schemas/        # <name>.schema.ts     — Zod + inferred form types
├── store/          # <name>.store.ts      — Zustand UI state
├── types/          # index.ts             — entities, DTOs, enums
├── constants/      # index.ts             — query keys + permissions
├── utils/          # pure helpers
├── routes.ts       # FeatureRoute[] (lazy + permission)
├── index.ts        # public barrel (import surface)
└── README.md
```

### The 27 features

`dashboard · authentication · users · roles · permissions · farmers · dealers · customers ·
suppliers · products · categories · inventory · warehouse · stock · purchase · quotations · sales ·
invoices · payments · delivery · crop · farm-visits · marketing · reports · notifications ·
settings · profile`

`dashboard`, `authentication` and `farmers` are fully implemented; the rest ship a complete,
type-safe CRUD scaffold ready to flesh out.

---

## 6. Routing, lazy loading & guards

- `app/router/feature.routes.ts` aggregates every feature's `routes.ts` into one table.
- `router.tsx` materializes each `FeatureRoute` into a guarded, `Suspense`-wrapped lazy route.
- Public auth pages mount under `AuthLayout`; everything else under
  `ProtectedRoute → DashboardLayout`.

```ts
// feature routes.ts — declarative, no JSX
export const farmersRoutes: FeatureRoute[] = [
  {
    path: 'farmers',
    title: 'Farmer Management',
    permission: FARMERS_PERMISSIONS.VIEW,
    component: () => import('./pages/FarmersListPage'),
  },
];
```

| Guard             | Purpose                                   |
| ----------------- | ----------------------------------------- |
| `ProtectedRoute`  | requires authentication (else → `/login`) |
| `GuestRoute`      | blocks authed users from auth pages       |
| `PermissionGuard` | page-level RBAC (else → `/403`)           |

---

## 7. RBAC model

- **Roles**: `SuperAdmin, Admin, Manager, SalesAgent, FieldOfficer, Viewer`.
- **Permissions**: `<resource>:<action>` strings in `PERMISSIONS` (single registry).
- Effective grants = user's own `permissions[]` ∪ role grants (`ROLE_PERMISSIONS`).
  `SuperAdmin` is wildcard (`*`). **Server remains source of truth.**

```tsx
// UI fragment
<PermissionGate permissions={[PERMISSIONS.FARMERS_CREATE]}>…</PermissionGate>
// imperative
const { can } = usePermissions();
if (can(PERMISSIONS.FARMERS_DELETE)) …
```

---

## 8. Component library

- **Primitives** live in `components/ui/` and are re-exported from `@components`.
- Specialized composites live in `table/`, `charts/`, `sidebar/`, `navbar/`, `breadcrumb/`,
  `empty-state/`, `shared/`. The category folders (`forms/`, `inputs/`, `buttons/`, `cards/`,
  `modal/`, `dropdown/`, `pagination/`, `loaders/`, `alerts/`) re-export their primitives for
  discoverability.
- All controls `forwardRef` and accept `register()` spreads → drop-in for React Hook Form.

```tsx
import { Button, Input, DataTable, Modal, PageHeader } from '@components';
```

---

## 9. TypeScript best practices

- `strict: true` plus `noUnusedLocals/Parameters`, `noImplicitReturns`, `noFallthroughCasesInSwitch`,
  `noImplicitOverride`.
- **No `any`** in domain code (`@typescript-eslint/no-explicit-any` warns).
- Prefer `type` for unions/aliases, `interface` for object/entity shapes.
- `import type { … }` for type-only imports (enforced, inline style).
- Derive form types from Zod via `z.infer<>` — never hand-write a parallel type.
- Discriminated unions over boolean soup (see `AsyncState<T>`).
- Path aliases (`@app`, `@common`, `@components`, `@features`, `@lib`, `@styles`, `@assets`).

---

## 10. Naming conventions

| Thing                   | Convention             | Example                           |
| ----------------------- | ---------------------- | --------------------------------- |
| Component file & symbol | `PascalCase.tsx`       | `DataTable.tsx`                   |
| Hook                    | `useCamelCase.ts`      | `usePagination.ts`                |
| Page (route target)     | `<Name>…Page.tsx`      | `FarmersListPage.tsx`             |
| API module              | `<name>.api.ts`        | `farmers.api.ts`                  |
| Service                 | `<name>.service.ts`    | `farmers.service.ts`              |
| Schema                  | `<name>.schema.ts`     | `farmers.schema.ts`               |
| Store                   | `<name>.store.ts`      | `farmers.store.ts`                |
| Zustand hook            | `use<Name>Store`       | `useFarmersStore`                 |
| Types/enums             | `PascalCase`           | `FarmerStatus`, `CreateFarmerDto` |
| Constants               | `SCREAMING_SNAKE_CASE` | `FARMERS_QUERY_KEY`               |
| Folders                 | `kebab-case`           | `farm-visits/`                    |
| Barrel                  | `index.ts`             | per folder                        |

---

## 11. Theming, dark mode & responsiveness

- Tokens are CSS variables in `styles/themes.css` (light + `.dark`), surfaced as Tailwind colors
  (`bg-background`, `text-foreground`, `border-border`, `bg-primary`…).
- Theme is applied **before paint** (inline script in `index.html`) → no FOUC; toggled via
  `useTheme()` / `useThemeStore`.
- Mobile-first: sidebar collapses to an off-canvas drawer below `lg`; layouts use fluid
  grid/flex with `max-w` containers.

---

## 12. Conventions & guardrails (PR checklist)

- [ ] `pnpm typecheck` and `pnpm lint` pass (zero warnings).
- [ ] New screen is **lazy-loaded** and **permission-guarded**.
- [ ] No `axios` import outside `common/api`; no `import.meta.env` outside `common/config`.
- [ ] No `localStorage` access outside `common/helpers/storage`.
- [ ] Server data via TanStack Query (not Zustand); query keys namespaced per feature.
- [ ] Forms use React Hook Form + Zod; types via `z.infer`.
- [ ] New permission added to `common/permissions` and (if navigable) to `navigation.config`.
- [ ] Feature exposes a clean `index.ts` barrel; cross-feature imports go through it.
- [ ] Husky pre-commit (`lint-staged`) is green.
