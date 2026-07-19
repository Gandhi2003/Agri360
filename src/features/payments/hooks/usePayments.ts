import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { paymentsService } from '../services/payments.service';
import { PAYMENTS_QUERY_KEY } from '../constants';
import type { CreatePaymentDto, PaymentFilters, PaymentId, UpdatePaymentDto } from '../types';

export const usePayments = (params: PaginationParams & PaymentFilters) =>
  useQuery({
    queryKey: [PAYMENTS_QUERY_KEY, 'list', params],
    queryFn: () => paymentsService.getList(params),
    placeholderData: keepPreviousData,
  });

export const usePaymentDetail = (id: PaymentId | undefined) =>
  useQuery({
    queryKey: [PAYMENTS_QUERY_KEY, 'detail', id],
    queryFn: () => paymentsService.getOne(id as PaymentId),
    enabled: Boolean(id),
  });

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePaymentDto) => paymentsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY] });
      toast.success('Payment created successfully');
    },
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: PaymentId; dto: UpdatePaymentDto }) =>
      paymentsService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY] });
      toast.success('Payment updated successfully');
    },
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: PaymentId) => paymentsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY] });
      toast.success('Payment deleted successfully');
    },
  });
};
