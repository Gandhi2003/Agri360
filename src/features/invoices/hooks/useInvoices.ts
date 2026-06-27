import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { invoicesService } from '../services/invoices.service';
import { INVOICES_QUERY_KEY } from '../constants';
import type { CreateInvoiceDto, InvoiceFilters, InvoiceId, UpdateInvoiceDto } from '../types';

/** Paginated, filtered list of Invoices. */
export const useInvoices = (params: PaginationParams & InvoiceFilters) =>
  useQuery({
    queryKey: [INVOICES_QUERY_KEY, 'list', params],
    queryFn: () => invoicesService.getList(params),
    placeholderData: keepPreviousData,
  });

/** A single Invoice by id. */
export const useInvoiceDetail = (id: InvoiceId | undefined) =>
  useQuery({
    queryKey: [INVOICES_QUERY_KEY, 'detail', id],
    queryFn: () => invoicesService.getOne(id as InvoiceId),
    enabled: Boolean(id),
  });

/** Create a Invoice. */
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateInvoiceDto) => invoicesService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INVOICES_QUERY_KEY] });
      toast.success('Invoice created successfully');
    },
  });
};

/** Update a Invoice. */
export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: InvoiceId; dto: UpdateInvoiceDto }) =>
      invoicesService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INVOICES_QUERY_KEY] });
      toast.success('Invoice updated successfully');
    },
  });
};

/** Delete a Invoice. */
export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: InvoiceId) => invoicesService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INVOICES_QUERY_KEY] });
      toast.success('Invoice deleted successfully');
    },
  });
};
