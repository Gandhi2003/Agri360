import type { FeatureRoute } from '@common/types';
import { SETTINGS_PERMISSIONS } from './constants';

export const settingsRoutes: FeatureRoute[] = [
  {
    path: 'settings',
    title: 'Settings',
    permission: SETTINGS_PERMISSIONS.VIEW,
    component: () => import('./pages/SettingsListPage'),
  },
  {
    path: 'settings/general',
    title: 'General Settings',
    permission: SETTINGS_PERMISSIONS.VIEW,
    component: () => import('./pages/GeneralSettingsPage'),
  },
];
