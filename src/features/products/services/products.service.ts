import type { PaginationParams } from '@common/types';
import { productsApi } from '../api/products.api';
import type { CreateProductDto, ProductFilters, ProductId, UpdateProductDto } from '../types';

/**
 * Application/service layer for Products.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const productsService = {
  getList: (params: PaginationParams & ProductFilters) => productsApi.list(params),
  getOne: (id: ProductId) => productsApi.getById(id),
  create: (dto: CreateProductDto) =>
    productsApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: ProductId, dto: UpdateProductDto) => productsApi.update(id, dto),
  remove: (id: ProductId) => productsApi.remove(id),
};
