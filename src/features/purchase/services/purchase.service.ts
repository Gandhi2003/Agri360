import type { PaginationParams } from '@common/types';
import { purchaseApi } from '../api/purchase.api';
import type { CreatePurchaseDto, PurchaseFilters, PurchaseId, UpdatePurchaseDto } from '../types';

/**
 * Application/service layer for Purchase.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const purchaseService = {
  getList: (params: PaginationParams & PurchaseFilters) => purchaseApi.list(params),
  getOne: (id: PurchaseId) => purchaseApi.getById(id),
  create: (dto: CreatePurchaseDto) =>
    purchaseApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: PurchaseId, dto: UpdatePurchaseDto) => purchaseApi.update(id, dto),
  remove: (id: PurchaseId) => purchaseApi.remove(id),
};
