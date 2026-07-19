import type { PaginationParams } from '@common/types';
import { usersApi } from '../api/users.api';
import type { CreateUserDto, UserFilters, UserId, UpdateUserDto } from '../types';

export const usersService = {
  getList: (params: PaginationParams & UserFilters) => usersApi.list(params),
  getOne: (id: UserId) => usersApi.getById(id),
  create: (dto: CreateUserDto) => usersApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: UserId, dto: UpdateUserDto) => usersApi.update(id, dto),
  remove: (id: UserId) => usersApi.remove(id),
};
