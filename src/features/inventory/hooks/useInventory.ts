import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { inventoryService } from '../services/inventory.service';
import { INVENTORY_QUERY_KEY } from '../constants';
import type {
  CreateInventoryDto,
  InventoryFilters,
  InventoryId,
  UpdateInventoryDto,
} from '../types';

/** Paginated, filtered list of Inventory. */
export const useInventory = (params: PaginationParams & InventoryFilters) =>
  useQuery({
    queryKey: [INVENTORY_QUERY_KEY, 'list', params],
    queryFn: () => inventoryService.getList(params),
    placeholderData: keepPreviousData,
  });

/** A single Inventory by id. */
export const useInventoryDetail = (id: InventoryId | undefined) =>
  useQuery({
    queryKey: [INVENTORY_QUERY_KEY, 'detail', id],
    queryFn: () => inventoryService.getOne(id as InventoryId),
    enabled: Boolean(id),
  });

/** Create a Inventory. */
export const useCreateInventory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateInventoryDto) => inventoryService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INVENTORY_QUERY_KEY] });
      toast.success('Inventory created successfully');
    },
  });
};

/** Update a Inventory. */
export const useUpdateInventory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: InventoryId; dto: UpdateInventoryDto }) =>
      inventoryService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INVENTORY_QUERY_KEY] });
      toast.success('Inventory updated successfully');
    },
  });
};

/** Delete a Inventory. */
export const useDeleteInventory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: InventoryId) => inventoryService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INVENTORY_QUERY_KEY] });
      toast.success('Inventory deleted successfully');
    },
  });
};
