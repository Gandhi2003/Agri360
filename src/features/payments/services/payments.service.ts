import type { PaginationParams } from '@common/types';
import { paymentsApi } from '../api/payments.api';
import type { CreatePaymentDto, PaymentFilters, PaymentId, UpdatePaymentDto } from '../types';

/**
 * Application/service layer for Payments.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const paymentsService = {
  getList: (params: PaginationParams & PaymentFilters) => paymentsApi.list(params),
  getOne: (id: PaymentId) => paymentsApi.getById(id),
  create: (dto: CreatePaymentDto) =>
    paymentsApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: PaymentId, dto: UpdatePaymentDto) => paymentsApi.update(id, dto),
  remove: (id: PaymentId) => paymentsApi.remove(id),
};
