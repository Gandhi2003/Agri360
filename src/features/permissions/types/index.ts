import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Permission. */
export enum PermissionStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Permission domain entity. */
export interface Permission extends BaseEntity {
  name: string;
  code: string;
  status: PermissionStatus;
  description?: string;
}

/** Payload to create a Permission. */
export interface CreatePermissionDto {
  name: string;
  code: string;
  status: PermissionStatus;
  description?: string;
}

/** Payload to update a Permission (all fields optional). */
export type UpdatePermissionDto = Partial<CreatePermissionDto>;

/** Server/UI filters for listing Permissions. */
export interface PermissionFilters {
  search?: string;
  status?: PermissionStatus;
}

export type PermissionId = ID;
