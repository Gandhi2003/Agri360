import type { PaginationParams } from '@common/types';
import { rolesApi } from '../api/roles.api';
import type {
  CreateRoleDto,
  RoleFilters,
  RoleId,
  UpdatePermissionMatrixDto,
  UpdateRoleDto,
} from '../types';

export const rolesService = {
  getList: (params: PaginationParams & RoleFilters) => rolesApi.list(params),
  getOne: (id: RoleId) => rolesApi.getById(id),
  create: (dto: CreateRoleDto) => rolesApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: RoleId, dto: UpdateRoleDto) => rolesApi.update(id, dto),
  remove: (id: RoleId) => rolesApi.remove(id),
  getPermissionMatrix: (id: RoleId) => rolesApi.getPermissionMatrix(id),
  updatePermissionMatrix: (id: RoleId, dto: UpdatePermissionMatrixDto) =>
    rolesApi.updatePermissionMatrix(id, dto),
};
