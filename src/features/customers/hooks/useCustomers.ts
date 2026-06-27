import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { customersService } from '../services/customers.service';
import { CUSTOMERS_QUERY_KEY } from '../constants';
import type { CreateCustomerDto, CustomerFilters, CustomerId, UpdateCustomerDto } from '../types';

/** Paginated, filtered list of Customers. */
export const useCustomers = (params: PaginationParams & CustomerFilters) =>
  useQuery({
    queryKey: [CUSTOMERS_QUERY_KEY, 'list', params],
    queryFn: () => customersService.getList(params),
    placeholderData: keepPreviousData,
  });

/** A single Customer by id. */
export const useCustomerDetail = (id: CustomerId | undefined) =>
  useQuery({
    queryKey: [CUSTOMERS_QUERY_KEY, 'detail', id],
    queryFn: () => customersService.getOne(id as CustomerId),
    enabled: Boolean(id),
  });

/** Create a Customer. */
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCustomerDto) => customersService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CUSTOMERS_QUERY_KEY] });
      toast.success('Customer created successfully');
    },
  });
};

/** Update a Customer. */
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: CustomerId; dto: UpdateCustomerDto }) =>
      customersService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CUSTOMERS_QUERY_KEY] });
      toast.success('Customer updated successfully');
    },
  });
};

/** Delete a Customer. */
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: CustomerId) => customersService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CUSTOMERS_QUERY_KEY] });
      toast.success('Customer deleted successfully');
    },
  });
};
