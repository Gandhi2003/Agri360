import type { PaginationParams } from '@common/types';
import { salesApi } from '../api/sales.api';
import type { CreateSaleDto, SaleFilters, SaleId, UpdateSaleDto } from '../types';

export const salesService = {
  getList: (params: PaginationParams & SaleFilters) => salesApi.list(params),
  getOne: (id: SaleId) => salesApi.getById(id),
  create: (dto: CreateSaleDto) => salesApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: SaleId, dto: UpdateSaleDto) => salesApi.update(id, dto),
  remove: (id: SaleId) => salesApi.remove(id),
};
