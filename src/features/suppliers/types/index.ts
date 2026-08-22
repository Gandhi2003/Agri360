export interface SupplierOwner {
  id: number;
  full_name: string;
  email: string;
}

export interface Supplier {
  id: number;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  owner_id: number;
  owner: SupplierOwner;
  created_at: string;
  updated_at: string;
}

export interface CreateSupplierDto {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  country?: string;
}

export type UpdateSupplierDto = Partial<CreateSupplierDto>;

export interface SupplierFilters {
  search?: string;
}

export type SupplierId = number;
