import type { BaseEntity, ID } from '@common/types';

export enum DealerStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Dealer extends BaseEntity {
  name: string;
  company: string;
  code: string;
  email?: string;
  phone?: string;
  region?: string;
  gst_number?: string;
  description?: string;
}

export interface CreateDealerDto {
  name: string;
  code: string;
  status: DealerStatus;
  description?: string;
}

export type UpdateDealerDto = Partial<CreateDealerDto>;

export interface DealerFilters {
  search?: string;
  status?: DealerStatus;
}

export type DealerId = ID;
