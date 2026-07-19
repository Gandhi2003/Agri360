import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateWarehouseDto,
  Warehouse,
  WarehouseFilters,
  WarehouseId,
  UpdateWarehouseDto,
} from '../types';

const RESOURCE = '/warehouse';

export const warehouseApi = {
  list: (params: PaginationParams & WarehouseFilters) =>
    apiClient.get<PaginatedResponse<Warehouse>>(RESOURCE, { params }),

  getById: (id: WarehouseId) => apiClient.get<Warehouse>(`${RESOURCE}/${id}`),

  create: (dto: CreateWarehouseDto) => apiClient.post<Warehouse>(RESOURCE, dto),

  update: (id: WarehouseId, dto: UpdateWarehouseDto) =>
    apiClient.put<Warehouse>(`${RESOURCE}/${id}`, dto),

  remove: (id: WarehouseId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
