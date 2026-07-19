import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { Badge, Button, DataTable, PageHeader, SearchInput } from '@components';
import { useDebounce } from '@common/hooks';
import { usePurchase } from '../hooks/usePurchase';
import { usePurchaseStore } from '../store/purchase.store';
import type { Purchase } from '../types';

export default function PurchaseListPage() {
  const { page, pageSize, setPage } = usePurchaseStore();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = usePurchase({ page, pageSize, search: debouncedSearch });

  const columns = useMemo<ColumnDef<Purchase>[]>(
    () => [
      { accessorKey: 'code', header: 'Code' },
      { accessorKey: 'name', header: 'Name' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>,
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Purchase"
        description="Manage purchase records across your organization."
        actions={<Button leftIcon={<Plus className="size-4" />}>New</Button>}
      />
      <div className="max-w-sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search purchase..." />
      </div>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        pagination={{
          page,
          pageSize,
          total: data?.meta.total ?? 0,
          onPageChange: setPage,
        }}
      />
    </div>
  );
}
