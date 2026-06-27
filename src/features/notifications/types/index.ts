import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Notification. */
export enum NotificationStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Notification domain entity. */
export interface Notification extends BaseEntity {
  name: string;
  code: string;
  status: NotificationStatus;
  description?: string;
}

/** Payload to create a Notification. */
export interface CreateNotificationDto {
  name: string;
  code: string;
  status: NotificationStatus;
  description?: string;
}

/** Payload to update a Notification (all fields optional). */
export type UpdateNotificationDto = Partial<CreateNotificationDto>;

/** Server/UI filters for listing Notifications. */
export interface NotificationFilters {
  search?: string;
  status?: NotificationStatus;
}

export type NotificationId = ID;
