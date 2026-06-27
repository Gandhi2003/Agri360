import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { notificationsService } from '../services/notifications.service';
import { NOTIFICATIONS_QUERY_KEY } from '../constants';
import type {
  CreateNotificationDto,
  NotificationFilters,
  NotificationId,
  UpdateNotificationDto,
} from '../types';

/** Paginated, filtered list of Notifications. */
export const useNotifications = (params: PaginationParams & NotificationFilters) =>
  useQuery({
    queryKey: [NOTIFICATIONS_QUERY_KEY, 'list', params],
    queryFn: () => notificationsService.getList(params),
    placeholderData: keepPreviousData,
  });

/** A single Notification by id. */
export const useNotificationDetail = (id: NotificationId | undefined) =>
  useQuery({
    queryKey: [NOTIFICATIONS_QUERY_KEY, 'detail', id],
    queryFn: () => notificationsService.getOne(id as NotificationId),
    enabled: Boolean(id),
  });

/** Create a Notification. */
export const useCreateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateNotificationDto) => notificationsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
      toast.success('Notification created successfully');
    },
  });
};

/** Update a Notification. */
export const useUpdateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: NotificationId; dto: UpdateNotificationDto }) =>
      notificationsService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
      toast.success('Notification updated successfully');
    },
  });
};

/** Delete a Notification. */
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: NotificationId) => notificationsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
      toast.success('Notification deleted successfully');
    },
  });
};
