export enum CustomerStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Archived = 'archived',
}

export interface CustomerOwner {
  id: number;
  full_name: string;
  email: string;
}

export interface Customer {
  id: number;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  owner_id: number;
  owner: CustomerOwner;
  created_at: string;
  updated_at: string;
}

export interface CreateCustomerDto {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  country?: string;
}

export type UpdateCustomerDto = Partial<CreateCustomerDto>;

export interface CustomerFilters {
  search?: string;
  status?: CustomerStatus;
}

export type CustomerId = number;
