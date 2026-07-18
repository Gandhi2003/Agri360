import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateProfileDto,
  Profile,
  ProfileFilters,
  ProfileId,
  UpdateProfileDto,
} from '../types';

const RESOURCE = '/profile';

export const profileApi = {
  list: (params: PaginationParams & ProfileFilters) =>
    apiClient.get<PaginatedResponse<Profile>>(RESOURCE, { params }),

  getById: (id: ProfileId) => apiClient.get<Profile>(`${RESOURCE}/${id}`),

  create: (dto: CreateProfileDto) => apiClient.post<Profile>(RESOURCE, dto),

  update: (id: ProfileId, dto: UpdateProfileDto) =>
    apiClient.put<Profile>(`${RESOURCE}/${id}`, dto),

  remove: (id: ProfileId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
