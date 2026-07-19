import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { usersService } from '../services/users.service';
import { USERS_QUERY_KEY } from '../constants';
import type { CreateUserDto, UserFilters, UserId, UpdateUserDto } from '../types';

export const useUsers = (params: PaginationParams & UserFilters) =>
  useQuery({
    queryKey: [USERS_QUERY_KEY, 'list', params],
    queryFn: () => usersService.getList(params),
    placeholderData: keepPreviousData,
  });

export const useUserDetail = (id: UserId | undefined) =>
  useQuery({
    queryKey: [USERS_QUERY_KEY, 'detail', id],
    queryFn: () => usersService.getOne(id as UserId),
    enabled: Boolean(id),
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateUserDto) => usersService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      toast.success('User created successfully');
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: UserId; dto: UpdateUserDto }) => usersService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      toast.success('User updated successfully');
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: UserId) => usersService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      toast.success('User deleted successfully');
    },
  });
};
