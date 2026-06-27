import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Stock. */
export enum StockStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Stock domain entity. */
export interface Stock extends BaseEntity {
  name: string;
  code: string;
  status: StockStatus;
  description?: string;
}

/** Payload to create a Stock. */
export interface CreateStockDto {
  name: string;
  code: string;
  status: StockStatus;
  description?: string;
}

/** Payload to update a Stock (all fields optional). */
export type UpdateStockDto = Partial<CreateStockDto>;

/** Server/UI filters for listing Stock. */
export interface StockFilters {
  search?: string;
  status?: StockStatus;
}

export type StockId = ID;
