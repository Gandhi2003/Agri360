# Settings

Feature module for **Settings** in Agri360 CRM.

## Structure

```
settings/
├── api/          # Pure HTTP data-access (settingsApi)
├── components/   # Feature-scoped UI (SettingForm, ...)
├── hooks/        # TanStack Query hooks (useSettings, useCreateSetting, ...)
├── pages/        # Route-level pages (SettingsListPage)
├── services/     # Business logic / orchestration (settingsService)
├── schemas/      # Zod validation (settingSchema)
├── store/        # Zustand UI state (useSettingsStore)
├── types/        # Domain types, DTOs & enums (Setting, SettingStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (settingsRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission        |
| ------ | ----------------- |
| View   | `settings:view`   |
| Create | `settings:create` |
| Update | `settings:update` |
| Delete | `settings:delete` |
| Export | `settings:export` |

## Usage

```ts
import { useSettings, SettingForm, SETTINGS_PERMISSIONS } from '@features/settings';
```
