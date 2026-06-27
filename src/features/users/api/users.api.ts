import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type { CreateUserDto, User, UserFilters, UserId, UpdateUserDto } from '../types';

const RESOURCE = '/users';

/** Pure data-access layer for the User Management feature. No business logic here. */
export const usersApi = {
  list: (params: PaginationParams & UserFilters) =>
    apiClient.get<PaginatedResponse<User>>(RESOURCE, { params }),

  getById: (id: UserId) => apiClient.get<User>(`${RESOURCE}/${id}`),

  create: (dto: CreateUserDto) => apiClient.post<User>(RESOURCE, dto),

  update: (id: UserId, dto: UpdateUserDto) => apiClient.put<User>(`${RESOURCE}/${id}`, dto),

  remove: (id: UserId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
