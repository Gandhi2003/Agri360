import type { BaseEntity, ID } from '@common/types';

export enum ProfileStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Profile extends BaseEntity {
  name: string;
  code: string;
  status: ProfileStatus;
  description?: string;
}

export interface CreateProfileDto {
  name: string;
  code: string;
  status: ProfileStatus;
  description?: string;
}

export type UpdateProfileDto = Partial<CreateProfileDto>;

export interface ProfileFilters {
  search?: string;
  status?: ProfileStatus;
}

export type ProfileId = ID;
