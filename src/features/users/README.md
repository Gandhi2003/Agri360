# User Management

Feature module for **User Management** in Agri360 CRM.

## Structure

```
users/
├── api/          # Pure HTTP data-access (usersApi)
├── components/   # Feature-scoped UI (UserForm, ...)
├── hooks/        # TanStack Query hooks (useUsers, useCreateUser, ...)
├── pages/        # Route-level pages (UsersListPage)
├── services/     # Business logic / orchestration (usersService)
├── schemas/      # Zod validation (userSchema)
├── store/        # Zustand UI state (useUsersStore)
├── types/        # Domain types, DTOs & enums (User, UserStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (usersRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission     |
| ------ | -------------- |
| View   | `users:view`   |
| Create | `users:create` |
| Update | `users:update` |
| Delete | `users:delete` |
| Export | `users:export` |

## Usage

```ts
import { useUsers, UserForm, USERS_PERMISSIONS } from '@features/users';
```
