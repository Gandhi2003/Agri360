import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { Badge, Button, DataTable, PageHeader, SearchInput } from '@components';
import { useDebounce } from '@common/hooks';
import { useSuppliers } from '../hooks/useSuppliers';
import { useSuppliersStore } from '../store/suppliers.store';
import type { Supplier } from '../types';

export default function SuppliersListPage() {
  const { page, pageSize, setPage } = useSuppliersStore();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = useSuppliers({ page, pageSize, search: debouncedSearch });

  const columns = useMemo<ColumnDef<Supplier>[]>(
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
        title="Supplier Management"
        description="Manage supplier management records across your organization."
        actions={<Button leftIcon={<Plus className="size-4" />}>New</Button>}
      />
      <div className="max-w-sm">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search supplier management..."
        />
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
