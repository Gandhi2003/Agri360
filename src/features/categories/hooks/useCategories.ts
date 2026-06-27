import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { categoriesService } from '../services/categories.service';
import { CATEGORIES_QUERY_KEY } from '../constants';
import type { CreateCategoryDto, CategoryFilters, CategoryId, UpdateCategoryDto } from '../types';

/** Paginated, filtered list of Categories. */
export const useCategories = (params: PaginationParams & CategoryFilters) =>
  useQuery({
    queryKey: [CATEGORIES_QUERY_KEY, 'list', params],
    queryFn: () => categoriesService.getList(params),
    placeholderData: keepPreviousData,
  });

/** A single Category by id. */
export const useCategoryDetail = (id: CategoryId | undefined) =>
  useQuery({
    queryKey: [CATEGORIES_QUERY_KEY, 'detail', id],
    queryFn: () => categoriesService.getOne(id as CategoryId),
    enabled: Boolean(id),
  });

/** Create a Category. */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCategoryDto) => categoriesService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
      toast.success('Category created successfully');
    },
  });
};

/** Update a Category. */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: CategoryId; dto: UpdateCategoryDto }) =>
      categoriesService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
      toast.success('Category updated successfully');
    },
  });
};

/** Delete a Category. */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: CategoryId) => categoriesService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
      toast.success('Category deleted successfully');
    },
  });
};
