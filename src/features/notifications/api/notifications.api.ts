import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateNotificationDto,
  Notification,
  NotificationFilters,
  NotificationId,
  UpdateNotificationDto,
} from '../types';

const RESOURCE = '/notifications';

/** Pure data-access layer for the Notifications feature. No business logic here. */
export const notificationsApi = {
  list: (params: PaginationParams & NotificationFilters) =>
    apiClient.get<PaginatedResponse<Notification>>(RESOURCE, { params }),

  getById: (id: NotificationId) => apiClient.get<Notification>(`${RESOURCE}/${id}`),

  create: (dto: CreateNotificationDto) => apiClient.post<Notification>(RESOURCE, dto),

  update: (id: NotificationId, dto: UpdateNotificationDto) =>
    apiClient.put<Notification>(`${RESOURCE}/${id}`, dto),

  remove: (id: NotificationId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
