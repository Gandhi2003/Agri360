import type { BaseEntity, ID } from '@common/types';

export enum PermissionStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Permission extends BaseEntity {
  name: string;
  code: string;
  status: PermissionStatus;
  description?: string;
}

export interface CreatePermissionDto {
  name: string;
  code: string;
  status: PermissionStatus;
  description?: string;
}

export type UpdatePermissionDto = Partial<CreatePermissionDto>;

export interface PermissionFilters {
  search?: string;
  status?: PermissionStatus;
}

export type PermissionId = ID;
