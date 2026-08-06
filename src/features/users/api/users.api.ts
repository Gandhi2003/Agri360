import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type { CreateUserDto, User, UserFilters, UserId, UpdateUserDto } from '../types';

const RESOURCE = '/users';

const pick = (o: Record<string, unknown>, ...keys: string[]): unknown => {
  for (const key of keys) {
    if (o[key] != null) return o[key];
  }
  return undefined;
};

const normalizeUser = (raw: unknown): User => {
  const u = (raw ?? {}) as Record<string, unknown>;
  return {
    ...(u as unknown as User),
    firstName: String(pick(u, 'firstName', 'first_name') ?? ''),
    lastName: String(pick(u, 'lastName', 'last_name') ?? ''),
  };
};

const toWirePayload = (dto: Partial<CreateUserDto>) => {
  const { firstName, lastName, ...rest } = dto;
  return {
    ...rest,
    ...(firstName !== undefined && { first_name: firstName }),
    ...(lastName !== undefined && { last_name: lastName }),
  };
};

export const usersApi = {
  list: async (params: PaginationParams & UserFilters) => {
    const res = await apiClient.get<PaginatedResponse<User>>(RESOURCE, { params });
    return { ...res, data: res.data.map(normalizeUser) };
  },

  getById: async (id: UserId) => normalizeUser(await apiClient.get<unknown>(`${RESOURCE}/${id}`)),

  create: async (dto: CreateUserDto) =>
    normalizeUser(await apiClient.post<unknown>(RESOURCE, toWirePayload(dto))),

  update: async (id: UserId, dto: UpdateUserDto) =>
    normalizeUser(await apiClient.put<unknown>(`${RESOURCE}/${id}`, toWirePayload(dto))),

  remove: (id: UserId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
