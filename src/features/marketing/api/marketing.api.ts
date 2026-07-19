import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateMarketingDto,
  Marketing,
  MarketingFilters,
  MarketingId,
  UpdateMarketingDto,
} from '../types';

const RESOURCE = '/marketing';

export const marketingApi = {
  list: (params: PaginationParams & MarketingFilters) =>
    apiClient.get<PaginatedResponse<Marketing>>(RESOURCE, { params }),

  getById: (id: MarketingId) => apiClient.get<Marketing>(`${RESOURCE}/${id}`),

  create: (dto: CreateMarketingDto) => apiClient.post<Marketing>(RESOURCE, dto),

  update: (id: MarketingId, dto: UpdateMarketingDto) =>
    apiClient.put<Marketing>(`${RESOURCE}/${id}`, dto),

  remove: (id: MarketingId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
