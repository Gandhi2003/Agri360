import { Boxes, IndianRupee, ShoppingCart, Tractor } from 'lucide-react';
import { formatCurrency, formatNumber } from '@common/utils';
import { useAuth } from '@common/hooks';
import { AreaChartCard, BarChartCard, PieChartCard, StatCard } from '@components';
import { useDashboardOverview } from '../hooks/useDashboard';
import { SAMPLE_OVERVIEW } from '../constants';
import { WelcomeBanner } from '../components/WelcomeBanner';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data } = useDashboardOverview();
  const overview = data ?? (SAMPLE_OVERVIEW as unknown as typeof SAMPLE_OVERVIEW);
  const { metrics } = overview;

  return (
    <div className="space-y-6">
      <WelcomeBanner name={user?.firstName || 'there'} updatedAt={user?.updatedAt} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Farmers"
          value={formatNumber(metrics.totalFarmers)}
          icon={Tractor}
          trend={metrics.farmersTrend}
        />
        <StatCard
          label="Total Sales"
          value={formatCurrency(metrics.totalSales)}
          icon={IndianRupee}
          trend={metrics.salesTrend}
        />
        <StatCard
          label="Active Orders"
          value={formatNumber(metrics.activeOrders)}
          icon={ShoppingCart}
          trend={metrics.ordersTrend}
        />
        <StatCard
          label="Low Stock Items"
          value={formatNumber(metrics.lowStockItems)}
          icon={Boxes}
          trend={metrics.stockTrend}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AreaChartCard title="Revenue (last 6 months)" data={[...overview.revenueByMonth]} />
        </div>
        <PieChartCard title="Sales by Category" data={[...overview.salesByCategory]} />
      </div>

      <BarChartCard title="Orders by Region" data={[...overview.ordersByRegion]} />
    </div>
  );
}
