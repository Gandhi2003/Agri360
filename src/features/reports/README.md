# Reports

Feature module for **Reports** in Agri360 CRM.

## Structure

```
reports/
├── api/          # Pure HTTP data-access (reportsApi)
├── components/   # Feature-scoped UI (ReportForm, ...)
├── hooks/        # TanStack Query hooks (useReports, useCreateReport, ...)
├── pages/        # Route-level pages (ReportsListPage)
├── services/     # Business logic / orchestration (reportsService)
├── schemas/      # Zod validation (reportSchema)
├── store/        # Zustand UI state (useReportsStore)
├── types/        # Domain types, DTOs & enums (Report, ReportStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (reportsRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission       |
| ------ | ---------------- |
| View   | `reports:view`   |
| Create | `reports:create` |
| Update | `reports:update` |
| Delete | `reports:delete` |
| Export | `reports:export` |

## Usage

```ts
import { useReports, ReportForm, REPORTS_PERMISSIONS } from '@features/reports';
```
