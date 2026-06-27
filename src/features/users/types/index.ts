import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a User. */
export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core User domain entity. */
export interface User extends BaseEntity {
  name: string;
  code: string;
  status: UserStatus;
  description?: string;
}

/** Payload to create a User. */
export interface CreateUserDto {
  name: string;
  code: string;
  status: UserStatus;
  description?: string;
}

/** Payload to update a User (all fields optional). */
export type UpdateUserDto = Partial<CreateUserDto>;

/** Server/UI filters for listing Users. */
export interface UserFilters {
  search?: string;
  status?: UserStatus;
}

export type UserId = ID;
