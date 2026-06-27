import type { PaginationParams } from '@common/types';
import { stockApi } from '../api/stock.api';
import type { CreateStockDto, StockFilters, StockId, UpdateStockDto } from '../types';

/**
 * Application/service layer for Stock.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const stockService = {
  getList: (params: PaginationParams & StockFilters) => stockApi.list(params),
  getOne: (id: StockId) => stockApi.getById(id),
  create: (dto: CreateStockDto) => stockApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: StockId, dto: UpdateStockDto) => stockApi.update(id, dto),
  remove: (id: StockId) => stockApi.remove(id),
};
