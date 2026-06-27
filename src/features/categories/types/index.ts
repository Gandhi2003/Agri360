import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Category. */
export enum CategoryStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Category domain entity. */
export interface Category extends BaseEntity {
  name: string;
  code: string;
  status: CategoryStatus;
  description?: string;
}

/** Payload to create a Category. */
export interface CreateCategoryDto {
  name: string;
  code: string;
  status: CategoryStatus;
  description?: string;
}

/** Payload to update a Category (all fields optional). */
export type UpdateCategoryDto = Partial<CreateCategoryDto>;

/** Server/UI filters for listing Categories. */
export interface CategoryFilters {
  search?: string;
  status?: CategoryStatus;
}

export type CategoryId = ID;
