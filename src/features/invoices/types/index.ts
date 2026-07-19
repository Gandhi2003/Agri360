import type { BaseEntity, ID } from '@common/types';

export enum InvoiceStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Invoice extends BaseEntity {
  name: string;
  code: string;
  status: InvoiceStatus;
  description?: string;
}

export interface CreateInvoiceDto {
  name: string;
  code: string;
  status: InvoiceStatus;
  description?: string;
}

export type UpdateInvoiceDto = Partial<CreateInvoiceDto>;

export interface InvoiceFilters {
  search?: string;
  status?: InvoiceStatus;
}

export type InvoiceId = ID;
