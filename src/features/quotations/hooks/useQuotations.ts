import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { quotationsService } from '../services/quotations.service';
import { QUOTATIONS_QUERY_KEY } from '../constants';
import type {
  CreateQuotationDto,
  QuotationFilters,
  QuotationId,
  UpdateQuotationDto,
} from '../types';

export const useQuotations = (params: PaginationParams & QuotationFilters) =>
  useQuery({
    queryKey: [QUOTATIONS_QUERY_KEY, 'list', params],
    queryFn: () => quotationsService.getList(params),
    placeholderData: keepPreviousData,
  });

export const useQuotationDetail = (id: QuotationId | undefined) =>
  useQuery({
    queryKey: [QUOTATIONS_QUERY_KEY, 'detail', id],
    queryFn: () => quotationsService.getOne(id as QuotationId),
    enabled: Boolean(id),
  });

export const useCreateQuotation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateQuotationDto) => quotationsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUOTATIONS_QUERY_KEY] });
      toast.success('Quotation created successfully');
    },
  });
};

export const useUpdateQuotation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: QuotationId; dto: UpdateQuotationDto }) =>
      quotationsService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUOTATIONS_QUERY_KEY] });
      toast.success('Quotation updated successfully');
    },
  });
};

export const useDeleteQuotation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: QuotationId) => quotationsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUOTATIONS_QUERY_KEY] });
      toast.success('Quotation deleted successfully');
    },
  });
};
