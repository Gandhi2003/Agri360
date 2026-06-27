import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { permissionsService } from '../services/permissions.service';
import { PERMISSIONS_QUERY_KEY } from '../constants';
import type {
  CreatePermissionDto,
  PermissionFilters,
  PermissionId,
  UpdatePermissionDto,
} from '../types';

/** Paginated, filtered list of Permissions. */
export const usePermissions = (params: PaginationParams & PermissionFilters) =>
  useQuery({
    queryKey: [PERMISSIONS_QUERY_KEY, 'list', params],
    queryFn: () => permissionsService.getList(params),
    placeholderData: keepPreviousData,
  });

/** A single Permission by id. */
export const usePermissionDetail = (id: PermissionId | undefined) =>
  useQuery({
    queryKey: [PERMISSIONS_QUERY_KEY, 'detail', id],
    queryFn: () => permissionsService.getOne(id as PermissionId),
    enabled: Boolean(id),
  });

/** Create a Permission. */
export const useCreatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePermissionDto) => permissionsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PERMISSIONS_QUERY_KEY] });
      toast.success('Permission created successfully');
    },
  });
};

/** Update a Permission. */
export const useUpdatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: PermissionId; dto: UpdatePermissionDto }) =>
      permissionsService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PERMISSIONS_QUERY_KEY] });
      toast.success('Permission updated successfully');
    },
  });
};

/** Delete a Permission. */
export const useDeletePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: PermissionId) => permissionsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PERMISSIONS_QUERY_KEY] });
      toast.success('Permission deleted successfully');
    },
  });
};
