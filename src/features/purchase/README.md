# Purchase

Feature module for **Purchase** in Agri360 CRM.

## Structure

```
purchase/
├── api/          # Pure HTTP data-access (purchaseApi)
├── components/   # Feature-scoped UI (PurchaseForm, ...)
├── hooks/        # TanStack Query hooks (usePurchase, useCreatePurchase, ...)
├── pages/        # Route-level pages (PurchaseListPage)
├── services/     # Business logic / orchestration (purchaseService)
├── schemas/      # Zod validation (purchaseSchema)
├── store/        # Zustand UI state (usePurchaseStore)
├── types/        # Domain types, DTOs & enums (Purchase, PurchaseStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (purchaseRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission        |
| ------ | ----------------- |
| View   | `purchase:view`   |
| Create | `purchase:create` |
| Update | `purchase:update` |
| Delete | `purchase:delete` |
| Export | `purchase:export` |

## Usage

```ts
import { usePurchase, PurchaseForm, PURCHASE_PERMISSIONS } from '@features/purchase';
```
