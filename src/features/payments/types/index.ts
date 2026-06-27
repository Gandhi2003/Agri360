import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Payment. */
export enum PaymentStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Payment domain entity. */
export interface Payment extends BaseEntity {
  name: string;
  code: string;
  status: PaymentStatus;
  description?: string;
}

/** Payload to create a Payment. */
export interface CreatePaymentDto {
  name: string;
  code: string;
  status: PaymentStatus;
  description?: string;
}

/** Payload to update a Payment (all fields optional). */
export type UpdatePaymentDto = Partial<CreatePaymentDto>;

/** Server/UI filters for listing Payments. */
export interface PaymentFilters {
  search?: string;
  status?: PaymentStatus;
}

export type PaymentId = ID;
