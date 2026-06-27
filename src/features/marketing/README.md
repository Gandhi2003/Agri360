# Marketing

Feature module for **Marketing** in Agri360 CRM.

## Structure

```
marketing/
├── api/          # Pure HTTP data-access (marketingApi)
├── components/   # Feature-scoped UI (MarketingForm, ...)
├── hooks/        # TanStack Query hooks (useMarketing, useCreateMarketing, ...)
├── pages/        # Route-level pages (MarketingListPage)
├── services/     # Business logic / orchestration (marketingService)
├── schemas/      # Zod validation (marketingSchema)
├── store/        # Zustand UI state (useMarketingStore)
├── types/        # Domain types, DTOs & enums (Marketing, MarketingStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (marketingRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission         |
| ------ | ------------------ |
| View   | `marketing:view`   |
| Create | `marketing:create` |
| Update | `marketing:update` |
| Delete | `marketing:delete` |
| Export | `marketing:export` |

## Usage

```ts
import { useMarketing, MarketingForm, MARKETING_PERMISSIONS } from '@features/marketing';
```
