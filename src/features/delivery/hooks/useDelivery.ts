import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { deliveryService } from '../services/delivery.service';
import { DELIVERY_QUERY_KEY } from '../constants';
import type { CreateDeliveryDto, DeliveryFilters, DeliveryId, UpdateDeliveryDto } from '../types';

export const useDelivery = (params: PaginationParams & DeliveryFilters) =>
  useQuery({
    queryKey: [DELIVERY_QUERY_KEY, 'list', params],
    queryFn: () => deliveryService.getList(params),
    placeholderData: keepPreviousData,
  });

export const useDeliveryDetail = (id: DeliveryId | undefined) =>
  useQuery({
    queryKey: [DELIVERY_QUERY_KEY, 'detail', id],
    queryFn: () => deliveryService.getOne(id as DeliveryId),
    enabled: Boolean(id),
  });

export const useCreateDelivery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateDeliveryDto) => deliveryService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DELIVERY_QUERY_KEY] });
      toast.success('Delivery created successfully');
    },
  });
};

export const useUpdateDelivery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: DeliveryId; dto: UpdateDeliveryDto }) =>
      deliveryService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DELIVERY_QUERY_KEY] });
      toast.success('Delivery updated successfully');
    },
  });
};

export const useDeleteDelivery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: DeliveryId) => deliveryService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DELIVERY_QUERY_KEY] });
      toast.success('Delivery deleted successfully');
    },
  });
};
