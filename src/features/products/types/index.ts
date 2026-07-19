import type { BaseEntity, ID } from '@common/types';

export enum ProductStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Product extends BaseEntity {
  name: string;
  code: string;
  status: ProductStatus;
  description?: string;
}

export interface CreateProductDto {
  name: string;
  code: string;
  status: ProductStatus;
  description?: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;

export interface ProductFilters {
  search?: string;
  status?: ProductStatus;
}

export type ProductId = ID;
