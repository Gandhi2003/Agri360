import type { PaginationParams } from '@common/types';
import { profileApi } from '../api/profile.api';
import type { CreateProfileDto, ProfileFilters, ProfileId, UpdateProfileDto } from '../types';

/**
 * Application/service layer for Profile.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const profileService = {
  getList: (params: PaginationParams & ProfileFilters) => profileApi.list(params),
  getOne: (id: ProfileId) => profileApi.getById(id),
  create: (dto: CreateProfileDto) =>
    profileApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: ProfileId, dto: UpdateProfileDto) => profileApi.update(id, dto),
  remove: (id: ProfileId) => profileApi.remove(id),
};
