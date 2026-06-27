import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateInventoryDto,
  Inventory,
  InventoryFilters,
  InventoryId,
  UpdateInventoryDto,
} from '../types';

const RESOURCE = '/inventory';

/** Pure data-access layer for the Inventory feature. No business logic here. */
export const inventoryApi = {
  list: (params: PaginationParams & InventoryFilters) =>
    apiClient.get<PaginatedResponse<Inventory>>(RESOURCE, { params }),

  getById: (id: InventoryId) => apiClient.get<Inventory>(`${RESOURCE}/${id}`),

  create: (dto: CreateInventoryDto) => apiClient.post<Inventory>(RESOURCE, dto),

  update: (id: InventoryId, dto: UpdateInventoryDto) =>
    apiClient.put<Inventory>(`${RESOURCE}/${id}`, dto),

  remove: (id: InventoryId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
