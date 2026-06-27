import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateDeliveryDto,
  Delivery,
  DeliveryFilters,
  DeliveryId,
  UpdateDeliveryDto,
} from '../types';

const RESOURCE = '/delivery';

/** Pure data-access layer for the Delivery feature. No business logic here. */
export const deliveryApi = {
  list: (params: PaginationParams & DeliveryFilters) =>
    apiClient.get<PaginatedResponse<Delivery>>(RESOURCE, { params }),

  getById: (id: DeliveryId) => apiClient.get<Delivery>(`${RESOURCE}/${id}`),

  create: (dto: CreateDeliveryDto) => apiClient.post<Delivery>(RESOURCE, dto),

  update: (id: DeliveryId, dto: UpdateDeliveryDto) =>
    apiClient.put<Delivery>(`${RESOURCE}/${id}`, dto),

  remove: (id: DeliveryId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
