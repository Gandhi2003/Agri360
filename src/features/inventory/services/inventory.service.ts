import type { PaginationParams } from '@common/types';
import { inventoryApi } from '../api/inventory.api';
import type {
  CreateInventoryDto,
  InventoryFilters,
  InventoryId,
  UpdateInventoryDto,
} from '../types';

/**
 * Application/service layer for Inventory.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const inventoryService = {
  getList: (params: PaginationParams & InventoryFilters) => inventoryApi.list(params),
  getOne: (id: InventoryId) => inventoryApi.getById(id),
  create: (dto: CreateInventoryDto) =>
    inventoryApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: InventoryId, dto: UpdateInventoryDto) => inventoryApi.update(id, dto),
  remove: (id: InventoryId) => inventoryApi.remove(id),
};
