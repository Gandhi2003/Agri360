# Payments

Feature module for **Payments** in Agri360 CRM.

## Structure

```
payments/
├── api/          # Pure HTTP data-access (paymentsApi)
├── components/   # Feature-scoped UI (PaymentForm, ...)
├── hooks/        # TanStack Query hooks (usePayments, useCreatePayment, ...)
├── pages/        # Route-level pages (PaymentsListPage)
├── services/     # Business logic / orchestration (paymentsService)
├── schemas/      # Zod validation (paymentSchema)
├── store/        # Zustand UI state (usePaymentsStore)
├── types/        # Domain types, DTOs & enums (Payment, PaymentStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (paymentsRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission        |
| ------ | ----------------- |
| View   | `payments:view`   |
| Create | `payments:create` |
| Update | `payments:update` |
| Delete | `payments:delete` |
| Export | `payments:export` |

## Usage

```ts
import { usePayments, PaymentForm, PAYMENTS_PERMISSIONS } from '@features/payments';
```
