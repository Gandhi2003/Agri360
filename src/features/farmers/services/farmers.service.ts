import type { PaginationParams } from '@common/types';
import { farmersApi } from '../api/farmers.api';
import type { CreateFarmerDto, FarmerFilters, FarmerId, UpdateFarmerDto } from '../types';

export const farmersService = {
  getList: (params: PaginationParams & FarmerFilters) => farmersApi.list(params),
  getOne: (id: FarmerId) => farmersApi.getById(id),
  create: (dto: CreateFarmerDto) => farmersApi.create(dto),
  update: (id: FarmerId, dto: UpdateFarmerDto) => farmersApi.update(id, dto),
  remove: (id: FarmerId) => farmersApi.remove(id),
};
