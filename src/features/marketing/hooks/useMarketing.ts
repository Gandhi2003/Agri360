import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { marketingService } from '../services/marketing.service';
import { MARKETING_QUERY_KEY } from '../constants';
import type {
  CreateMarketingDto,
  MarketingFilters,
  MarketingId,
  UpdateMarketingDto,
} from '../types';

export const useMarketing = (params: PaginationParams & MarketingFilters) =>
  useQuery({
    queryKey: [MARKETING_QUERY_KEY, 'list', params],
    queryFn: () => marketingService.getList(params),
    placeholderData: keepPreviousData,
  });

export const useMarketingDetail = (id: MarketingId | undefined) =>
  useQuery({
    queryKey: [MARKETING_QUERY_KEY, 'detail', id],
    queryFn: () => marketingService.getOne(id as MarketingId),
    enabled: Boolean(id),
  });

export const useCreateMarketing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateMarketingDto) => marketingService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEY] });
      toast.success('Marketing created successfully');
    },
  });
};

export const useUpdateMarketing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: MarketingId; dto: UpdateMarketingDto }) =>
      marketingService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEY] });
      toast.success('Marketing updated successfully');
    },
  });
};

export const useDeleteMarketing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: MarketingId) => marketingService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEY] });
      toast.success('Marketing deleted successfully');
    },
  });
};
