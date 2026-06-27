import type { FeatureRoute } from '@common/types';
import { NOTIFICATIONS_PERMISSIONS } from './constants';

export const notificationsRoutes: FeatureRoute[] = [
  {
    path: 'notifications',
    title: 'Notifications',
    permission: NOTIFICATIONS_PERMISSIONS.VIEW,
    component: () => import('./pages/NotificationsListPage'),
  },
];
