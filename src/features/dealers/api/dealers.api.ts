import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type { CreateDealerDto, Dealer, DealerFilters, DealerId, UpdateDealerDto } from '../types';

const RESOURCE = '/dealers';

export const dealersApi = {
  list: (params: PaginationParams & DealerFilters) =>
    apiClient.get<PaginatedResponse<Dealer>>(RESOURCE, { params }),

  getById: (id: DealerId) => apiClient.get<Dealer>(`${RESOURCE}/${id}`),

  create: (dto: CreateDealerDto) => apiClient.post<Dealer>(RESOURCE, dto),

  update: (id: DealerId, dto: UpdateDealerDto) => apiClient.put<Dealer>(`${RESOURCE}/${id}`, dto),

  remove: (id: DealerId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
