import type { PaginationParams } from '@common/types';
import { purchaseApi } from '../api/purchase.api';
import type { CreatePurchaseDto, PurchaseFilters, PurchaseId, UpdatePurchaseDto } from '../types';

export const purchaseService = {
  getList: (params: PaginationParams & PurchaseFilters) => purchaseApi.list(params),
  getOne: (id: PurchaseId) => purchaseApi.getById(id),
  create: (dto: CreatePurchaseDto) =>
    purchaseApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: PurchaseId, dto: UpdatePurchaseDto) => purchaseApi.update(id, dto),
  remove: (id: PurchaseId) => purchaseApi.remove(id),
};
