import type { PaginationParams } from '@common/types';
import { farmersApi } from '../api/farmers.api';
import type { CreateFarmerDto, FarmerFilters, FarmerId, UpdateFarmerDto } from '../types';

/**
 * Application/service layer for Farmer Management.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const farmersService = {
  getList: (params: PaginationParams & FarmerFilters) => farmersApi.list(params),
  getOne: (id: FarmerId) => farmersApi.getById(id),
  create: (dto: CreateFarmerDto) =>
    farmersApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: FarmerId, dto: UpdateFarmerDto) => farmersApi.update(id, dto),
  remove: (id: FarmerId) => farmersApi.remove(id),
};
