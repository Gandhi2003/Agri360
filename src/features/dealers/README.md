# Dealer Management

Feature module for **Dealer Management** in Agri360 CRM.

## Structure

```
dealers/
├── api/          # Pure HTTP data-access (dealersApi)
├── components/   # Feature-scoped UI (DealerForm, ...)
├── hooks/        # TanStack Query hooks (useDealers, useCreateDealer, ...)
├── pages/        # Route-level pages (DealersListPage)
├── services/     # Business logic / orchestration (dealersService)
├── schemas/      # Zod validation (dealerSchema)
├── store/        # Zustand UI state (useDealersStore)
├── types/        # Domain types, DTOs & enums (Dealer, DealerStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (dealersRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission       |
| ------ | ---------------- |
| View   | `dealers:view`   |
| Create | `dealers:create` |
| Update | `dealers:update` |
| Delete | `dealers:delete` |
| Export | `dealers:export` |

## Usage

```ts
import { useDealers, DealerForm, DEALERS_PERMISSIONS } from '@features/dealers';
```
