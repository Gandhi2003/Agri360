import type { ReactNode } from 'react';
import { usePermissions } from '@common/hooks';
import type { Permission, Role } from '@common/types';

interface PermissionGateProps {
  /** Require ALL of these permissions. */
  permissions?: Permission[];
  /** Require ANY of these permissions. */
  anyOf?: Permission[];
  /** Require any of these roles. */
  roles?: Role[];
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * Conditionally render UI based on the current user's RBAC grants.
 * Use for buttons/menu items; use route guards for whole pages.
 */
export function PermissionGate({
  permissions,
  anyOf,
  roles,
  fallback = null,
  children,
}: PermissionGateProps) {
  const { canAll, canAny, hasRole } = usePermissions();

  const allowed =
    (!permissions || canAll(permissions)) &&
    (!anyOf || canAny(anyOf)) &&
    (!roles || hasRole(roles));

  return <>{allowed ? children : fallback}</>;
}
