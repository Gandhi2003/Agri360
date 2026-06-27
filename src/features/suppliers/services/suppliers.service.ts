import type { PaginationParams } from '@common/types';
import { suppliersApi } from '../api/suppliers.api';
import type { CreateSupplierDto, SupplierFilters, SupplierId, UpdateSupplierDto } from '../types';

/**
 * Application/service layer for Supplier Management.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const suppliersService = {
  getList: (params: PaginationParams & SupplierFilters) => suppliersApi.list(params),
  getOne: (id: SupplierId) => suppliersApi.getById(id),
  create: (dto: CreateSupplierDto) =>
    suppliersApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: SupplierId, dto: UpdateSupplierDto) => suppliersApi.update(id, dto),
  remove: (id: SupplierId) => suppliersApi.remove(id),
};
