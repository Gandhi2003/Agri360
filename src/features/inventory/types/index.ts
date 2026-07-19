import type { BaseEntity, ID } from '@common/types';

export enum InventoryStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Inventory extends BaseEntity {
  name: string;
  code: string;
  status: InventoryStatus;
  description?: string;
}

export interface CreateInventoryDto {
  name: string;
  code: string;
  status: InventoryStatus;
  description?: string;
}

export type UpdateInventoryDto = Partial<CreateInventoryDto>;

export interface InventoryFilters {
  search?: string;
  status?: InventoryStatus;
}

export type InventoryId = ID;
