# Products

Feature module for **Products** in Agri360 CRM.

## Structure

```
products/
├── api/          # Pure HTTP data-access (productsApi)
├── components/   # Feature-scoped UI (ProductForm, ...)
├── hooks/        # TanStack Query hooks (useProducts, useCreateProduct, ...)
├── pages/        # Route-level pages (ProductsListPage)
├── services/     # Business logic / orchestration (productsService)
├── schemas/      # Zod validation (productSchema)
├── store/        # Zustand UI state (useProductsStore)
├── types/        # Domain types & DTOs (Product, ProductCategory)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (productsRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission        |
| ------ | ----------------- |
| View   | `products:view`   |
| Create | `products:create` |
| Update | `products:update` |
| Delete | `products:delete` |
| Export | `products:export` |

## Usage

```ts
import { useProducts, ProductForm, PRODUCTS_PERMISSIONS } from '@features/products';
```
