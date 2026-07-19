import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreatePurchaseDto,
  Purchase,
  PurchaseFilters,
  PurchaseId,
  UpdatePurchaseDto,
} from '../types';

const RESOURCE = '/purchase';

export const purchaseApi = {
  list: (params: PaginationParams & PurchaseFilters) =>
    apiClient.get<PaginatedResponse<Purchase>>(RESOURCE, { params }),

  getById: (id: PurchaseId) => apiClient.get<Purchase>(`${RESOURCE}/${id}`),

  create: (dto: CreatePurchaseDto) => apiClient.post<Purchase>(RESOURCE, dto),

  update: (id: PurchaseId, dto: UpdatePurchaseDto) =>
    apiClient.put<Purchase>(`${RESOURCE}/${id}`, dto),

  remove: (id: PurchaseId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
