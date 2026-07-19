import type { PaginationParams } from '@common/types';
import { notificationsApi } from '../api/notifications.api';
import type {
  CreateNotificationDto,
  NotificationFilters,
  NotificationId,
  UpdateNotificationDto,
} from '../types';

export const notificationsService = {
  getList: (params: PaginationParams & NotificationFilters) => notificationsApi.list(params),
  getOne: (id: NotificationId) => notificationsApi.getById(id),
  create: (dto: CreateNotificationDto) =>
    notificationsApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: NotificationId, dto: UpdateNotificationDto) => notificationsApi.update(id, dto),
  remove: (id: NotificationId) => notificationsApi.remove(id),
};
