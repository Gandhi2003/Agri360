import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Marketing. */
export enum MarketingStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Marketing domain entity. */
export interface Marketing extends BaseEntity {
  name: string;
  code: string;
  status: MarketingStatus;
  description?: string;
}

/** Payload to create a Marketing. */
export interface CreateMarketingDto {
  name: string;
  code: string;
  status: MarketingStatus;
  description?: string;
}

/** Payload to update a Marketing (all fields optional). */
export type UpdateMarketingDto = Partial<CreateMarketingDto>;

/** Server/UI filters for listing Marketing. */
export interface MarketingFilters {
  search?: string;
  status?: MarketingStatus;
}

export type MarketingId = ID;
