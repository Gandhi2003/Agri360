import type { PaginationParams } from '@common/types';
import { permissionsApi } from '../api/permissions.api';
import type {
  CreatePermissionDto,
  PermissionFilters,
  PermissionId,
  UpdatePermissionDto,
} from '../types';

/**
 * Application/service layer for Permission Management.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const permissionsService = {
  getList: (params: PaginationParams & PermissionFilters) => permissionsApi.list(params),
  getOne: (id: PermissionId) => permissionsApi.getById(id),
  create: (dto: CreatePermissionDto) =>
    permissionsApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: PermissionId, dto: UpdatePermissionDto) => permissionsApi.update(id, dto),
  remove: (id: PermissionId) => permissionsApi.remove(id),
};
