# Sales

Feature module for **Sales** in Agri360 CRM.

## Structure

```
sales/
├── api/          # Pure HTTP data-access (salesApi)
├── components/   # Feature-scoped UI (SaleForm, ...)
├── hooks/        # TanStack Query hooks (useSales, useCreateSale, ...)
├── pages/        # Route-level pages (SalesListPage)
├── services/     # Business logic / orchestration (salesService)
├── schemas/      # Zod validation (saleSchema)
├── store/        # Zustand UI state (useSalesStore)
├── types/        # Domain types, DTOs & enums (Sale, SaleStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (salesRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission     |
| ------ | -------------- |
| View   | `sales:view`   |
| Create | `sales:create` |
| Update | `sales:update` |
| Delete | `sales:delete` |
| Export | `sales:export` |

## Usage

```ts
import { useSales, SaleForm, SALES_PERMISSIONS } from '@features/sales';
```
