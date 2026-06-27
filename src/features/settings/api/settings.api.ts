import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateSettingDto,
  Setting,
  SettingFilters,
  SettingId,
  UpdateSettingDto,
} from '../types';

const RESOURCE = '/settings';

/** Pure data-access layer for the Settings feature. No business logic here. */
export const settingsApi = {
  list: (params: PaginationParams & SettingFilters) =>
    apiClient.get<PaginatedResponse<Setting>>(RESOURCE, { params }),

  getById: (id: SettingId) => apiClient.get<Setting>(`${RESOURCE}/${id}`),

  create: (dto: CreateSettingDto) => apiClient.post<Setting>(RESOURCE, dto),

  update: (id: SettingId, dto: UpdateSettingDto) =>
    apiClient.put<Setting>(`${RESOURCE}/${id}`, dto),

  remove: (id: SettingId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
