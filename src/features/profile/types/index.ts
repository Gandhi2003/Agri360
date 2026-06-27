import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Profile. */
export enum ProfileStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Profile domain entity. */
export interface Profile extends BaseEntity {
  name: string;
  code: string;
  status: ProfileStatus;
  description?: string;
}

/** Payload to create a Profile. */
export interface CreateProfileDto {
  name: string;
  code: string;
  status: ProfileStatus;
  description?: string;
}

/** Payload to update a Profile (all fields optional). */
export type UpdateProfileDto = Partial<CreateProfileDto>;

/** Server/UI filters for listing Profile. */
export interface ProfileFilters {
  search?: string;
  status?: ProfileStatus;
}

export type ProfileId = ID;
