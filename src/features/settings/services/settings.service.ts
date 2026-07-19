import type { PaginationParams } from '@common/types';
import { settingsApi } from '../api/settings.api';
import type { CreateSettingDto, SettingFilters, SettingId, UpdateSettingDto } from '../types';

export const settingsService = {
  getList: (params: PaginationParams & SettingFilters) => settingsApi.list(params),
  getOne: (id: SettingId) => settingsApi.getById(id),
  create: (dto: CreateSettingDto) =>
    settingsApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: SettingId, dto: UpdateSettingDto) => settingsApi.update(id, dto),
  remove: (id: SettingId) => settingsApi.remove(id),
};
