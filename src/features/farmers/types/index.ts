export interface FarmerOwner {
  id: number;
  full_name: string;
  email: string;
}

export interface Farmer {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  village: string | null;
  district: string | null;
  state: string | null;
  land_size_acres: number | null;
  primary_crop: string | null;
  owner_id: number;
  owner: FarmerOwner;
  created_at: string;
  updated_at: string;
}

export interface CreateFarmerDto {
  name: string;
  phone?: string;
  email?: string;
  village?: string;
  district?: string;
  state?: string;
  land_size_acres?: number;
  primary_crop?: string;
}

export type UpdateFarmerDto = Partial<CreateFarmerDto>;

export interface FarmerFilters {
  search?: string;
}

export type FarmerId = number;
