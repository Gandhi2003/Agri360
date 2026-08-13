import type { ID } from '@common/types';

export type PermissionActionKey = 'create' | 'read' | 'update' | 'delete';

export interface PermissionMatrixAction {
  permission_id: number;
  checked: boolean;
}

export interface PermissionMatrixModule {
  resource: string;
  resource_code: number;
  actions: Record<PermissionActionKey, PermissionMatrixAction>;
  allow_all: boolean;
}

export interface PermissionMatrix {
  role_id: ID;
  role_name: string;
  modules: PermissionMatrixModule[];
}

export interface UpdatePermissionMatrixDto {
  permissions: Array<{ permission_id: number; checked: boolean }>;
}
