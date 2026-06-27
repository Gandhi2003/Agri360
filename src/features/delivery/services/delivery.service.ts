import type { PaginationParams } from '@common/types';
import { deliveryApi } from '../api/delivery.api';
import type { CreateDeliveryDto, DeliveryFilters, DeliveryId, UpdateDeliveryDto } from '../types';

/**
 * Application/service layer for Delivery.
 * Encapsulates orchestration & business rules, keeping the API layer thin
 * and the UI/hooks layer free of domain logic (Clean Architecture).
 */
export const deliveryService = {
  getList: (params: PaginationParams & DeliveryFilters) => deliveryApi.list(params),
  getOne: (id: DeliveryId) => deliveryApi.getById(id),
  create: (dto: CreateDeliveryDto) =>
    deliveryApi.create({ ...dto, code: dto.code.trim().toUpperCase() }),
  update: (id: DeliveryId, dto: UpdateDeliveryDto) => deliveryApi.update(id, dto),
  remove: (id: DeliveryId) => deliveryApi.remove(id),
};
