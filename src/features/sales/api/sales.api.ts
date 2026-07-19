import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type { CreateSaleDto, Sale, SaleFilters, SaleId, UpdateSaleDto } from '../types';

const RESOURCE = '/sales';

export const salesApi = {
  list: (params: PaginationParams & SaleFilters) =>
    apiClient.get<PaginatedResponse<Sale>>(RESOURCE, { params }),

  getById: (id: SaleId) => apiClient.get<Sale>(`${RESOURCE}/${id}`),

  create: (dto: CreateSaleDto) => apiClient.post<Sale>(RESOURCE, dto),

  update: (id: SaleId, dto: UpdateSaleDto) => apiClient.put<Sale>(`${RESOURCE}/${id}`, dto),

  remove: (id: SaleId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
