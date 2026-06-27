import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Dealer. */
export enum DealerStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Dealer domain entity. */
export interface Dealer extends BaseEntity {
  name: string;
  code: string;
  status: DealerStatus;
  description?: string;
}

/** Payload to create a Dealer. */
export interface CreateDealerDto {
  name: string;
  code: string;
  status: DealerStatus;
  description?: string;
}

/** Payload to update a Dealer (all fields optional). */
export type UpdateDealerDto = Partial<CreateDealerDto>;

/** Server/UI filters for listing Dealers. */
export interface DealerFilters {
  search?: string;
  status?: DealerStatus;
}

export type DealerId = ID;
