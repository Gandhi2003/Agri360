# Quotations

Feature module for **Quotations** in Agri360 CRM.

## Structure

```
quotations/
├── api/          # Pure HTTP data-access (quotationsApi)
├── components/   # Feature-scoped UI (QuotationForm, ...)
├── hooks/        # TanStack Query hooks (useQuotations, useCreateQuotation, ...)
├── pages/        # Route-level pages (QuotationsListPage)
├── services/     # Business logic / orchestration (quotationsService)
├── schemas/      # Zod validation (quotationSchema)
├── store/        # Zustand UI state (useQuotationsStore)
├── types/        # Domain types, DTOs & enums (Quotation, QuotationStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (quotationsRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission          |
| ------ | ------------------- |
| View   | `quotations:view`   |
| Create | `quotations:create` |
| Update | `quotations:update` |
| Delete | `quotations:delete` |
| Export | `quotations:export` |

## Usage

```ts
import { useQuotations, QuotationForm, QUOTATIONS_PERMISSIONS } from '@features/quotations';
```
