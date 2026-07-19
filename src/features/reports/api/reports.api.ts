import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type { CreateReportDto, Report, ReportFilters, ReportId, UpdateReportDto } from '../types';

const RESOURCE = '/reports';

export const reportsApi = {
  list: (params: PaginationParams & ReportFilters) =>
    apiClient.get<PaginatedResponse<Report>>(RESOURCE, { params }),

  getById: (id: ReportId) => apiClient.get<Report>(`${RESOURCE}/${id}`),

  create: (dto: CreateReportDto) => apiClient.post<Report>(RESOURCE, dto),

  update: (id: ReportId, dto: UpdateReportDto) => apiClient.put<Report>(`${RESOURCE}/${id}`, dto),

  remove: (id: ReportId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
