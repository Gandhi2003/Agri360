import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateInvoiceDto,
  Invoice,
  InvoiceFilters,
  InvoiceId,
  UpdateInvoiceDto,
} from '../types';

const RESOURCE = '/invoices';

export const invoicesApi = {
  list: (params: PaginationParams & InvoiceFilters) =>
    apiClient.get<PaginatedResponse<Invoice>>(RESOURCE, { params }),

  getById: (id: InvoiceId) => apiClient.get<Invoice>(`${RESOURCE}/${id}`),

  create: (dto: CreateInvoiceDto) => apiClient.post<Invoice>(RESOURCE, dto),

  update: (id: InvoiceId, dto: UpdateInvoiceDto) =>
    apiClient.put<Invoice>(`${RESOURCE}/${id}`, dto),

  remove: (id: InvoiceId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
