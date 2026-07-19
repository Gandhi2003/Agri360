import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@common/constants';
import { usePermissions } from '@common/hooks';
import type { Permission, Role } from '@common/types';

interface PermissionGuardProps {
  permission?: Permission;
  roles?: Role[];
  children: ReactNode;
}

export function PermissionGuard({ permission, roles, children }: PermissionGuardProps) {
  const { can, hasRole } = usePermissions();

  const allowed =
    (!permission || can(permission)) && (!roles || roles.length === 0 || hasRole(roles));

  if (!allowed) return <Navigate to={ROUTES.UNAUTHORIZED} replace />;

  return <>{children}</>;
}
