# Stock

Feature module for **Stock** in Agri360 CRM.

## Structure

```
stock/
├── api/          # Pure HTTP data-access (stockApi)
├── components/   # Feature-scoped UI (StockForm, ...)
├── hooks/        # TanStack Query hooks (useStock, useCreateStock, ...)
├── pages/        # Route-level pages (StockListPage)
├── services/     # Business logic / orchestration (stockService)
├── schemas/      # Zod validation (stockSchema)
├── store/        # Zustand UI state (useStockStore)
├── types/        # Domain types, DTOs & enums (Stock, StockStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (stockRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission     |
| ------ | -------------- |
| View   | `stock:view`   |
| Create | `stock:create` |
| Update | `stock:update` |
| Delete | `stock:delete` |
| Export | `stock:export` |

## Usage

```ts
import { useStock, StockForm, STOCK_PERMISSIONS } from '@features/stock';
```
