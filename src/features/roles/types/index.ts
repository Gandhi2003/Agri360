import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Role. */
export enum RoleStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Role domain entity. */
export interface Role extends BaseEntity {
  name: string;
  code: string;
  status: RoleStatus;
  description?: string;
}

/** Payload to create a Role. */
export interface CreateRoleDto {
  name: string;
  code: string;
  status: RoleStatus;
  description?: string;
}

/** Payload to update a Role (all fields optional). */
export type UpdateRoleDto = Partial<CreateRoleDto>;

/** Server/UI filters for listing Roles. */
export interface RoleFilters {
  search?: string;
  status?: RoleStatus;
}

export type RoleId = ID;
