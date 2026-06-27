import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { cropService } from '../services/crop.service';
import { CROP_QUERY_KEY } from '../constants';
import type { CreateCropDto, CropFilters, CropId, UpdateCropDto } from '../types';

/** Paginated, filtered list of Crop. */
export const useCrop = (params: PaginationParams & CropFilters) =>
  useQuery({
    queryKey: [CROP_QUERY_KEY, 'list', params],
    queryFn: () => cropService.getList(params),
    placeholderData: keepPreviousData,
  });

/** A single Crop by id. */
export const useCropDetail = (id: CropId | undefined) =>
  useQuery({
    queryKey: [CROP_QUERY_KEY, 'detail', id],
    queryFn: () => cropService.getOne(id as CropId),
    enabled: Boolean(id),
  });

/** Create a Crop. */
export const useCreateCrop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCropDto) => cropService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CROP_QUERY_KEY] });
      toast.success('Crop created successfully');
    },
  });
};

/** Update a Crop. */
export const useUpdateCrop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: CropId; dto: UpdateCropDto }) => cropService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CROP_QUERY_KEY] });
      toast.success('Crop updated successfully');
    },
  });
};

/** Delete a Crop. */
export const useDeleteCrop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: CropId) => cropService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CROP_QUERY_KEY] });
      toast.success('Crop deleted successfully');
    },
  });
};
