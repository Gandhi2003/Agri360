export interface DashboardMetrics {
  totalFarmers: number;
  totalSales: number;
  activeOrders: number;
  lowStockItems: number;
  farmersTrend: number;
  salesTrend: number;
  ordersTrend: number;
  stockTrend: number;
}

export interface SeriesPoint {
  name: string;
  value: number;
}

export interface DashboardOverview {
  metrics: DashboardMetrics;
  revenueByMonth: SeriesPoint[];
  salesByCategory: SeriesPoint[];
  ordersByRegion: SeriesPoint[];
}
