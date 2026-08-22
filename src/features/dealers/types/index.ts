export enum DealerStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface DealerOwner {
  id: number;
  full_name: string;
  email: string;
}

export interface Dealer {
  id: number;
  name: string;
  company: string;
  email: string | null;
  phone: string | null;
  region: string | null;
  gst_number: string | null;
  owner_id: number;
  owner: DealerOwner;
  created_at: string;
  updated_at: string;
}

export interface CreateDealerDto {
  name: string;
  company: string;
  email?: string;
  phone?: string;
  region?: string;
  gst_number?: string;
}

export type UpdateDealerDto = Partial<CreateDealerDto>;

export interface DealerFilters {
  search?: string;
  status?: DealerStatus;
}

export type DealerId = number;
