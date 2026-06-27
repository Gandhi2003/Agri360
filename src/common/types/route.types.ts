import type { ComponentType } from 'react';
import type { Role } from './auth.types';

/**
 * Declarative description of a lazily-loaded, permission-guarded feature route.
 * Feature modules export `FeatureRoute[]`; the central router materializes them.
 */
export interface FeatureRoute {
  /** Path relative to the protected layout root (no leading slash). */
  path: string;
  /** Dynamic import of a module whose default export is the page component. */
  component: () => Promise<{ default: ComponentType }>;
  /** Single permission required to access (checked by PermissionGuard). */
  permission?: string;
  /** Roles allowed (checked by RoleGuard). Empty = any authenticated user. */
  roles?: Role[];
  /** Human title for breadcrumbs / document title. */
  title?: string;
  /** Marks the layout index route. */
  index?: boolean;
  /** Nested child routes. */
  children?: FeatureRoute[];
}
