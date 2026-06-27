import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { suppliersService } from '../services/suppliers.service';
import { SUPPLIERS_QUERY_KEY } from '../constants';
import type { CreateSupplierDto, SupplierFilters, SupplierId, UpdateSupplierDto } from '../types';

/** Paginated, filtered list of Suppliers. */
export const useSuppliers = (params: PaginationParams & SupplierFilters) =>
  useQuery({
    queryKey: [SUPPLIERS_QUERY_KEY, 'list', params],
    queryFn: () => suppliersService.getList(params),
    placeholderData: keepPreviousData,
  });

/** A single Supplier by id. */
export const useSupplierDetail = (id: SupplierId | undefined) =>
  useQuery({
    queryKey: [SUPPLIERS_QUERY_KEY, 'detail', id],
    queryFn: () => suppliersService.getOne(id as SupplierId),
    enabled: Boolean(id),
  });

/** Create a Supplier. */
export const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateSupplierDto) => suppliersService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SUPPLIERS_QUERY_KEY] });
      toast.success('Supplier created successfully');
    },
  });
};

/** Update a Supplier. */
export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: SupplierId; dto: UpdateSupplierDto }) =>
      suppliersService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SUPPLIERS_QUERY_KEY] });
      toast.success('Supplier updated successfully');
    },
  });
};

/** Delete a Supplier. */
export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: SupplierId) => suppliersService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SUPPLIERS_QUERY_KEY] });
      toast.success('Supplier deleted successfully');
    },
  });
};
