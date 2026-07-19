import type { BaseEntity, ID } from '@common/types';

export enum PaymentStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Payment extends BaseEntity {
  name: string;
  code: string;
  status: PaymentStatus;
  description?: string;
}

export interface CreatePaymentDto {
  name: string;
  code: string;
  status: PaymentStatus;
  description?: string;
}

export type UpdatePaymentDto = Partial<CreatePaymentDto>;

export interface PaymentFilters {
  search?: string;
  status?: PaymentStatus;
}

export type PaymentId = ID;
