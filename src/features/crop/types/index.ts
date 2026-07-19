import type { BaseEntity, ID } from '@common/types';

export enum CropStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Crop extends BaseEntity {
  name: string;
  code: string;
  status: CropStatus;
  description?: string;
}

export interface CreateCropDto {
  name: string;
  code: string;
  status: CropStatus;
  description?: string;
}

export type UpdateCropDto = Partial<CreateCropDto>;

export interface CropFilters {
  search?: string;
  status?: CropStatus;
}

export type CropId = ID;
