import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { stockService } from '../services/stock.service';
import { STOCK_QUERY_KEY } from '../constants';
import type { CreateStockDto, StockFilters, StockId, UpdateStockDto } from '../types';

export const useStock = (params: PaginationParams & StockFilters) =>
  useQuery({
    queryKey: [STOCK_QUERY_KEY, 'list', params],
    queryFn: () => stockService.getList(params),
    placeholderData: keepPreviousData,
  });

export const useStockDetail = (id: StockId | undefined) =>
  useQuery({
    queryKey: [STOCK_QUERY_KEY, 'detail', id],
    queryFn: () => stockService.getOne(id as StockId),
    enabled: Boolean(id),
  });

export const useCreateStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateStockDto) => stockService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STOCK_QUERY_KEY] });
      toast.success('Stock created successfully');
    },
  });
};

export const useUpdateStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: StockId; dto: UpdateStockDto }) => stockService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STOCK_QUERY_KEY] });
      toast.success('Stock updated successfully');
    },
  });
};

export const useDeleteStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: StockId) => stockService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STOCK_QUERY_KEY] });
      toast.success('Stock deleted successfully');
    },
  });
};
