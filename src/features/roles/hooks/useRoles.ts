import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { rolesService } from '../services/roles.service';
import { ROLES_QUERY_KEY } from '../constants';
import type { CreateRoleDto, RoleFilters, RoleId, UpdateRoleDto } from '../types';

export const useRoles = (params: PaginationParams & RoleFilters) =>
  useQuery({
    queryKey: [ROLES_QUERY_KEY, 'list', params],
    queryFn: () => rolesService.getList(params),
    placeholderData: keepPreviousData,
  });

export const useRoleDetail = (id: RoleId | undefined) =>
  useQuery({
    queryKey: [ROLES_QUERY_KEY, 'detail', id],
    queryFn: () => rolesService.getOne(id as RoleId),
    enabled: Boolean(id),
  });

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateRoleDto) => rolesService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROLES_QUERY_KEY] });
      toast.success('Role created successfully');
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: RoleId; dto: UpdateRoleDto }) => rolesService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROLES_QUERY_KEY] });
      toast.success('Role updated successfully');
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: RoleId) => rolesService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROLES_QUERY_KEY] });
      toast.success('Role deleted successfully');
    },
  });
};
