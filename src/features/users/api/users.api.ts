import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type { CreateUserDto, User, UserFilters, UserId, UpdateUserDto, UserRole } from '../types';

const RESOURCE = '/users';

const pick = (o: Record<string, unknown>, ...keys: string[]): unknown => {
  for (const key of keys) {
    if (o[key] != null) return o[key];
  }
  return undefined;
};

const normalizeRole = (raw: unknown): UserRole => {
  const r = (raw ?? {}) as Record<string, unknown>;
  return { id: Number(r.id), name: String(r.name ?? '') };
};

const normalizeUser = (raw: unknown): User => {
  const u = (raw ?? {}) as Record<string, unknown>;
  const firstName = String(pick(u, 'firstName', 'first_name') ?? '');
  const lastName = String(pick(u, 'lastName', 'last_name') ?? '');
  return {
    ...(u as unknown as User),
    email: String(pick(u, 'email') ?? ''),
    firstName,
    lastName,
    fullName: String(pick(u, 'fullName', 'full_name') ?? `${firstName} ${lastName}`.trim()),
    isSuperuser: Boolean(pick(u, 'isSuperuser', 'is_superuser') ?? false),
    phoneNumber: (pick(u, 'phoneNumber', 'phone_number') as string | null) ?? null,
    image: (pick(u, 'image') as string | null) ?? null,
    address1: (pick(u, 'address1', 'address_1') as string | null) ?? null,
    address2: (pick(u, 'address2', 'address_2') as string | null) ?? null,
    country: (pick(u, 'country') as string | null) ?? null,
    state: (pick(u, 'state') as string | null) ?? null,
    city: (pick(u, 'city') as string | null) ?? null,
    pincode: (pick(u, 'pincode') as string | null) ?? null,
    dateOfBirth: (pick(u, 'dateOfBirth', 'date_of_birth') as string | null) ?? null,
    roles: Array.isArray(pick(u, 'roles'))
      ? (pick(u, 'roles') as unknown[]).map(normalizeRole)
      : [],
  };
};

const toWirePayload = (dto: Partial<CreateUserDto>) => {
  const {
    firstName,
    lastName,
    isSuperuser,
    phoneNumber,
    dateOfBirth,
    roleIds,
    image,
    address1,
    address2,
    ...rest
  } = dto;
  const payload: Record<string, unknown> = {
    ...rest,
    ...(firstName !== undefined && { first_name: firstName }),
    ...(lastName !== undefined && { last_name: lastName }),
    ...(isSuperuser !== undefined && { is_superuser: isSuperuser }),
    ...(phoneNumber !== undefined && { phone_number: phoneNumber }),
    ...(dateOfBirth !== undefined && { date_of_birth: dateOfBirth }),
    ...(roleIds !== undefined && { role_ids: roleIds }),
    ...(address1 !== undefined && { address_1: address1 }),
    ...(address2 !== undefined && { address_2: address2 }),
  };

  if (!image) return payload;

  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((entry) => formData.append(`${key}[]`, String(entry)));
    } else {
      formData.append(key, String(value));
    }
  });
  formData.append('image', image);
  return formData;
};

const asRequestConfig = (payload: unknown) =>
  payload instanceof FormData ? { headers: { 'Content-Type': undefined } } : undefined;

export const usersApi = {
  list: async (params: PaginationParams & UserFilters) => {
    const res = await apiClient.get<PaginatedResponse<User>>(RESOURCE, { params });
    return { ...res, data: res.data.map(normalizeUser) };
  },

  getById: async (id: UserId) => normalizeUser(await apiClient.get<unknown>(`${RESOURCE}/${id}`)),

  create: async (dto: CreateUserDto) => {
    const payload = toWirePayload(dto);
    return normalizeUser(
      await apiClient.post<unknown>(RESOURCE, payload, asRequestConfig(payload)),
    );
  },

  update: async (id: UserId, dto: UpdateUserDto) => {
    const payload = toWirePayload(dto);
    return normalizeUser(
      await apiClient.put<unknown>(`${RESOURCE}/${id}`, payload, asRequestConfig(payload)),
    );
  },

  remove: (id: UserId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
