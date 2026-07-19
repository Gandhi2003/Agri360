import { useQuery } from '@tanstack/react-query';
import type { DashboardOverview } from '../types';
import { dashboardApi } from '../api/dashboard.api';
import { DASHBOARD_QUERY_KEY, SAMPLE_OVERVIEW } from '../constants';

export const useDashboardOverview = () =>
  useQuery<DashboardOverview>({
    queryKey: [DASHBOARD_QUERY_KEY, 'overview'],
    queryFn: dashboardApi.getOverview,
    placeholderData: SAMPLE_OVERVIEW as unknown as DashboardOverview,
    retry: false,
  });
