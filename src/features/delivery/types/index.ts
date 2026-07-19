import type { BaseEntity, ID } from '@common/types';

export enum DeliveryStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Delivery extends BaseEntity {
  name: string;
  code: string;
  status: DeliveryStatus;
  description?: string;
}

export interface CreateDeliveryDto {
  name: string;
  code: string;
  status: DeliveryStatus;
  description?: string;
}

export type UpdateDeliveryDto = Partial<CreateDeliveryDto>;

export interface DeliveryFilters {
  search?: string;
  status?: DeliveryStatus;
}

export type DeliveryId = ID;
