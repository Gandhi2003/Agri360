import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { farmVisitsService } from '../services/farm-visits.service';
import { FARM_VISITS_QUERY_KEY } from '../constants';
import type {
  CreateFarmVisitDto,
  FarmVisitFilters,
  FarmVisitId,
  UpdateFarmVisitDto,
} from '../types';

/** Paginated, filtered list of FarmVisits. */
export const useFarmVisits = (params: PaginationParams & FarmVisitFilters) =>
  useQuery({
    queryKey: [FARM_VISITS_QUERY_KEY, 'list', params],
    queryFn: () => farmVisitsService.getList(params),
    placeholderData: keepPreviousData,
  });

/** A single FarmVisit by id. */
export const useFarmVisitDetail = (id: FarmVisitId | undefined) =>
  useQuery({
    queryKey: [FARM_VISITS_QUERY_KEY, 'detail', id],
    queryFn: () => farmVisitsService.getOne(id as FarmVisitId),
    enabled: Boolean(id),
  });

/** Create a FarmVisit. */
export const useCreateFarmVisit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateFarmVisitDto) => farmVisitsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FARM_VISITS_QUERY_KEY] });
      toast.success('FarmVisit created successfully');
    },
  });
};

/** Update a FarmVisit. */
export const useUpdateFarmVisit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: FarmVisitId; dto: UpdateFarmVisitDto }) =>
      farmVisitsService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FARM_VISITS_QUERY_KEY] });
      toast.success('FarmVisit updated successfully');
    },
  });
};

/** Delete a FarmVisit. */
export const useDeleteFarmVisit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: FarmVisitId) => farmVisitsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FARM_VISITS_QUERY_KEY] });
      toast.success('FarmVisit deleted successfully');
    },
  });
};
