import type { BaseEntity, ID } from '@common/types';

export enum FarmerStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Farmer extends BaseEntity {
  name: string;
  code: string;
  status: FarmerStatus;
  description?: string;
}

export interface CreateFarmerDto {
  name: string;
  code: string;
  status: FarmerStatus;
  description?: string;
}

export type UpdateFarmerDto = Partial<CreateFarmerDto>;

export interface FarmerFilters {
  search?: string;
  status?: FarmerStatus;
}

export type FarmerId = ID;
