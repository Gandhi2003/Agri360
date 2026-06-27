/** Standard envelope for a single resource response. */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/** Pagination metadata returned by the API. */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/** Standard envelope for a paginated list response. */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/** Query params accepted by list endpoints. */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/** Normalized API error surfaced to the UI layer. */
export interface ApiError {
  status: number;
  code: string;
  message: string;
  details?: Record<string, string[]>;
}
