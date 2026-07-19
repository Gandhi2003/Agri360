import type { BaseEntity, ID } from '@common/types';

export enum ReportStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface Report extends BaseEntity {
  name: string;
  code: string;
  status: ReportStatus;
  description?: string;
}

export interface CreateReportDto {
  name: string;
  code: string;
  status: ReportStatus;
  description?: string;
}

export type UpdateReportDto = Partial<CreateReportDto>;

export interface ReportFilters {
  search?: string;
  status?: ReportStatus;
}

export type ReportId = ID;
