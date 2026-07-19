import type { BaseEntity, ID } from '@common/types';

export enum SaleStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Sale extends BaseEntity {
  name: string;
  code: string;
  status: SaleStatus;
  description?: string;
}

export interface CreateSaleDto {
  name: string;
  code: string;
  status: SaleStatus;
  description?: string;
}

export type UpdateSaleDto = Partial<CreateSaleDto>;

export interface SaleFilters {
  search?: string;
  status?: SaleStatus;
}

export type SaleId = ID;
