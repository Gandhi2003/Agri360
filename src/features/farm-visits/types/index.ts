import type { BaseEntity, ID } from '@common/types';

export enum FarmVisitStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface FarmVisit extends BaseEntity {
  name: string;
  code: string;
  status: FarmVisitStatus;
  description?: string;
}

export interface CreateFarmVisitDto {
  name: string;
  code: string;
  status: FarmVisitStatus;
  description?: string;
}

export type UpdateFarmVisitDto = Partial<CreateFarmVisitDto>;

export interface FarmVisitFilters {
  search?: string;
  status?: FarmVisitStatus;
}

export type FarmVisitId = ID;
