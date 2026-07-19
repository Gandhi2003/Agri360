import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { productsService } from '../services/products.service';
import { PRODUCTS_QUERY_KEY } from '../constants';
import type { CreateProductDto, ProductFilters, ProductId, UpdateProductDto } from '../types';

export const useProducts = (params: PaginationParams & ProductFilters) =>
  useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, 'list', params],
    queryFn: () => productsService.getList(params),
    placeholderData: keepPreviousData,
  });

export const useProductDetail = (id: ProductId | undefined) =>
  useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, 'detail', id],
    queryFn: () => productsService.getOne(id as ProductId),
    enabled: Boolean(id),
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateProductDto) => productsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
      toast.success('Product created successfully');
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: ProductId; dto: UpdateProductDto }) =>
      productsService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
      toast.success('Product updated successfully');
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: ProductId) => productsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
      toast.success('Product deleted successfully');
    },
  });
};
