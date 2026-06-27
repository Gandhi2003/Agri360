import type { PaginationParams } from '@common/types';
import { rolesApi } from '../api/roles.api';
import type { CreateRoleDto, RoleFilters, RoleId, UpdateRoleDto } from '../types';

/**
 * Application/service layer for Role Management.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const rolesService = {
  getList: (params: PaginationParams & RoleFilters) => rolesApi.list(params),
  getOne: (id: RoleId) => rolesApi.getById(id),
  create: (dto: CreateRoleDto) => rolesApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: RoleId, dto: UpdateRoleDto) => rolesApi.update(id, dto),
  remove: (id: RoleId) => rolesApi.remove(id),
};
