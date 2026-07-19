import type { PaginationParams } from '@common/types';
import { dealersApi } from '../api/dealers.api';
import type { CreateDealerDto, DealerFilters, DealerId, UpdateDealerDto } from '../types';

export const dealersService = {
  getList: (params: PaginationParams & DealerFilters) => dealersApi.list(params),
  getOne: (id: DealerId) => dealersApi.getById(id),
  create: (dto: CreateDealerDto) =>
    dealersApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: DealerId, dto: UpdateDealerDto) => dealersApi.update(id, dto),
  remove: (id: DealerId) => dealersApi.remove(id),
};
