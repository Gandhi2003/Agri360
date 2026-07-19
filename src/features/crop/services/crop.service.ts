import type { PaginationParams } from '@common/types';
import { cropApi } from '../api/crop.api';
import type { CreateCropDto, CropFilters, CropId, UpdateCropDto } from '../types';

export const cropService = {
  getList: (params: PaginationParams & CropFilters) => cropApi.list(params),
  getOne: (id: CropId) => cropApi.getById(id),
  create: (dto: CreateCropDto) => cropApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: CropId, dto: UpdateCropDto) => cropApi.update(id, dto),
  remove: (id: CropId) => cropApi.remove(id),
};
