import type { BaseEntity, ID } from '@common/types';

export enum SupplierStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Supplier extends BaseEntity {
  name: string;
  code: string;
  status: SupplierStatus;
  description?: string;
}

export interface CreateSupplierDto {
  name: string;
  code: string;
  status: SupplierStatus;
  description?: string;
}

export type UpdateSupplierDto = Partial<CreateSupplierDto>;

export interface SupplierFilters {
  search?: string;
  status?: SupplierStatus;
}

export type SupplierId = ID;
