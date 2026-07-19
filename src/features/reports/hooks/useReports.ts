import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginationParams } from '@common/types';
import { reportsService } from '../services/reports.service';
import { REPORTS_QUERY_KEY } from '../constants';
import type { CreateReportDto, ReportFilters, ReportId, UpdateReportDto } from '../types';

export const useReports = (params: PaginationParams & ReportFilters) =>
  useQuery({
    queryKey: [REPORTS_QUERY_KEY, 'list', params],
    queryFn: () => reportsService.getList(params),
    placeholderData: keepPreviousData,
  });

export const useReportDetail = (id: ReportId | undefined) =>
  useQuery({
    queryKey: [REPORTS_QUERY_KEY, 'detail', id],
    queryFn: () => reportsService.getOne(id as ReportId),
    enabled: Boolean(id),
  });

export const useCreateReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateReportDto) => reportsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REPORTS_QUERY_KEY] });
      toast.success('Report created successfully');
    },
  });
};

export const useUpdateReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: ReportId; dto: UpdateReportDto }) =>
      reportsService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REPORTS_QUERY_KEY] });
      toast.success('Report updated successfully');
    },
  });
};

export const useDeleteReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: ReportId) => reportsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REPORTS_QUERY_KEY] });
      toast.success('Report deleted successfully');
    },
  });
};
