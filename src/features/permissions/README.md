# Permission Management

Feature module for **Permission Management** in Agri360 CRM.

## Structure

```
permissions/
├── api/          # Pure HTTP data-access (permissionsApi)
├── components/   # Feature-scoped UI (PermissionForm, ...)
├── hooks/        # TanStack Query hooks (usePermissions, useCreatePermission, ...)
├── pages/        # Route-level pages (PermissionsListPage)
├── services/     # Business logic / orchestration (permissionsService)
├── schemas/      # Zod validation (permissionSchema)
├── store/        # Zustand UI state (usePermissionsStore)
├── types/        # Domain types, DTOs & enums (Permission, PermissionStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (permissionsRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission           |
| ------ | -------------------- |
| View   | `permissions:view`   |
| Create | `permissions:create` |
| Update | `permissions:update` |
| Delete | `permissions:delete` |
| Export | `permissions:export` |

## Usage

```ts
import { usePermissions, PermissionForm, PERMISSIONS_PERMISSIONS } from '@features/permissions';
```
