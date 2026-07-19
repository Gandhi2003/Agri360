import type { BaseEntity, ID } from '@common/types';

export enum QuotationStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Quotation extends BaseEntity {
  name: string;
  code: string;
  status: QuotationStatus;
  description?: string;
}

export interface CreateQuotationDto {
  name: string;
  code: string;
  status: QuotationStatus;
  description?: string;
}

export type UpdateQuotationDto = Partial<CreateQuotationDto>;

export interface QuotationFilters {
  search?: string;
  status?: QuotationStatus;
}

export type QuotationId = ID;
