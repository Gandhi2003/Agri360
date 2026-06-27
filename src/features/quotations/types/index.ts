import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Quotation. */
export enum QuotationStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Quotation domain entity. */
export interface Quotation extends BaseEntity {
  name: string;
  code: string;
  status: QuotationStatus;
  description?: string;
}

/** Payload to create a Quotation. */
export interface CreateQuotationDto {
  name: string;
  code: string;
  status: QuotationStatus;
  description?: string;
}

/** Payload to update a Quotation (all fields optional). */
export type UpdateQuotationDto = Partial<CreateQuotationDto>;

/** Server/UI filters for listing Quotations. */
export interface QuotationFilters {
  search?: string;
  status?: QuotationStatus;
}

export type QuotationId = ID;
