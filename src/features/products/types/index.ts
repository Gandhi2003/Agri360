export interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string | null;
  unit: string;
  price: string;
  cost_price: string;
  stock_quantity: number;
  reorder_level: number;
  is_active: boolean;
  category_id: number;
  category: ProductCategory;
  created_at: string;
  updated_at: string;
}

export interface CreateProductDto {
  name: string;
  sku: string;
  description?: string;
  unit: string;
  price: string;
  cost_price: string;
  stock_quantity: number;
  reorder_level: number;
  is_active: boolean;
  category_id: number;
}

export type UpdateProductDto = Partial<CreateProductDto>;

export interface ProductFilters {
  search?: string;
  is_active?: boolean;
}

export type ProductId = number;
