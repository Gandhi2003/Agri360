import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type { CreateFarmerDto, Farmer, FarmerFilters, FarmerId, UpdateFarmerDto } from '../types';

const RESOURCE = '/farmers';

export const farmersApi = {
  list: (params: PaginationParams & FarmerFilters) =>
    apiClient.get<PaginatedResponse<Farmer>>(RESOURCE, { params }),

  getById: (id: FarmerId) => apiClient.get<Farmer>(`${RESOURCE}/${id}`),

  create: (dto: CreateFarmerDto) => apiClient.post<Farmer>(RESOURCE, dto),

  update: (id: FarmerId, dto: UpdateFarmerDto) => apiClient.put<Farmer>(`${RESOURCE}/${id}`, dto),

  remove: (id: FarmerId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
