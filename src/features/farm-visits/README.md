# Farm Visits

Feature module for **Farm Visits** in Agri360 CRM.

## Structure

```
farm-visits/
├── api/          # Pure HTTP data-access (farmVisitsApi)
├── components/   # Feature-scoped UI (FarmVisitForm, ...)
├── hooks/        # TanStack Query hooks (useFarmVisits, useCreateFarmVisit, ...)
├── pages/        # Route-level pages (FarmVisitsListPage)
├── services/     # Business logic / orchestration (farmVisitsService)
├── schemas/      # Zod validation (farmVisitSchema)
├── store/        # Zustand UI state (useFarmVisitsStore)
├── types/        # Domain types, DTOs & enums (FarmVisit, FarmVisitStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (farmVisitsRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission           |
| ------ | -------------------- |
| View   | `farm-visits:view`   |
| Create | `farm-visits:create` |
| Update | `farm-visits:update` |
| Delete | `farm-visits:delete` |
| Export | `farm-visits:export` |

## Usage

```ts
import { useFarmVisits, FarmVisitForm, FARM_VISITS_PERMISSIONS } from '@features/farm-visits';
```
