import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { farmersService } from '../services/farmers.service';
import { FARMERS_QUERY_KEY } from '../constants';
import type { CreateFarmerDto, FarmerFilters, FarmerId, UpdateFarmerDto } from '../types';

/** Paginated, filtered list of Farmers. */
export const useFarmers = (params: PaginationParams & FarmerFilters) =>
  useQuery({
    queryKey: [FARMERS_QUERY_KEY, 'list', params],
    queryFn: () => farmersService.getList(params),
    placeholderData: keepPreviousData,
  });

/** A single Farmer by id. */
export const useFarmer = (id: FarmerId | undefined) =>
  useQuery({
    queryKey: [FARMERS_QUERY_KEY, 'detail', id],
    queryFn: () => farmersService.getOne(id as FarmerId),
    enabled: Boolean(id),
  });

/** Create a Farmer. */
export const useCreateFarmer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateFarmerDto) => farmersService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FARMERS_QUERY_KEY] });
      toast.success('Farmer created successfully');
    },
  });
};

/** Update a Farmer. */
export const useUpdateFarmer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: FarmerId; dto: UpdateFarmerDto }) =>
      farmersService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FARMERS_QUERY_KEY] });
      toast.success('Farmer updated successfully');
    },
  });
};

/** Delete a Farmer. */
export const useDeleteFarmer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: FarmerId) => farmersService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FARMERS_QUERY_KEY] });
      toast.success('Farmer deleted successfully');
    },
  });
};
