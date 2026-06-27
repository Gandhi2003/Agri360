import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Farmer. */
export enum FarmerStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Farmer domain entity. */
export interface Farmer extends BaseEntity {
  name: string;
  code: string;
  status: FarmerStatus;
  description?: string;
}

/** Payload to create a Farmer. */
export interface CreateFarmerDto {
  name: string;
  code: string;
  status: FarmerStatus;
  description?: string;
}

/** Payload to update a Farmer (all fields optional). */
export type UpdateFarmerDto = Partial<CreateFarmerDto>;

/** Server/UI filters for listing Farmers. */
export interface FarmerFilters {
  search?: string;
  status?: FarmerStatus;
}

export type FarmerId = ID;
