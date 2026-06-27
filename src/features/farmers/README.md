# Farmer Management

Feature module for **Farmer Management** in Agri360 CRM.

## Structure

```
farmers/
├── api/          # Pure HTTP data-access (farmersApi)
├── components/   # Feature-scoped UI (FarmerForm, ...)
├── hooks/        # TanStack Query hooks (useFarmers, useCreateFarmer, ...)
├── pages/        # Route-level pages (FarmersListPage)
├── services/     # Business logic / orchestration (farmersService)
├── schemas/      # Zod validation (farmerSchema)
├── store/        # Zustand UI state (useFarmersStore)
├── types/        # Domain types, DTOs & enums (Farmer, FarmerStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (farmersRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission       |
| ------ | ---------------- |
| View   | `farmers:view`   |
| Create | `farmers:create` |
| Update | `farmers:update` |
| Delete | `farmers:delete` |
| Export | `farmers:export` |

## Usage

```ts
import { useFarmers, FarmerForm, FARMERS_PERMISSIONS } from '@features/farmers';
```
