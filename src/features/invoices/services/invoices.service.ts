import type { PaginationParams } from '@common/types';
import { invoicesApi } from '../api/invoices.api';
import type { CreateInvoiceDto, InvoiceFilters, InvoiceId, UpdateInvoiceDto } from '../types';

/**
 * Application/service layer for Invoices.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const invoicesService = {
  getList: (params: PaginationParams & InvoiceFilters) => invoicesApi.list(params),
  getOne: (id: InvoiceId) => invoicesApi.getById(id),
  create: (dto: CreateInvoiceDto) =>
    invoicesApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: InvoiceId, dto: UpdateInvoiceDto) => invoicesApi.update(id, dto),
  remove: (id: InvoiceId) => invoicesApi.remove(id),
};
