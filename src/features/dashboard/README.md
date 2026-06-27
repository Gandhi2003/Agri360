# Dashboard

Executive overview for Agri360 CRM — KPI stat cards + revenue/category/region charts
(Recharts via `@components/charts`).

```
dashboard/
├── api/        # dashboardApi.getOverview → GET /dashboard/overview
├── hooks/      # useDashboardOverview (falls back to sample data)
├── pages/      # DashboardPage
├── types/      # DashboardOverview, DashboardMetrics, SeriesPoint
├── constants/  # query key + SAMPLE_OVERVIEW
└── routes.ts   # /dashboard
```
