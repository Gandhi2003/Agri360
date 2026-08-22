export interface Category {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  is_active: boolean;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;

export interface CategoryFilters {
  search?: string;
  is_active?: boolean;
}

export type CategoryId = number;
