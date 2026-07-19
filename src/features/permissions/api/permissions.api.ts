import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreatePermissionDto,
  Permission,
  PermissionFilters,
  PermissionId,
  UpdatePermissionDto,
} from '../types';

const RESOURCE = '/permissions';

export const permissionsApi = {
  list: (params: PaginationParams & PermissionFilters) =>
    apiClient.get<PaginatedResponse<Permission>>(RESOURCE, { params }),

  getById: (id: PermissionId) => apiClient.get<Permission>(`${RESOURCE}/${id}`),

  create: (dto: CreatePermissionDto) => apiClient.post<Permission>(RESOURCE, dto),

  update: (id: PermissionId, dto: UpdatePermissionDto) =>
    apiClient.put<Permission>(`${RESOURCE}/${id}`, dto),

  remove: (id: PermissionId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
