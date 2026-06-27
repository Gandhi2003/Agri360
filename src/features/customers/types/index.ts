import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Customer. */
export enum CustomerStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Customer domain entity. */
export interface Customer extends BaseEntity {
  name: string;
  code: string;
  status: CustomerStatus;
  description?: string;
}

/** Payload to create a Customer. */
export interface CreateCustomerDto {
  name: string;
  code: string;
  status: CustomerStatus;
  description?: string;
}

/** Payload to update a Customer (all fields optional). */
export type UpdateCustomerDto = Partial<CreateCustomerDto>;

/** Server/UI filters for listing Customers. */
export interface CustomerFilters {
  search?: string;
  status?: CustomerStatus;
}

export type CustomerId = ID;
