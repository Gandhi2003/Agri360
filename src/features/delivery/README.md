# Delivery

Feature module for **Delivery** in Agri360 CRM.

## Structure

```
delivery/
├── api/          # Pure HTTP data-access (deliveryApi)
├── components/   # Feature-scoped UI (DeliveryForm, ...)
├── hooks/        # TanStack Query hooks (useDelivery, useCreateDelivery, ...)
├── pages/        # Route-level pages (DeliveryListPage)
├── services/     # Business logic / orchestration (deliveryService)
├── schemas/      # Zod validation (deliverySchema)
├── store/        # Zustand UI state (useDeliveryStore)
├── types/        # Domain types, DTOs & enums (Delivery, DeliveryStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (deliveryRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission        |
| ------ | ----------------- |
| View   | `delivery:view`   |
| Create | `delivery:create` |
| Update | `delivery:update` |
| Delete | `delivery:delete` |
| Export | `delivery:export` |

## Usage

```ts
import { useDelivery, DeliveryForm, DELIVERY_PERMISSIONS } from '@features/delivery';
```
