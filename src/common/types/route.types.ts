import type { ComponentType } from 'react';
import type { Role } from './auth.types';

export interface FeatureRoute {
  path: string;
  component: () => Promise<{ default: ComponentType }>;
  permission?: string;
  roles?: Role[];
  title?: string;
  index?: boolean;
  children?: FeatureRoute[];
}
