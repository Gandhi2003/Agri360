export const DASHBOARD_QUERY_KEY = 'dashboard' as const;

/** Sample data so the dashboard renders before a backend is wired up. */
export const SAMPLE_OVERVIEW = {
  metrics: {
    totalFarmers: 4820,
    totalSales: 1284500,
    activeOrders: 312,
    lowStockItems: 18,
    farmersTrend: 12.4,
    salesTrend: 8.1,
    ordersTrend: -3.2,
    stockTrend: -5.6,
  },
  revenueByMonth: [
    { name: 'Jan', value: 82000 },
    { name: 'Feb', value: 91500 },
    { name: 'Mar', value: 105000 },
    { name: 'Apr', value: 98500 },
    { name: 'May', value: 121000 },
    { name: 'Jun', value: 134500 },
  ],
  salesByCategory: [
    { name: 'Seeds', value: 4200 },
    { name: 'Fertilizers', value: 3100 },
    { name: 'Pesticides', value: 2400 },
    { name: 'Equipment', value: 1600 },
    { name: 'Irrigation', value: 900 },
  ],
  ordersByRegion: [
    { name: 'North', value: 120 },
    { name: 'South', value: 98 },
    { name: 'East', value: 74 },
    { name: 'West', value: 86 },
  ],
} as const;
