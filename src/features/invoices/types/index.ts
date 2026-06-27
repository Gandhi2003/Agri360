import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Invoice. */
export enum InvoiceStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Invoice domain entity. */
export interface Invoice extends BaseEntity {
  name: string;
  code: string;
  status: InvoiceStatus;
  description?: string;
}

/** Payload to create a Invoice. */
export interface CreateInvoiceDto {
  name: string;
  code: string;
  status: InvoiceStatus;
  description?: string;
}

/** Payload to update a Invoice (all fields optional). */
export type UpdateInvoiceDto = Partial<CreateInvoiceDto>;

/** Server/UI filters for listing Invoices. */
export interface InvoiceFilters {
  search?: string;
  status?: InvoiceStatus;
}

export type InvoiceId = ID;
