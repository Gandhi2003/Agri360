import type { PaginationParams } from '@common/types';
import { warehouseApi } from '../api/warehouse.api';
import type {
  CreateWarehouseDto,
  WarehouseFilters,
  WarehouseId,
  UpdateWarehouseDto,
} from '../types';

/**
 * Application/service layer for Warehouse.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const warehouseService = {
  getList: (params: PaginationParams & WarehouseFilters) => warehouseApi.list(params),
  getOne: (id: WarehouseId) => warehouseApi.getById(id),
  create: (dto: CreateWarehouseDto) =>
    warehouseApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: WarehouseId, dto: UpdateWarehouseDto) => warehouseApi.update(id, dto),
  remove: (id: WarehouseId) => warehouseApi.remove(id),
};
