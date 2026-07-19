import type { BaseEntity, ID } from '@common/types';

export enum NotificationStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Notification extends BaseEntity {
  name: string;
  code: string;
  status: NotificationStatus;
  description?: string;
}

export interface CreateNotificationDto {
  name: string;
  code: string;
  status: NotificationStatus;
  description?: string;
}

export type UpdateNotificationDto = Partial<CreateNotificationDto>;

export interface NotificationFilters {
  search?: string;
  status?: NotificationStatus;
}

export type NotificationId = ID;
