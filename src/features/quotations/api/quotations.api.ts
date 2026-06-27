import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateQuotationDto,
  Quotation,
  QuotationFilters,
  QuotationId,
  UpdateQuotationDto,
} from '../types';

const RESOURCE = '/quotations';

/** Pure data-access layer for the Quotations feature. No business logic here. */
export const quotationsApi = {
  list: (params: PaginationParams & QuotationFilters) =>
    apiClient.get<PaginatedResponse<Quotation>>(RESOURCE, { params }),

  getById: (id: QuotationId) => apiClient.get<Quotation>(`${RESOURCE}/${id}`),

  create: (dto: CreateQuotationDto) => apiClient.post<Quotation>(RESOURCE, dto),

  update: (id: QuotationId, dto: UpdateQuotationDto) =>
    apiClient.put<Quotation>(`${RESOURCE}/${id}`, dto),

  remove: (id: QuotationId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
