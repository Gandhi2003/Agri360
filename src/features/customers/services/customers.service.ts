import type { PaginationParams } from '@common/types';
import { customersApi } from '../api/customers.api';
import type { CreateCustomerDto, CustomerFilters, CustomerId, UpdateCustomerDto } from '../types';

export const customersService = {
  getList: (params: PaginationParams & CustomerFilters) => customersApi.list(params),
  getOne: (id: CustomerId) => customersApi.getById(id),
  create: (dto: CreateCustomerDto) => customersApi.create(dto),
  update: (id: CustomerId, dto: UpdateCustomerDto) => customersApi.update(id, dto),
  remove: (id: CustomerId) => customersApi.remove(id),
};
