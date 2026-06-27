import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Warehouse. */
export enum WarehouseStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Warehouse domain entity. */
export interface Warehouse extends BaseEntity {
  name: string;
  code: string;
  status: WarehouseStatus;
  description?: string;
}

/** Payload to create a Warehouse. */
export interface CreateWarehouseDto {
  name: string;
  code: string;
  status: WarehouseStatus;
  description?: string;
}

/** Payload to update a Warehouse (all fields optional). */
export type UpdateWarehouseDto = Partial<CreateWarehouseDto>;

/** Server/UI filters for listing Warehouse. */
export interface WarehouseFilters {
  search?: string;
  status?: WarehouseStatus;
}

export type WarehouseId = ID;
