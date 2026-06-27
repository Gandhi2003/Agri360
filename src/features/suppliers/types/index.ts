import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Supplier. */
export enum SupplierStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Supplier domain entity. */
export interface Supplier extends BaseEntity {
  name: string;
  code: string;
  status: SupplierStatus;
  description?: string;
}

/** Payload to create a Supplier. */
export interface CreateSupplierDto {
  name: string;
  code: string;
  status: SupplierStatus;
  description?: string;
}

/** Payload to update a Supplier (all fields optional). */
export type UpdateSupplierDto = Partial<CreateSupplierDto>;

/** Server/UI filters for listing Suppliers. */
export interface SupplierFilters {
  search?: string;
  status?: SupplierStatus;
}

export type SupplierId = ID;
