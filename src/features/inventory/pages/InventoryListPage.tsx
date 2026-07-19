import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { Badge, Button, DataTable, PageHeader, SearchInput } from '@components';
import { useDebounce } from '@common/hooks';
import { useInventory } from '../hooks/useInventory';
import { useInventoryStore } from '../store/inventory.store';
import type { Inventory } from '../types';

export default function InventoryListPage() {
  const { page, pageSize, setPage } = useInventoryStore();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = useInventory({ page, pageSize, search: debouncedSearch });

  const columns = useMemo<ColumnDef<Inventory>[]>(
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
        title="Inventory"
        description="Manage inventory records across your organization."
        actions={<Button leftIcon={<Plus className="size-4" />}>New</Button>}
      />
      <div className="max-w-sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search inventory..." />
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
