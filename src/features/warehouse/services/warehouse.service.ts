import type { PaginationParams } from '@common/types';
import { warehouseApi } from '../api/warehouse.api';
import type {
  CreateWarehouseDto,
  WarehouseFilters,
  WarehouseId,
  UpdateWarehouseDto,
} from '../types';

export const warehouseService = {
  getList: (params: PaginationParams & WarehouseFilters) => warehouseApi.list(params),
  getOne: (id: WarehouseId) => warehouseApi.getById(id),
  create: (dto: CreateWarehouseDto) =>
    warehouseApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: WarehouseId, dto: UpdateWarehouseDto) => warehouseApi.update(id, dto),
  remove: (id: WarehouseId) => warehouseApi.remove(id),
};
