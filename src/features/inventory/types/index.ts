import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Inventory. */
export enum InventoryStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Inventory domain entity. */
export interface Inventory extends BaseEntity {
  name: string;
  code: string;
  status: InventoryStatus;
  description?: string;
}

/** Payload to create a Inventory. */
export interface CreateInventoryDto {
  name: string;
  code: string;
  status: InventoryStatus;
  description?: string;
}

/** Payload to update a Inventory (all fields optional). */
export type UpdateInventoryDto = Partial<CreateInventoryDto>;

/** Server/UI filters for listing Inventory. */
export interface InventoryFilters {
  search?: string;
  status?: InventoryStatus;
}

export type InventoryId = ID;
