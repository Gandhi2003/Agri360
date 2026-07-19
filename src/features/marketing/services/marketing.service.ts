import type { PaginationParams } from '@common/types';
import { marketingApi } from '../api/marketing.api';
import type {
  CreateMarketingDto,
  MarketingFilters,
  MarketingId,
  UpdateMarketingDto,
} from '../types';

export const marketingService = {
  getList: (params: PaginationParams & MarketingFilters) => marketingApi.list(params),
  getOne: (id: MarketingId) => marketingApi.getById(id),
  create: (dto: CreateMarketingDto) =>
    marketingApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: MarketingId, dto: UpdateMarketingDto) => marketingApi.update(id, dto),
  remove: (id: MarketingId) => marketingApi.remove(id),
};
