# Profile

Feature module for **Profile** in Agri360 CRM.

## Structure

```
profile/
├── api/          # Pure HTTP data-access (profileApi)
├── components/   # Feature-scoped UI (ProfileForm, ...)
├── hooks/        # TanStack Query hooks (useProfile, useCreateProfile, ...)
├── pages/        # Route-level pages (ProfileListPage)
├── services/     # Business logic / orchestration (profileService)
├── schemas/      # Zod validation (profileSchema)
├── store/        # Zustand UI state (useProfileStore)
├── types/        # Domain types, DTOs & enums (Profile, ProfileStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (profileRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission       |
| ------ | ---------------- |
| View   | `profile:view`   |
| Create | `profile:create` |
| Update | `profile:update` |
| Delete | `profile:delete` |
| Export | `profile:export` |

## Usage

```ts
import { useProfile, ProfileForm, PROFILE_PERMISSIONS } from '@features/profile';
```
