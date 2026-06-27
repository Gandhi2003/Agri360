import type { PaginationParams } from '@common/types';
import { categoriesApi } from '../api/categories.api';
import type { CreateCategoryDto, CategoryFilters, CategoryId, UpdateCategoryDto } from '../types';

/**
 * Application/service layer for Categories.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const categoriesService = {
  getList: (params: PaginationParams & CategoryFilters) => categoriesApi.list(params),
  getOne: (id: CategoryId) => categoriesApi.getById(id),
  create: (dto: CreateCategoryDto) =>
    categoriesApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: CategoryId, dto: UpdateCategoryDto) => categoriesApi.update(id, dto),
  remove: (id: CategoryId) => categoriesApi.remove(id),
};
