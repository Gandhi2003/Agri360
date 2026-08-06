import type { BaseEntity, ID } from '@common/types';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  code: string;
  status: UserStatus;
  description?: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  code: string;
  status: UserStatus;
  description?: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;

export interface UserFilters {
  search?: string;
  status?: UserStatus;
}

export type UserId = ID;
