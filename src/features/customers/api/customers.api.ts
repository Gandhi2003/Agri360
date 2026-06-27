import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type {
  CreateCustomerDto,
  Customer,
  CustomerFilters,
  CustomerId,
  UpdateCustomerDto,
} from '../types';

const RESOURCE = '/customers';

/** Pure data-access layer for the Customer Management feature. No business logic here. */
export const customersApi = {
  list: (params: PaginationParams & CustomerFilters) =>
    apiClient.get<PaginatedResponse<Customer>>(RESOURCE, { params }),

  getById: (id: CustomerId) => apiClient.get<Customer>(`${RESOURCE}/${id}`),

  create: (dto: CreateCustomerDto) => apiClient.post<Customer>(RESOURCE, dto),

  update: (id: CustomerId, dto: UpdateCustomerDto) =>
    apiClient.put<Customer>(`${RESOURCE}/${id}`, dto),

  remove: (id: CustomerId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
