import type { PaginationParams } from '@common/types';
import { reportsApi } from '../api/reports.api';
import type { CreateReportDto, ReportFilters, ReportId, UpdateReportDto } from '../types';

/**
 * Application/service layer for Reports.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const reportsService = {
  getList: (params: PaginationParams & ReportFilters) => reportsApi.list(params),
  getOne: (id: ReportId) => reportsApi.getById(id),
  create: (dto: CreateReportDto) =>
    reportsApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: ReportId, dto: UpdateReportDto) => reportsApi.update(id, dto),
  remove: (id: ReportId) => reportsApi.remove(id),
};
