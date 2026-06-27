import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type { CreateRoleDto, Role, RoleFilters, RoleId, UpdateRoleDto } from '../types';

const RESOURCE = '/roles';

/** Pure data-access layer for the Role Management feature. No business logic here. */
export const rolesApi = {
  list: (params: PaginationParams & RoleFilters) =>
    apiClient.get<PaginatedResponse<Role>>(RESOURCE, { params }),

  getById: (id: RoleId) => apiClient.get<Role>(`${RESOURCE}/${id}`),

  create: (dto: CreateRoleDto) => apiClient.post<Role>(RESOURCE, dto),

  update: (id: RoleId, dto: UpdateRoleDto) => apiClient.put<Role>(`${RESOURCE}/${id}`, dto),

  remove: (id: RoleId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
