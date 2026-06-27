import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreatePaymentDto,
  Payment,
  PaymentFilters,
  PaymentId,
  UpdatePaymentDto,
} from '../types';

const RESOURCE = '/payments';

/** Pure data-access layer for the Payments feature. No business logic here. */
export const paymentsApi = {
  list: (params: PaginationParams & PaymentFilters) =>
    apiClient.get<PaginatedResponse<Payment>>(RESOURCE, { params }),

  getById: (id: PaymentId) => apiClient.get<Payment>(`${RESOURCE}/${id}`),

  create: (dto: CreatePaymentDto) => apiClient.post<Payment>(RESOURCE, dto),

  update: (id: PaymentId, dto: UpdatePaymentDto) =>
    apiClient.put<Payment>(`${RESOURCE}/${id}`, dto),

  remove: (id: PaymentId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
