import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Delivery. */
export enum DeliveryStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Delivery domain entity. */
export interface Delivery extends BaseEntity {
  name: string;
  code: string;
  status: DeliveryStatus;
  description?: string;
}

/** Payload to create a Delivery. */
export interface CreateDeliveryDto {
  name: string;
  code: string;
  status: DeliveryStatus;
  description?: string;
}

/** Payload to update a Delivery (all fields optional). */
export type UpdateDeliveryDto = Partial<CreateDeliveryDto>;

/** Server/UI filters for listing Delivery. */
export interface DeliveryFilters {
  search?: string;
  status?: DeliveryStatus;
}

export type DeliveryId = ID;
