import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { salesService } from '../services/sales.service';
import { SALES_QUERY_KEY } from '../constants';
import type { CreateSaleDto, SaleFilters, SaleId, UpdateSaleDto } from '../types';

export const useSales = (params: PaginationParams & SaleFilters) =>
  useQuery({
    queryKey: [SALES_QUERY_KEY, 'list', params],
    queryFn: () => salesService.getList(params),
    placeholderData: keepPreviousData,
  });

export const useSaleDetail = (id: SaleId | undefined) =>
  useQuery({
    queryKey: [SALES_QUERY_KEY, 'detail', id],
    queryFn: () => salesService.getOne(id as SaleId),
    enabled: Boolean(id),
  });

export const useCreateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateSaleDto) => salesService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SALES_QUERY_KEY] });
      toast.success('Sale created successfully');
    },
  });
};

export const useUpdateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: SaleId; dto: UpdateSaleDto }) => salesService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SALES_QUERY_KEY] });
      toast.success('Sale updated successfully');
    },
  });
};

export const useDeleteSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: SaleId) => salesService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SALES_QUERY_KEY] });
      toast.success('Sale deleted successfully');
    },
  });
};
