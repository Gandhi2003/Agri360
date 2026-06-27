import { useMemo } from 'react';
import { useAuthStore } from '@app/store';
import { can, canAll, canAny, hasRole } from '@common/permissions';
import type { Permission, Role } from '@common/types';

/** RBAC helpers bound to the current user. */
export function usePermissions() {
  const user = useAuthStore((s) => s.user);

  return useMemo(
    () => ({
      can: (permission: Permission) => can(user, permission),
      canAny: (permissions: Permission[]) => canAny(user, permissions),
      canAll: (permissions: Permission[]) => canAll(user, permissions),
      hasRole: (roles: Role[]) => hasRole(user, roles),
    }),
    [user],
  );
}
