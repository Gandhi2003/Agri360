import type { BaseEntity, ID } from '@common/types';

export enum WarehouseStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Warehouse extends BaseEntity {
  name: string;
  code: string;
  status: WarehouseStatus;
  description?: string;
}

export interface CreateWarehouseDto {
  name: string;
  code: string;
  status: WarehouseStatus;
  description?: string;
}

export type UpdateWarehouseDto = Partial<CreateWarehouseDto>;

export interface WarehouseFilters {
  search?: string;
  status?: WarehouseStatus;
}

export type WarehouseId = ID;
