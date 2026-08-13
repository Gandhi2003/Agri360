import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Plus, ShieldCheck, Trash2 } from 'lucide-react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  ConfirmDialog,
  DataTable,
  Modal,
  PageHeader,
  PermissionGate,
  SearchInput,
  Select,
} from '@components';
import { useDebounce, useModal } from '@common/hooks';
import { formatDate } from '@common/utils';
import type { SelectOption } from '@common/types';
import { ROLES_PERMISSIONS } from '../constants';
import { useCreateRole, useDeleteRole, useRoles, useUpdateRole } from '../hooks/useRoles';
import { useRolesStore } from '../store/roles.store';
import { RoleForm } from '../components/RoleForm';
import { RoleStatus, type Role } from '../types';
import type { RoleFormValues } from '../schemas/roles.schema';

const statusFilterOptions: SelectOption[] = [
  { label: 'All Status', value: '' },
  ...Object.values(RoleStatus).map((value) => ({ label: value, value })),
];

const statusBadgeVariant: Record<RoleStatus, 'success' | 'warning' | 'danger' | 'outline'> = {
  [RoleStatus.Active]: 'success',
  [RoleStatus.Pending]: 'warning',
  [RoleStatus.Archived]: 'danger',
  [RoleStatus.Inactive]: 'outline',
};

export default function RolesListPage() {
  const navigate = useNavigate();
  const { page, pageSize, setPage } = useRolesStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = useRoles({
    page,
    pageSize,
    search: debouncedSearch,
    status: (statusFilter || undefined) as RoleStatus | undefined,
  });
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const deleteRole = useDeleteRole();

  const rows = useMemo(() => data?.data ?? [], [data]);

  const formModal = useModal<Role>();
  const viewModal = useModal<Role>();
  const deleteModal = useModal<Role>();
  const editing = formModal.data;

  const [selectedIds, setSelectedIds] = useState<Set<Role['id']>>(new Set());
  const allSelected = rows.length > 0 && selectedIds.size === rows.length;

  const toggleSelectAll = useCallback(() => {
    setSelectedIds(allSelected ? new Set() : new Set(rows.map((item) => item.id)));
  }, [allSelected, rows]);

  const toggleSelect = useCallback((id: Role['id']) => {
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

  const handleSubmit = (values: RoleFormValues) => {
    const onSuccess = () => formModal.close();
    if (editing) {
      updateRole.mutate({ id: editing.id, dto: values }, { onSuccess });
    } else {
      createRole.mutate(values, { onSuccess });
    }
  };

  const columns = useMemo<ColumnDef<Role, unknown>[]>(
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
            aria-label={`Select ${row.original.name}`}
          />
        ),
      },
      {
        accessorKey: 'name',
        header: 'Role',
        meta: { cellClassName: 'pl-1', headerClassName: 'pl-1' },
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar firstName={row.original.name} size="sm" />
            <div className="min-w-0">
              <p className="truncate font-semibold text-foreground">{row.original.name}</p>
              <p className="font-mono text-xs text-muted-foreground">{row.original.code}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <Badge variant={statusBadgeVariant[row.original.status]}>{row.original.status}</Badge>
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
              aria-label="View role"
              onClick={() => viewModal.open(row.original)}
              className="text-info transition-opacity hover:opacity-70"
            >
              <Eye className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Edit role"
              onClick={() => formModal.open(row.original)}
              className="text-success transition-opacity hover:opacity-70"
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Manage permissions"
              onClick={() => navigate(`/roles/${row.original.id}/permissions`)}
              className="text-primary transition-opacity hover:opacity-70"
            >
              <ShieldCheck className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Delete role"
              onClick={() => deleteModal.open(row.original)}
              className="text-danger transition-opacity hover:opacity-70"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ),
      },
    ],
    [
      allSelected,
      selectedIds,
      toggleSelectAll,
      toggleSelect,
      formModal,
      viewModal,
      deleteModal,
      navigate,
    ],
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Role Management" description="" />

      <Card className="grid grid-cols-2 items-center gap-3 p-4">
        <SearchInput
          value={search}
          className="max-w-md"
          onChange={setSearch}
          placeholder="Search roles…"
        />
        <div className="ml-auto w-48">
          <Select
            options={statusFilterOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          />
        </div>
      </Card>

      <DataTable
        columns={columns}
        data={rows}
        isLoading={isLoading}
        emptyMessage="No roles match your search."
        title="All Roles"
        headerActions={
          <PermissionGate permissions={[ROLES_PERMISSIONS.CREATE]}>
            <Button leftIcon={<Plus className="size-4" />} onClick={() => formModal.open()}>
              New Role
            </Button>
          </PermissionGate>
        }
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
        title={editing ? 'Edit Role' : 'New Role'}
        description="Provide the role's details below."
      >
        <RoleForm
          defaultValues={editing ?? undefined}
          onSubmit={handleSubmit}
          isSubmitting={createRole.isPending || updateRole.isPending}
          submitLabel={editing ? 'Update' : 'Create'}
        />
      </Modal>

      <Modal
        isOpen={viewModal.isOpen}
        onClose={viewModal.close}
        title="Role details"
        description="Read-only view of this role's record."
      >
        {viewModal.data && <RoleForm defaultValues={viewModal.data} readOnly onSubmit={() => {}} />}
      </Modal>

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={() =>
          deleteModal.data &&
          deleteRole.mutate(deleteModal.data.id, { onSuccess: deleteModal.close })
        }
        title="Delete role?"
        message={`This will permanently remove "${deleteModal.data?.name}".`}
        confirmLabel="Delete"
        isLoading={deleteRole.isPending}
      />
    </div>
  );
}
