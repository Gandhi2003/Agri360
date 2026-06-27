import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Product. */
export enum ProductStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Product domain entity. */
export interface Product extends BaseEntity {
  name: string;
  code: string;
  status: ProductStatus;
  description?: string;
}

/** Payload to create a Product. */
export interface CreateProductDto {
  name: string;
  code: string;
  status: ProductStatus;
  description?: string;
}

/** Payload to update a Product (all fields optional). */
export type UpdateProductDto = Partial<CreateProductDto>;

/** Server/UI filters for listing Products. */
export interface ProductFilters {
  search?: string;
  status?: ProductStatus;
}

export type ProductId = ID;
