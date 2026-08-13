import { useCallback, useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import {
  Avatar,
  Badge,
  Card,
  Checkbox,
  ConfirmDialog,
  DataTable,
  Modal,
  PageHeader,
  SearchInput,
} from '@components';
import { useDebounce, useModal } from '@common/hooks';
import { formatDate } from '@common/utils';
import { useCreateUser, useDeleteUser, useUsers, useUpdateUser } from '../hooks/useUsers';
import { useUsersStore } from '../store/users.store';
import { UserForm } from '../components/UserForm';
import type { User } from '../types';
import type { UserFormValues } from '../schemas/users.schema';

const toFormValues = (user: User): Partial<UserFormValues> => ({
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName ?? '',
  phoneNumber: user.phoneNumber ?? '',
  address1: user.address1 ?? '',
  address2: user.address2 ?? '',
  country: user.country ?? '',
  state: user.state ?? '',
  city: user.city ?? '',
  pincode: user.pincode ?? '',
  dateOfBirth: user.dateOfBirth ?? '',
  isSuperuser: user.isSuperuser,
  roleIds: user.roles.map((role) => role.id),
});

export default function UsersListPage() {
  const { page, pageSize, setPage } = useUsersStore();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = useUsers({ page, pageSize, search: debouncedSearch });
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const rows = useMemo(() => data?.data ?? [], [data]);

  const formModal = useModal<User>();
  const viewModal = useModal<User>();
  const deleteModal = useModal<User>();
  const editing = formModal.data;

  const [selectedIds, setSelectedIds] = useState<Set<User['id']>>(new Set());
  const allSelected = rows.length > 0 && selectedIds.size === rows.length;

  const toggleSelectAll = useCallback(() => {
    setSelectedIds(allSelected ? new Set() : new Set(rows.map((item) => item.id)));
  }, [allSelected, rows]);

  const toggleSelect = useCallback((id: User['id']) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleSubmit = (values: UserFormValues) => {
    const onSuccess = () => formModal.close();
    if (editing) {
      updateUser.mutate({ id: editing.id, dto: values }, { onSuccess });
    } else {
      createUser.mutate(values, { onSuccess });
    }
  };

  const columns = useMemo<ColumnDef<User, unknown>[]>(
    () => [
      {
        id: 'select',
        header: () => (
          <Checkbox checked={allSelected} onChange={toggleSelectAll} aria-label="Select all" />
        ),
        enableSorting: false,
        meta: { cellClassName: 'pr-0', headerClassName: 'pr-0' },
        cell: ({ row }) => (
          <Checkbox
            checked={selectedIds.has(row.original.id)}
            onChange={() => toggleSelect(row.original.id)}
            aria-label={`Select ${row.original.fullName}`}
          />
        ),
      },
      {
        accessorKey: 'fullName',
        header: 'User',
        meta: { cellClassName: 'pl-1', headerClassName: 'pl-1' },
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar
              src={row.original.image ?? undefined}
              firstName={row.original.firstName}
              lastName={row.original.lastName}
              size="sm"
            />
            <div className="min-w-0">
              <p className="truncate font-semibold text-foreground">{row.original.fullName}</p>
              <p className="truncate text-xs text-muted-foreground">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone',
        cell: ({ row }) => row.original.phoneNumber ?? '—',
      },
      {
        accessorKey: 'roles',
        header: 'Roles',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.roles.length === 0 ? (
              <span className="text-muted-foreground">—</span>
            ) : (
              row.original.roles.map((role) => (
                <Badge key={role.id} variant="outline">
                  {role.name}
                </Badge>
              ))
            )}
          </div>
        ),
      },
      {
        accessorKey: 'isSuperuser',
        header: 'Superuser',
        cell: ({ row }) => (
          <Badge variant={row.original.isSuperuser ? 'success' : 'outline'}>
            {row.original.isSuperuser ? 'Yes' : 'No'}
          </Badge>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="View user"
              onClick={() => viewModal.open(row.original)}
              className="text-info transition-opacity hover:opacity-70"
            >
              <Eye className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Edit user"
              onClick={() => formModal.open(row.original)}
              className="text-success transition-opacity hover:opacity-70"
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Delete user"
              onClick={() => deleteModal.open(row.original)}
              className="text-danger transition-opacity hover:opacity-70"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ),
      },
    ],
    [allSelected, selectedIds, toggleSelectAll, toggleSelect, formModal, viewModal, deleteModal],
  );

  return (
    <div className="space-y-6">
      <PageHeader title="User Management" description="" />

      <Card className="flex items-center gap-3 p-4">
        <SearchInput
          value={search}
          className="max-w-md"
          onChange={setSearch}
          placeholder="Search users…"
        />
      </Card>

      <DataTable
        columns={columns}
        data={rows}
        isLoading={isLoading}
        emptyMessage="No users match your search."
        title="All Users"
        pagination={{
          page,
          pageSize,
          total: data?.meta.total ?? 0,
          onPageChange: setPage,
        }}
      />

      <Modal
        isOpen={formModal.isOpen}
        onClose={formModal.close}
        title={editing ? 'Edit User' : 'New User'}
        description="Provide the user's details below."
      >
        <UserForm
          defaultValues={editing ? toFormValues(editing) : undefined}
          onSubmit={handleSubmit}
          isSubmitting={createUser.isPending || updateUser.isPending}
          submitLabel={editing ? 'Update' : 'Create'}
        />
      </Modal>

      <Modal
        isOpen={viewModal.isOpen}
        onClose={viewModal.close}
        title="User details"
        description="Read-only view of this user's record."
      >
        {viewModal.data && (
          <UserForm defaultValues={toFormValues(viewModal.data)} readOnly onSubmit={() => {}} />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={() =>
          deleteModal.data &&
          deleteUser.mutate(deleteModal.data.id, { onSuccess: deleteModal.close })
        }
        title="Delete user?"
        message={`This will permanently remove "${deleteModal.data?.fullName}".`}
        confirmLabel="Delete"
        isLoading={deleteUser.isPending}
      />
    </div>
  );
}
