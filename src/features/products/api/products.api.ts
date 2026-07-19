import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateProductDto,
  Product,
  ProductFilters,
  ProductId,
  UpdateProductDto,
} from '../types';

const RESOURCE = '/products';

export const productsApi = {
  list: (params: PaginationParams & ProductFilters) =>
    apiClient.get<PaginatedResponse<Product>>(RESOURCE, { params }),

  getById: (id: ProductId) => apiClient.get<Product>(`${RESOURCE}/${id}`),

  create: (dto: CreateProductDto) => apiClient.post<Product>(RESOURCE, dto),

  update: (id: ProductId, dto: UpdateProductDto) =>
    apiClient.put<Product>(`${RESOURCE}/${id}`, dto),

  remove: (id: ProductId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
