import type { FeatureRoute } from '@common/types';
import { CROP_PERMISSIONS } from './constants';

export const cropRoutes: FeatureRoute[] = [
  {
    path: 'crop',
    title: 'Crop Management',
    permission: CROP_PERMISSIONS.VIEW,
    component: () => import('./pages/CropListPage'),
  },
];
