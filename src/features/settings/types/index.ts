import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Setting. */
export enum SettingStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Setting domain entity. */
export interface Setting extends BaseEntity {
  name: string;
  code: string;
  status: SettingStatus;
  description?: string;
}

/** Payload to create a Setting. */
export interface CreateSettingDto {
  name: string;
  code: string;
  status: SettingStatus;
  description?: string;
}

/** Payload to update a Setting (all fields optional). */
export type UpdateSettingDto = Partial<CreateSettingDto>;

/** Server/UI filters for listing Settings. */
export interface SettingFilters {
  search?: string;
  status?: SettingStatus;
}

export type SettingId = ID;
