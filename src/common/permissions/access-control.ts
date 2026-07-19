import type { AuthUser, Permission, Role } from '@common/types';
import { ROLE_PERMISSIONS } from './permission.registry';

const hasWildcard = (roles: Role[]): boolean =>
  Array.isArray(roles) && roles.some((role) => ROLE_PERMISSIONS[role] === '*');

export const resolvePermissions = (
  user: Pick<AuthUser, 'roles' | 'permissions'>,
): Set<Permission> => {
  const roles = Array.isArray(user.roles) ? user.roles : [];
  const set = new Set<Permission>(Array.isArray(user.permissions) ? user.permissions : []);
  for (const role of roles) {
    const granted = ROLE_PERMISSIONS[role];
    if (granted === '*') continue;
    granted?.forEach((p) => set.add(p));
  }
  return set;
};

export const can = (
  user: Pick<AuthUser, 'roles' | 'permissions'> | null,
  permission: Permission,
): boolean => {
  if (!user) return false;
  if (hasWildcard(user.roles)) return true;
  return resolvePermissions(user).has(permission);
};

export const canAll = (
  user: Pick<AuthUser, 'roles' | 'permissions'> | null,
  permissions: Permission[],
): boolean => permissions.every((p) => can(user, p));

export const canAny = (
  user: Pick<AuthUser, 'roles' | 'permissions'> | null,
  permissions: Permission[],
): boolean => permissions.some((p) => can(user, p));

export const hasRole = (user: Pick<AuthUser, 'roles'> | null, roles: Role[]): boolean => {
  if (!user) return false;
  if (roles.length === 0) return true;
  return Array.isArray(user.roles) && user.roles.some((r) => roles.includes(r));
};
