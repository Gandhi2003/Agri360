import type { BaseEntity, ID } from '@common/types';

/** Lifecycle status for a FarmVisit. */
export enum FarmVisitStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

/** Core FarmVisit domain entity. */
export interface FarmVisit extends BaseEntity {
  name: string;
  code: string;
  status: FarmVisitStatus;
  description?: string;
}

/** Payload to create a FarmVisit. */
export interface CreateFarmVisitDto {
  name: string;
  code: string;
  status: FarmVisitStatus;
  description?: string;
}

/** Payload to update a FarmVisit (all fields optional). */
export type UpdateFarmVisitDto = Partial<CreateFarmVisitDto>;

/** Server/UI filters for listing FarmVisits. */
export interface FarmVisitFilters {
  search?: string;
  status?: FarmVisitStatus;
}

export type FarmVisitId = ID;
