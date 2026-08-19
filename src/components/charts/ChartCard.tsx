import { useState, type ReactNode } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Dropdown } from '@components/ui/Dropdown';

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

const AXIS = {
  stroke: '#67707d',
  fontSize: 11,
  fontWeight: 400,
  fontFamily: 'Helvetica, Arial, sans-serif',
};
const PIE_COLORS = [
  'rgb(var(--primary))',
  'rgb(var(--info))',
  'rgb(var(--warning))',
  'rgb(var(--danger))',
  'rgb(var(--brand-300))',
];

const formatKLower = (value: number) => `${Math.round(value / 1000)}k`;

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
        <YAxis tick={AXIS} tickLine={false} axisLine={false} tickFormatter={formatKLower} />
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

interface LineSeriesConfig<T> {
  key: keyof T & string;
  label: string;
  color: string;
}

const formatK = (value: number) => `${Math.round(value / 1000)}K`;

export function MultiLineChartCard<T extends { name: string }>({
  title,
  data,
  series,
  action,
}: {
  title: string;
  data: T[];
  series: LineSeriesConfig<T>[];
  action?: ReactNode;
}) {
  return (
    <ChartWrapper title={title} action={action}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" vertical={false} />
        <XAxis dataKey="name" tick={AXIS} tickLine={false} axisLine={false} />
        <YAxis tick={AXIS} tickLine={false} axisLine={false} tickFormatter={formatK} />
        <Tooltip />
        <Legend
          iconType="circle"
          verticalAlign="bottom"
          wrapperStyle={{ paddingTop: 16, fontSize: 13 }}
        />
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ChartWrapper>
  );
}

export function YearFilter({
  year,
  years,
  onChange,
}: {
  year: string;
  years: string[];
  onChange: (year: string) => void;
}) {
  return (
    <Dropdown
      align="end"
      trigger={
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground"
        >
          {year}
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
      }
      items={years.map((y) => ({ label: y, onClick: () => onChange(y) }))}
    />
  );
}

export function BarListCard({
  title,
  data,
  action,
  valueFormatter = (value: number) => value.toLocaleString('en-IN'),
}: {
  title: string;
  data: SeriesPoint[];
  action?: ReactNode;
  valueFormatter?: (value: number) => string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-center space-y-4.5">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <span className="w-10 shrink-0 text-sm font-bold text-foreground">{item.name}</span>
            <div className="h-3 flex-1 overflow-hidden rounded-4px bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#f5c69b] to-[#e8672d]"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
            <span className="w-14 shrink-0 text-right text-sm text-muted-foreground">
              {valueFormatter(item.value)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const DONUT_COLORS = ['#4A9FE0', '#D2521D', '#3C8F62', '#BB4FAE', '#3B2063', '#C68A3D'];

export function DonutChartCard({ title, data }: { title: string; data: SeriesPoint[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const active = data[activeIndex] ?? data[0];
  const activePercent = Math.round(((active?.value ?? 0) / total) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="relative size-64 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="68%"
                outerRadius="100%"
                paddingAngle={0}
                stroke="none"
                onMouseEnter={(_, i) => setActiveIndex(i)}
              >
                {data.map((d, i) => (
                  <Cell key={d.name} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-foreground">{activePercent}%</span>
            <span className="text-sm text-muted-foreground">{active?.name}</span>
          </div>
        </div>
        <ul className="w-full flex-1 space-y-3">
          {data.map((d, i) => (
            <li
              key={d.name}
              onMouseEnter={() => setActiveIndex(i)}
              className="flex cursor-default items-center justify-between gap-3 text-sm"
            >
              <span className="flex items-center gap-2 text-muted-foreground">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length] }}
                />
                {d.name}
              </span>
              <span className="font-bold text-foreground">
                {Math.round((d.value / total) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
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
