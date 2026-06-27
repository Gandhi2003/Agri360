import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Purchase. */
export enum PurchaseStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Purchase domain entity. */
export interface Purchase extends BaseEntity {
  name: string;
  code: string;
  status: PurchaseStatus;
  description?: string;
}

/** Payload to create a Purchase. */
export interface CreatePurchaseDto {
  name: string;
  code: string;
  status: PurchaseStatus;
  description?: string;
}

/** Payload to update a Purchase (all fields optional). */
export type UpdatePurchaseDto = Partial<CreatePurchaseDto>;

/** Server/UI filters for listing Purchase. */
export interface PurchaseFilters {
  search?: string;
  status?: PurchaseStatus;
}

export type PurchaseId = ID;
