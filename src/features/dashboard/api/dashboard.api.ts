import { apiClient } from '@common/api';
import type { DashboardOverview } from '../types';

export const dashboardApi = {
  getOverview: () => apiClient.get<DashboardOverview>('/dashboard/overview'),
};
