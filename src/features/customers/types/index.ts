import type { BaseEntity, ID } from '@common/types';

export enum CustomerStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Customer extends BaseEntity {
  name: string;
  code: string;
  email?: string;
  phone?: string;
  country?: string;
  description?: string;
}

export interface CreateCustomerDto {
  name: string;
  code: string;
  status: CustomerStatus;
  description?: string;
}

export type UpdateCustomerDto = Partial<CreateCustomerDto>;

export interface CustomerFilters {
  search?: string;
  status?: CustomerStatus;
}

export type CustomerId = ID;
