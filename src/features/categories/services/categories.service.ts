import type { PaginationParams } from '@common/types';
import { categoriesApi } from '../api/categories.api';
import type { CreateCategoryDto, CategoryFilters, CategoryId, UpdateCategoryDto } from '../types';

export const categoriesService = {
  getList: (params: PaginationParams & CategoryFilters) => categoriesApi.list(params),
  getOne: (id: CategoryId) => categoriesApi.getById(id),
  create: (dto: CreateCategoryDto) => categoriesApi.create(dto),
  update: (id: CategoryId, dto: UpdateCategoryDto) => categoriesApi.update(id, dto),
  remove: (id: CategoryId) => categoriesApi.remove(id),
};
