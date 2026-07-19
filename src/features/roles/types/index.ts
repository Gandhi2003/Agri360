import type { BaseEntity, ID } from '@common/types';

export enum RoleStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Role extends BaseEntity {
  name: string;
  code: string;
  status: RoleStatus;
  description?: string;
}

export interface CreateRoleDto {
  name: string;
  code: string;
  status: RoleStatus;
  description?: string;
}

export type UpdateRoleDto = Partial<CreateRoleDto>;

export interface RoleFilters {
  search?: string;
  status?: RoleStatus;
}

export type RoleId = ID;
