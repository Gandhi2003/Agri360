import type { BaseEntity, ID } from '@common/types';

export enum StockStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Stock extends BaseEntity {
  name: string;
  code: string;
  status: StockStatus;
  description?: string;
}

export interface CreateStockDto {
  name: string;
  code: string;
  status: StockStatus;
  description?: string;
}

export type UpdateStockDto = Partial<CreateStockDto>;

export interface StockFilters {
  search?: string;
  status?: StockStatus;
}

export type StockId = ID;
