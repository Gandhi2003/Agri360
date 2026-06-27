# Categories

Feature module for **Categories** in Agri360 CRM.

## Structure

```
categories/
├── api/          # Pure HTTP data-access (categoriesApi)
├── components/   # Feature-scoped UI (CategoryForm, ...)
├── hooks/        # TanStack Query hooks (useCategories, useCreateCategory, ...)
├── pages/        # Route-level pages (CategoriesListPage)
├── services/     # Business logic / orchestration (categoriesService)
├── schemas/      # Zod validation (categorySchema)
├── store/        # Zustand UI state (useCategoriesStore)
├── types/        # Domain types, DTOs & enums (Category, CategoryStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (categoriesRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission          |
| ------ | ------------------- |
| View   | `categories:view`   |
| Create | `categories:create` |
| Update | `categories:update` |
| Delete | `categories:delete` |
| Export | `categories:export` |

## Usage

```ts
import { useCategories, CategoryForm, CATEGORIES_PERMISSIONS } from '@features/categories';
```
