import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Crop. */
export enum CropStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Crop domain entity. */
export interface Crop extends BaseEntity {
  name: string;
  code: string;
  status: CropStatus;
  description?: string;
}

/** Payload to create a Crop. */
export interface CreateCropDto {
  name: string;
  code: string;
  status: CropStatus;
  description?: string;
}

/** Payload to update a Crop (all fields optional). */
export type UpdateCropDto = Partial<CreateCropDto>;

/** Server/UI filters for listing Crop. */
export interface CropFilters {
  search?: string;
  status?: CropStatus;
}

export type CropId = ID;
