import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateRoleDto,
  PermissionMatrix,
  Role,
  RoleFilters,
  RoleId,
  UpdatePermissionMatrixDto,
  UpdateRoleDto,
} from '../types';

const RESOURCE = '/roles';

export const rolesApi = {
  list: (params: PaginationParams & RoleFilters) =>
    apiClient.get<PaginatedResponse<Role>>(RESOURCE, { params }),

  getById: (id: RoleId) => apiClient.get<Role>(`${RESOURCE}/${id}`),

  create: (dto: CreateRoleDto) => apiClient.post<Role>(RESOURCE, dto),

  update: (id: RoleId, dto: UpdateRoleDto) => apiClient.put<Role>(`${RESOURCE}/${id}`, dto),

  remove: (id: RoleId) => apiClient.delete<void>(`${RESOURCE}/${id}`),

  getPermissionMatrix: (id: RoleId) =>
    apiClient.get<PermissionMatrix>(`${RESOURCE}/${id}/permission-matrix`),

  updatePermissionMatrix: (id: RoleId, dto: UpdatePermissionMatrixDto) =>
    apiClient.put<PermissionMatrix>(`${RESOURCE}/${id}/permission-matrix`, dto),
};
