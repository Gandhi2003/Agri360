import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { warehouseService } from '../services/warehouse.service';
import { WAREHOUSE_QUERY_KEY } from '../constants';
import type {
  CreateWarehouseDto,
  WarehouseFilters,
  WarehouseId,
  UpdateWarehouseDto,
} from '../types';

/** Paginated, filtered list of Warehouse. */
export const useWarehouse = (params: PaginationParams & WarehouseFilters) =>
  useQuery({
    queryKey: [WAREHOUSE_QUERY_KEY, 'list', params],
    queryFn: () => warehouseService.getList(params),
    placeholderData: keepPreviousData,
  });

/** A single Warehouse by id. */
export const useWarehouseDetail = (id: WarehouseId | undefined) =>
  useQuery({
    queryKey: [WAREHOUSE_QUERY_KEY, 'detail', id],
    queryFn: () => warehouseService.getOne(id as WarehouseId),
    enabled: Boolean(id),
  });

/** Create a Warehouse. */
export const useCreateWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateWarehouseDto) => warehouseService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WAREHOUSE_QUERY_KEY] });
      toast.success('Warehouse created successfully');
    },
  });
};

/** Update a Warehouse. */
export const useUpdateWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: WarehouseId; dto: UpdateWarehouseDto }) =>
      warehouseService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WAREHOUSE_QUERY_KEY] });
      toast.success('Warehouse updated successfully');
    },
  });
};

/** Delete a Warehouse. */
export const useDeleteWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: WarehouseId) => warehouseService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WAREHOUSE_QUERY_KEY] });
      toast.success('Warehouse deleted successfully');
    },
  });
};
