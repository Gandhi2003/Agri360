# Role Management

Feature module for **Role Management** in Agri360 CRM.

## Structure

```
roles/
├── api/          # Pure HTTP data-access (rolesApi)
├── components/   # Feature-scoped UI (RoleForm, ...)
├── hooks/        # TanStack Query hooks (useRoles, useCreateRole, ...)
├── pages/        # Route-level pages (RolesListPage)
├── services/     # Business logic / orchestration (rolesService)
├── schemas/      # Zod validation (roleSchema)
├── store/        # Zustand UI state (useRolesStore)
├── types/        # Domain types, DTOs & enums (Role, RoleStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (rolesRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission     |
| ------ | -------------- |
| View   | `roles:view`   |
| Create | `roles:create` |
| Update | `roles:update` |
| Delete | `roles:delete` |
| Export | `roles:export` |

## Usage

```ts
import { useRoles, RoleForm, ROLES_PERMISSIONS } from '@features/roles';
```
