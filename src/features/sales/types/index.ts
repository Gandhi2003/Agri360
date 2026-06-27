import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Sale. */
export enum SaleStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Sale domain entity. */
export interface Sale extends BaseEntity {
  name: string;
  code: string;
  status: SaleStatus;
  description?: string;
}

/** Payload to create a Sale. */
export interface CreateSaleDto {
  name: string;
  code: string;
  status: SaleStatus;
  description?: string;
}

/** Payload to update a Sale (all fields optional). */
export type UpdateSaleDto = Partial<CreateSaleDto>;

/** Server/UI filters for listing Sales. */
export interface SaleFilters {
  search?: string;
  status?: SaleStatus;
}

export type SaleId = ID;
