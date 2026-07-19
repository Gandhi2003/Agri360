import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { profileService } from '../services/profile.service';
import { PROFILE_QUERY_KEY } from '../constants';
import type { CreateProfileDto, ProfileFilters, ProfileId, UpdateProfileDto } from '../types';

export const useProfile = (params: PaginationParams & ProfileFilters) =>
  useQuery({
    queryKey: [PROFILE_QUERY_KEY, 'list', params],
    queryFn: () => profileService.getList(params),
    placeholderData: keepPreviousData,
  });

export const useProfileDetail = (id: ProfileId | undefined) =>
  useQuery({
    queryKey: [PROFILE_QUERY_KEY, 'detail', id],
    queryFn: () => profileService.getOne(id as ProfileId),
    enabled: Boolean(id),
  });

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateProfileDto) => profileService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] });
      toast.success('Profile created successfully');
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: ProfileId; dto: UpdateProfileDto }) =>
      profileService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] });
      toast.success('Profile updated successfully');
    },
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: ProfileId) => profileService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] });
      toast.success('Profile deleted successfully');
    },
  });
};
