import type { PaginationParams } from '@common/types';
import { suppliersApi } from '../api/suppliers.api';
import type { CreateSupplierDto, SupplierFilters, SupplierId, UpdateSupplierDto } from '../types';

export const suppliersService = {
  getList: (params: PaginationParams & SupplierFilters) => suppliersApi.list(params),
  getOne: (id: SupplierId) => suppliersApi.getById(id),
  create: (dto: CreateSupplierDto) => suppliersApi.create(dto),
  update: (id: SupplierId, dto: UpdateSupplierDto) => suppliersApi.update(id, dto),
  remove: (id: SupplierId) => suppliersApi.remove(id),
};
