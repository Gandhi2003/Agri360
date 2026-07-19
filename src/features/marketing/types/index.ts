import type { BaseEntity, ID } from '@common/types';

export enum MarketingStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Marketing extends BaseEntity {
  name: string;
  code: string;
  status: MarketingStatus;
  description?: string;
}

export interface CreateMarketingDto {
  name: string;
  code: string;
  status: MarketingStatus;
  description?: string;
}

export type UpdateMarketingDto = Partial<CreateMarketingDto>;

export interface MarketingFilters {
  search?: string;
  status?: MarketingStatus;
}

export type MarketingId = ID;
