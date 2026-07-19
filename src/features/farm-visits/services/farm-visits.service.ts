import type { PaginationParams } from '@common/types';
import { farmVisitsApi } from '../api/farm-visits.api';
import type {
  CreateFarmVisitDto,
  FarmVisitFilters,
  FarmVisitId,
  UpdateFarmVisitDto,
} from '../types';

export const farmVisitsService = {
  getList: (params: PaginationParams & FarmVisitFilters) => farmVisitsApi.list(params),
  getOne: (id: FarmVisitId) => farmVisitsApi.getById(id),
  create: (dto: CreateFarmVisitDto) =>
    farmVisitsApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: FarmVisitId, dto: UpdateFarmVisitDto) => farmVisitsApi.update(id, dto),
  remove: (id: FarmVisitId) => farmVisitsApi.remove(id),
};
