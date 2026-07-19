import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateFarmVisitDto,
  FarmVisit,
  FarmVisitFilters,
  FarmVisitId,
  UpdateFarmVisitDto,
} from '../types';

const RESOURCE = '/farm-visits';

export const farmVisitsApi = {
  list: (params: PaginationParams & FarmVisitFilters) =>
    apiClient.get<PaginatedResponse<FarmVisit>>(RESOURCE, { params }),

  getById: (id: FarmVisitId) => apiClient.get<FarmVisit>(`${RESOURCE}/${id}`),

  create: (dto: CreateFarmVisitDto) => apiClient.post<FarmVisit>(RESOURCE, dto),

  update: (id: FarmVisitId, dto: UpdateFarmVisitDto) =>
    apiClient.put<FarmVisit>(`${RESOURCE}/${id}`, dto),

  remove: (id: FarmVisitId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
