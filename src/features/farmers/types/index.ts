import type { BaseEntity, ID } from '@common/types';

export enum FarmerStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Farmer extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  primary_crop: string;
  land_size_acres: number;
  village: string;
  district: string;
  state: string;
  code: string;
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
