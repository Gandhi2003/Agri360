import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { dealersService } from '../services/dealers.service';
import { DEALERS_QUERY_KEY } from '../constants';
import type { CreateDealerDto, DealerFilters, DealerId, UpdateDealerDto } from '../types';

export const useDealers = (params: PaginationParams & DealerFilters) =>
  useQuery({
    queryKey: [DEALERS_QUERY_KEY, 'list', params],
    queryFn: () => dealersService.getList(params),
    placeholderData: keepPreviousData,
  });

export const useDealerDetail = (id: DealerId | undefined) =>
  useQuery({
    queryKey: [DEALERS_QUERY_KEY, 'detail', id],
    queryFn: () => dealersService.getOne(id as DealerId),
    enabled: Boolean(id),
  });

export const useCreateDealer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateDealerDto) => dealersService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEALERS_QUERY_KEY] });
      toast.success('Dealer created successfully');
    },
  });
};

export const useUpdateDealer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: DealerId; dto: UpdateDealerDto }) =>
      dealersService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEALERS_QUERY_KEY] });
      toast.success('Dealer updated successfully');
    },
  });
};

export const useDeleteDealer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: DealerId) => dealersService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEALERS_QUERY_KEY] });
      toast.success('Dealer deleted successfully');
    },
  });
};
