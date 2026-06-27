import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { purchaseService } from '../services/purchase.service';
import { PURCHASE_QUERY_KEY } from '../constants';
import type { CreatePurchaseDto, PurchaseFilters, PurchaseId, UpdatePurchaseDto } from '../types';

/** Paginated, filtered list of Purchase. */
export const usePurchase = (params: PaginationParams & PurchaseFilters) =>
  useQuery({
    queryKey: [PURCHASE_QUERY_KEY, 'list', params],
    queryFn: () => purchaseService.getList(params),
    placeholderData: keepPreviousData,
  });

/** A single Purchase by id. */
export const usePurchaseDetail = (id: PurchaseId | undefined) =>
  useQuery({
    queryKey: [PURCHASE_QUERY_KEY, 'detail', id],
    queryFn: () => purchaseService.getOne(id as PurchaseId),
    enabled: Boolean(id),
  });

/** Create a Purchase. */
export const useCreatePurchase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePurchaseDto) => purchaseService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PURCHASE_QUERY_KEY] });
      toast.success('Purchase created successfully');
    },
  });
};

/** Update a Purchase. */
export const useUpdatePurchase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: PurchaseId; dto: UpdatePurchaseDto }) =>
      purchaseService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PURCHASE_QUERY_KEY] });
      toast.success('Purchase updated successfully');
    },
  });
};

/** Delete a Purchase. */
export const useDeletePurchase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: PurchaseId) => purchaseService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PURCHASE_QUERY_KEY] });
      toast.success('Purchase deleted successfully');
    },
  });
};
