import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { settingsService } from '../services/settings.service';
import { SETTINGS_QUERY_KEY } from '../constants';
import type { CreateSettingDto, SettingFilters, SettingId, UpdateSettingDto } from '../types';

export const useSettings = (params: PaginationParams & SettingFilters) =>
  useQuery({
    queryKey: [SETTINGS_QUERY_KEY, 'list', params],
    queryFn: () => settingsService.getList(params),
    placeholderData: keepPreviousData,
  });

export const useSettingDetail = (id: SettingId | undefined) =>
  useQuery({
    queryKey: [SETTINGS_QUERY_KEY, 'detail', id],
    queryFn: () => settingsService.getOne(id as SettingId),
    enabled: Boolean(id),
  });

export const useCreateSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateSettingDto) => settingsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SETTINGS_QUERY_KEY] });
      toast.success('Setting created successfully');
    },
  });
};

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: SettingId; dto: UpdateSettingDto }) =>
      settingsService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SETTINGS_QUERY_KEY] });
      toast.success('Setting updated successfully');
    },
  });
};

export const useDeleteSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: SettingId) => settingsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SETTINGS_QUERY_KEY] });
      toast.success('Setting deleted successfully');
    },
  });
};
