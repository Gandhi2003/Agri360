# Customer Management

Feature module for **Customer Management** in Agri360 CRM.

## Structure

```
customers/
├── api/          # Pure HTTP data-access (customersApi)
├── components/   # Feature-scoped UI (CustomerForm, ...)
├── hooks/        # TanStack Query hooks (useCustomers, useCreateCustomer, ...)
├── pages/        # Route-level pages (CustomersListPage)
├── services/     # Business logic / orchestration (customersService)
├── schemas/      # Zod validation (customerSchema)
├── store/        # Zustand UI state (useCustomersStore)
├── types/        # Domain types, DTOs & enums (Customer, CustomerStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (customersRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission         |
| ------ | ------------------ |
| View   | `customers:view`   |
| Create | `customers:create` |
| Update | `customers:update` |
| Delete | `customers:delete` |
| Export | `customers:export` |

## Usage

```ts
import { useCustomers, CustomerForm, CUSTOMERS_PERMISSIONS } from '@features/customers';
```
