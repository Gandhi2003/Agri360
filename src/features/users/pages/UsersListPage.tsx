import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { Badge, Button, DataTable, PageHeader, SearchInput } from '@components';
import { useDebounce } from '@common/hooks';
import { useUsers } from '../hooks/useUsers';
import { useUsersStore } from '../store/users.store';
import type { User } from '../types';

export default function UsersListPage() {
  const { page, pageSize, setPage } = useUsersStore();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = useUsers({ page, pageSize, search: debouncedSearch });

  const columns = useMemo<ColumnDef<User>[]>(
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
        title="User Management"
        description="Manage user management records across your organization."
        actions={<Button leftIcon={<Plus className="size-4" />}>New</Button>}
      />
      <div className="max-w-sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search user management..." />
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
