import type { PaginationParams } from '@common/types';
import { quotationsApi } from '../api/quotations.api';
import type {
  CreateQuotationDto,
  QuotationFilters,
  QuotationId,
  UpdateQuotationDto,
} from '../types';

export const quotationsService = {
  getList: (params: PaginationParams & QuotationFilters) => quotationsApi.list(params),
  getOne: (id: QuotationId) => quotationsApi.getById(id),
  create: (dto: CreateQuotationDto) =>
    quotationsApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: QuotationId, dto: UpdateQuotationDto) => quotationsApi.update(id, dto),
  remove: (id: QuotationId) => quotationsApi.remove(id),
};
