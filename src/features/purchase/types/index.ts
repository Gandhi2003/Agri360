import type { BaseEntity, ID } from '@common/types';

export enum PurchaseStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Purchase extends BaseEntity {
  name: string;
  code: string;
  status: PurchaseStatus;
  description?: string;
}

export interface CreatePurchaseDto {
  name: string;
  code: string;
  status: PurchaseStatus;
  description?: string;
}

export type UpdatePurchaseDto = Partial<CreatePurchaseDto>;

export interface PurchaseFilters {
  search?: string;
  status?: PurchaseStatus;
}

export type PurchaseId = ID;
