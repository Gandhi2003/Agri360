# Supplier Management

Feature module for **Supplier Management** in Agri360 CRM.

## Structure

```
suppliers/
├── api/          # Pure HTTP data-access (suppliersApi)
├── components/   # Feature-scoped UI (SupplierForm, ...)
├── hooks/        # TanStack Query hooks (useSuppliers, useCreateSupplier, ...)
├── pages/        # Route-level pages (SuppliersListPage)
├── services/     # Business logic / orchestration (suppliersService)
├── schemas/      # Zod validation (supplierSchema)
├── store/        # Zustand UI state (useSuppliersStore)
├── types/        # Domain types, DTOs & enums (Supplier, SupplierStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (suppliersRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission         |
| ------ | ------------------ |
| View   | `suppliers:view`   |
| Create | `suppliers:create` |
| Update | `suppliers:update` |
| Delete | `suppliers:delete` |
| Export | `suppliers:export` |

## Usage

```ts
import { useSuppliers, SupplierForm, SUPPLIERS_PERMISSIONS } from '@features/suppliers';
```
