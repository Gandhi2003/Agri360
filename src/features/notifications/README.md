# Notifications

Feature module for **Notifications** in Agri360 CRM.

## Structure

```
notifications/
├── api/          # Pure HTTP data-access (notificationsApi)
├── components/   # Feature-scoped UI (NotificationForm, ...)
├── hooks/        # TanStack Query hooks (useNotifications, useCreateNotification, ...)
├── pages/        # Route-level pages (NotificationsListPage)
├── services/     # Business logic / orchestration (notificationsService)
├── schemas/      # Zod validation (notificationSchema)
├── store/        # Zustand UI state (useNotificationsStore)
├── types/        # Domain types, DTOs & enums (Notification, NotificationStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (notificationsRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission             |
| ------ | ---------------------- |
| View   | `notifications:view`   |
| Create | `notifications:create` |
| Update | `notifications:update` |
| Delete | `notifications:delete` |
| Export | `notifications:export` |

## Usage

```ts
import {
  useNotifications,
  NotificationForm,
  NOTIFICATIONS_PERMISSIONS,
} from '@features/notifications';
```
