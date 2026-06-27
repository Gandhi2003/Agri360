import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type { CreateStockDto, Stock, StockFilters, StockId, UpdateStockDto } from '../types';

const RESOURCE = '/stock';

/** Pure data-access layer for the Stock feature. No business logic here. */
export const stockApi = {
  list: (params: PaginationParams & StockFilters) =>
    apiClient.get<PaginatedResponse<Stock>>(RESOURCE, { params }),

  getById: (id: StockId) => apiClient.get<Stock>(`${RESOURCE}/${id}`),

  create: (dto: CreateStockDto) => apiClient.post<Stock>(RESOURCE, dto),

  update: (id: StockId, dto: UpdateStockDto) => apiClient.put<Stock>(`${RESOURCE}/${id}`, dto),

  remove: (id: StockId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
