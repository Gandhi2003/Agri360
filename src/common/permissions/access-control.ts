import type { AuthUser, Permission, Role } from '@common/types';
import { ROLE_PERMISSIONS } from './permission.registry';

/** True if any of the user's roles is granted a wildcard (`*`) — e.g. SuperAdmin. */
const hasWildcard = (roles: Role[]): boolean =>
  roles.some((role) => ROLE_PERMISSIONS[role] === '*');

/** Resolve the effective permission set for a user (own grants ∪ role grants). */
export const resolvePermissions = (
  user: Pick<AuthUser, 'roles' | 'permissions'>,
): Set<Permission> => {
  const set = new Set<Permission>(user.permissions);
  for (const role of user.roles) {
    const granted = ROLE_PERMISSIONS[role];
    if (granted === '*') continue;
    granted?.forEach((p) => set.add(p));
  }
  return set;
};

/** Whether a user holds a single permission. */
export const can = (
  user: Pick<AuthUser, 'roles' | 'permissions'> | null,
  permission: Permission,
): boolean => {
  if (!user) return false;
  if (hasWildcard(user.roles)) return true;
  return resolvePermissions(user).has(permission);
};

/** Whether a user holds ALL of the given permissions. */
export const canAll = (
  user: Pick<AuthUser, 'roles' | 'permissions'> | null,
  permissions: Permission[],
): boolean => permissions.every((p) => can(user, p));

/** Whether a user holds ANY of the given permissions. */
export const canAny = (
  user: Pick<AuthUser, 'roles' | 'permissions'> | null,
  permissions: Permission[],
): boolean => permissions.some((p) => can(user, p));

/** Whether a user has at least one of the given roles. */
export const hasRole = (user: Pick<AuthUser, 'roles'> | null, roles: Role[]): boolean => {
  if (!user) return false;
  if (roles.length === 0) return true;
  return user.roles.some((r) => roles.includes(r));
};
