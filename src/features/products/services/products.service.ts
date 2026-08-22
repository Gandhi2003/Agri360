import type { PaginationParams } from '@common/types';
import { productsApi } from '../api/products.api';
import type { CreateProductDto, ProductFilters, ProductId, UpdateProductDto } from '../types';

export const productsService = {
  getList: (params: PaginationParams & ProductFilters) => productsApi.list(params),
  getOne: (id: ProductId) => productsApi.getById(id),
  create: (dto: CreateProductDto) => productsApi.create(dto),
  update: (id: ProductId, dto: UpdateProductDto) => productsApi.update(id, dto),
  remove: (id: ProductId) => productsApi.remove(id),
};
