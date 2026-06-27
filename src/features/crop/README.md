# Crop Management

Feature module for **Crop Management** in Agri360 CRM.

## Structure

```
crop/
├── api/          # Pure HTTP data-access (cropApi)
├── components/   # Feature-scoped UI (CropForm, ...)
├── hooks/        # TanStack Query hooks (useCrop, useCreateCrop, ...)
├── pages/        # Route-level pages (CropListPage)
├── services/     # Business logic / orchestration (cropService)
├── schemas/      # Zod validation (cropSchema)
├── store/        # Zustand UI state (useCropStore)
├── types/        # Domain types, DTOs & enums (Crop, CropStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (cropRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission    |
| ------ | ------------- |
| View   | `crop:view`   |
| Create | `crop:create` |
| Update | `crop:update` |
| Delete | `crop:delete` |
| Export | `crop:export` |

## Usage

```ts
import { useCrop, CropForm, CROP_PERMISSIONS } from '@features/crop';
```
