import type { BaseEntity, ID } from '@common/types';

export enum CategoryStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Category extends BaseEntity {
  name: string;
  code: string;
  status: CategoryStatus;
  description?: string;
}

export interface CreateCategoryDto {
  name: string;
  code: string;
  status: CategoryStatus;
  description?: string;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;

export interface CategoryFilters {
  search?: string;
  status?: CategoryStatus;
}

export type CategoryId = ID;
