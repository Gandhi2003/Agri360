import type { ReactNode } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';

interface ChartWrapperProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  height?: number;
}

function ChartWrapper({ title, action, children, height = 300 }: ChartWrapperProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {children as React.ReactElement}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface SeriesPoint {
  name: string;
  value: number;
}

const AXIS = { stroke: 'rgb(var(--muted-foreground))', fontSize: 12 };
const PIE_COLORS = [
  'rgb(var(--primary))',
  'rgb(var(--info))',
  'rgb(var(--warning))',
  'rgb(var(--danger))',
  'rgb(var(--brand-300))',
];

export function AreaChartCard({ title, data }: { title: string; data: SeriesPoint[] }) {
  return (
    <ChartWrapper title={title}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgb(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="rgb(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" vertical={false} />
        <XAxis dataKey="name" tick={AXIS} tickLine={false} axisLine={false} />
        <YAxis tick={AXIS} tickLine={false} axisLine={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="rgb(var(--primary))"
          strokeWidth={2}
          fill="url(#areaFill)"
        />
      </AreaChart>
    </ChartWrapper>
  );
}

export function BarChartCard({ title, data }: { title: string; data: SeriesPoint[] }) {
  return (
    <ChartWrapper title={title}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" vertical={false} />
        <XAxis dataKey="name" tick={AXIS} tickLine={false} axisLine={false} />
        <YAxis tick={AXIS} tickLine={false} axisLine={false} />
        <Tooltip cursor={{ fill: 'rgb(var(--muted))' }} />
        <Bar dataKey="value" fill="rgb(var(--primary))" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ChartWrapper>
  );
}

export function PieChartCard({ title, data }: { title: string; data: SeriesPoint[] }) {
  return (
    <ChartWrapper title={title}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ChartWrapper>
  );
}
