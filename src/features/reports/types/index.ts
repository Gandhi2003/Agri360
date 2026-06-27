import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a Report. */
export enum ReportStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core Report domain entity. */
export interface Report extends BaseEntity {
  name: string;
  code: string;
  status: ReportStatus;
  description?: string;
}

/** Payload to create a Report. */
export interface CreateReportDto {
  name: string;
  code: string;
  status: ReportStatus;
  description?: string;
}

/** Payload to update a Report (all fields optional). */
export type UpdateReportDto = Partial<CreateReportDto>;

/** Server/UI filters for listing Reports. */
export interface ReportFilters {
  search?: string;
  status?: ReportStatus;
}

export type ReportId = ID;
