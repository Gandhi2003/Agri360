import type { BaseEntity, ID } from '@common/types';

export interface UserRole {
  id: number;
  name: string;
}

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isSuperuser: boolean;
  phoneNumber: string | null;
  image: string | null;
  address1: string | null;
  address2: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  pincode: string | null;
  dateOfBirth: string | null;
  roles: UserRole[];
}

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName?: string;
  isSuperuser?: boolean;
  phoneNumber?: string | null;
  address1?: string | null;
  address2?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  pincode?: string | null;
  dateOfBirth?: string | null;
  roleIds?: number[];
  image?: File | null;
}

export type UpdateUserDto = Partial<CreateUserDto>;

export interface UserFilters {
  search?: string;
  isSuperuser?: boolean;
  roleId?: number;
}

export type UserId = ID;
