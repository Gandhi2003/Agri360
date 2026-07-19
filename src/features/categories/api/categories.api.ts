import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateCategoryDto,
  Category,
  CategoryFilters,
  CategoryId,
  UpdateCategoryDto,
} from '../types';

const RESOURCE = '/categories';

export const categoriesApi = {
  list: (params: PaginationParams & CategoryFilters) =>
    apiClient.get<PaginatedResponse<Category>>(RESOURCE, { params }),

  getById: (id: CategoryId) => apiClient.get<Category>(`${RESOURCE}/${id}`),

  create: (dto: CreateCategoryDto) => apiClient.post<Category>(RESOURCE, dto),

  update: (id: CategoryId, dto: UpdateCategoryDto) =>
    apiClient.put<Category>(`${RESOURCE}/${id}`, dto),

  remove: (id: CategoryId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
