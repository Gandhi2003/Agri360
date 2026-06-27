import type { PaginationParams } from '@common/types';
import { salesApi } from '../api/sales.api';
import type { CreateSaleDto, SaleFilters, SaleId, UpdateSaleDto } from '../types';

/**
 * Application/service layer for Sales.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const salesService = {
  getList: (params: PaginationParams & SaleFilters) => salesApi.list(params),
  getOne: (id: SaleId) => salesApi.getById(id),
  create: (dto: CreateSaleDto) => salesApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: SaleId, dto: UpdateSaleDto) => salesApi.update(id, dto),
  remove: (id: SaleId) => salesApi.remove(id),
};
