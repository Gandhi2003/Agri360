import { useState } from 'react';
import { Boxes, IndianRupee, ShoppingCart, Users } from 'lucide-react';
import { formatCurrency, formatNumber } from '@common/utils';
import { useAuth } from '@common/hooks';
import {
  AreaChartCard,
  BarListCard,
  DonutChartCard,
  MultiLineChartCard,
  StatCard,
  YearFilter,
} from '@components';
import { useDashboardOverview } from '../hooks/useDashboard';
import { SAMPLE_OVERVIEW } from '../constants';
import { WelcomeBanner } from '../components/WelcomeBanner';

const YEARS = ['2026', '2025', '2024'];

export default function DashboardPage() {
  const { user } = useAuth();
  const { data } = useDashboardOverview();
  const overview = data ?? (SAMPLE_OVERVIEW as unknown as typeof SAMPLE_OVERVIEW);
  const { metrics } = overview;
  const [year, setYear] = useState(YEARS[0]);

  return (
    <div className="space-y-6">
      <WelcomeBanner name={user?.firstName || 'there'} updatedAt={user?.updatedAt} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Farmers"
          value={formatNumber(metrics.totalFarmers)}
          icon={Users}
          trend={metrics.farmersTrend}
          accent="success"
          barGradient="bg-gradient-to-r from-success via-warning to-danger"
        />
        <StatCard
          label="Total Sales"
          value={formatCurrency(metrics.totalSales)}
          icon={IndianRupee}
          trend={metrics.salesTrend}
          accent="primary"
          barGradient="bg-gradient-to-r from-purple via-pink to-purple"
          cardBg="bg-purple/5"
          iconBg="bg-[#6a1b9a]"
        />
        <StatCard
          label="Active Orders"
          value={formatNumber(metrics.activeOrders)}
          icon={ShoppingCart}
          trend={metrics.ordersTrend}
          accent="warning"
          barGradient="bg-gradient-to-r from-warning via-orange to-warning"
        />
        <StatCard
          label="Low Stock Items"
          value={formatNumber(metrics.lowStockItems)}
          icon={Boxes}
          trend={metrics.stockTrend}
          accent="danger"
          barGradient="bg-gradient-to-r from-pink via-purple to-pink"
          cardBg="bg-pink/5"
          iconBg="bg-[#cc25b0]"
        />
      </div>

      <MultiLineChartCard
        title="Profit Margin vs Sales"
        data={[...overview.profitMarginVsSales]}
        series={[
          { key: 'profitMargin', label: 'Profit Margin', color: 'var(--color-orange)' },
          { key: 'sales', label: 'Sales', color: 'rgb(var(--success))' },
        ]}
        action={<YearFilter year={year} years={YEARS} onChange={setYear} />}
      />

      <AreaChartCard title="Revenue (last 6 months)" data={[...overview.revenueByMonth]} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BarListCard title="Orders by Region" data={[...overview.ordersByRegion]} />
        <DonutChartCard title="Sales by Category" data={[...overview.salesByCategory]} />
      </div>
    </div>
  );
}
