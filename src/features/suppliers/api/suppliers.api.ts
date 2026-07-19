import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateSupplierDto,
  Supplier,
  SupplierFilters,
  SupplierId,
  UpdateSupplierDto,
} from '../types';

const RESOURCE = '/suppliers';

export const suppliersApi = {
  list: (params: PaginationParams & SupplierFilters) =>
    apiClient.get<PaginatedResponse<Supplier>>(RESOURCE, { params }),

  getById: (id: SupplierId) => apiClient.get<Supplier>(`${RESOURCE}/${id}`),

  create: (dto: CreateSupplierDto) => apiClient.post<Supplier>(RESOURCE, dto),

  update: (id: SupplierId, dto: UpdateSupplierDto) =>
    apiClient.put<Supplier>(`${RESOURCE}/${id}`, dto),

  remove: (id: SupplierId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
