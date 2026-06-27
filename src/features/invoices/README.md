# Invoices

Feature module for **Invoices** in Agri360 CRM.

## Structure

```
invoices/
├── api/          # Pure HTTP data-access (invoicesApi)
├── components/   # Feature-scoped UI (InvoiceForm, ...)
├── hooks/        # TanStack Query hooks (useInvoices, useCreateInvoice, ...)
├── pages/        # Route-level pages (InvoicesListPage)
├── services/     # Business logic / orchestration (invoicesService)
├── schemas/      # Zod validation (invoiceSchema)
├── store/        # Zustand UI state (useInvoicesStore)
├── types/        # Domain types, DTOs & enums (Invoice, InvoiceStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (invoicesRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission        |
| ------ | ----------------- |
| View   | `invoices:view`   |
| Create | `invoices:create` |
| Update | `invoices:update` |
| Delete | `invoices:delete` |
| Export | `invoices:export` |

## Usage

```ts
import { useInvoices, InvoiceForm, INVOICES_PERMISSIONS } from '@features/invoices';
```
