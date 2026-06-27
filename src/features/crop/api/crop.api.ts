import { apiClient } from '@common/api/apiClient';
import type { PaginatedResponse, PaginationParams } from '@common/types';
import type { CreateCropDto, Crop, CropFilters, CropId, UpdateCropDto } from '../types';

const RESOURCE = '/crop';

/** Pure data-access layer for the Crop Management feature. No business logic here. */
export const cropApi = {
  list: (params: PaginationParams & CropFilters) =>
    apiClient.get<PaginatedResponse<Crop>>(RESOURCE, { params }),

  getById: (id: CropId) => apiClient.get<Crop>(`${RESOURCE}/${id}`),

  create: (dto: CreateCropDto) => apiClient.post<Crop>(RESOURCE, dto),

  update: (id: CropId, dto: UpdateCropDto) => apiClient.put<Crop>(`${RESOURCE}/${id}`, dto),

  remove: (id: CropId) => apiClient.delete<void>(`${RESOURCE}/${id}`),
};
