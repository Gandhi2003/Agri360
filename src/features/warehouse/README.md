# Warehouse

Feature module for **Warehouse** in Agri360 CRM.

## Structure

```
warehouse/
├── api/          # Pure HTTP data-access (warehouseApi)
├── components/   # Feature-scoped UI (WarehouseForm, ...)
├── hooks/        # TanStack Query hooks (useWarehouse, useCreateWarehouse, ...)
├── pages/        # Route-level pages (WarehouseListPage)
├── services/     # Business logic / orchestration (warehouseService)
├── schemas/      # Zod validation (warehouseSchema)
├── store/        # Zustand UI state (useWarehouseStore)
├── types/        # Domain types, DTOs & enums (Warehouse, WarehouseStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (warehouseRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission         |
| ------ | ------------------ |
| View   | `warehouse:view`   |
| Create | `warehouse:create` |
| Update | `warehouse:update` |
| Delete | `warehouse:delete` |
| Export | `warehouse:export` |

## Usage

```ts
import { useWarehouse, WarehouseForm, WAREHOUSE_PERMISSIONS } from '@features/warehouse';
```
