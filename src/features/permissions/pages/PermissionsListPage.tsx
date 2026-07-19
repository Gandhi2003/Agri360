import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { Badge, Button, DataTable, PageHeader, SearchInput } from '@components';
import { useDebounce } from '@common/hooks';
import { usePermissions } from '../hooks/usePermissions';
import { usePermissionsStore } from '../store/permissions.store';
import type { Permission } from '../types';

export default function PermissionsListPage() {
  const { page, pageSize, setPage } = usePermissionsStore();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = usePermissions({ page, pageSize, search: debouncedSearch });

  const columns = useMemo<ColumnDef<Permission>[]>(
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
        title="Permission Management"
        description="Manage permission management records across your organization."
        actions={<Button leftIcon={<Plus className="size-4" />}>New</Button>}
      />
      <div className="max-w-sm">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search permission management..."
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
