import { useCallback, useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
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
import { PERMISSIONS_PERMISSIONS } from '../constants';
import {
  useCreatePermission,
  useDeletePermission,
  usePermissions,
  useUpdatePermission,
} from '../hooks/usePermissions';
import { usePermissionsStore } from '../store/permissions.store';
import { PermissionForm } from '../components/PermissionForm';
import { PermissionStatus, type Permission } from '../types';
import type { PermissionFormValues } from '../schemas/permissions.schema';

const statusFilterOptions: SelectOption[] = [
  { label: 'All Status', value: '' },
  ...Object.values(PermissionStatus).map((value) => ({ label: value, value })),
];

const statusBadgeVariant: Record<PermissionStatus, 'success' | 'warning' | 'danger' | 'outline'> = {
  [PermissionStatus.Active]: 'success',
  [PermissionStatus.Pending]: 'warning',
  [PermissionStatus.Archived]: 'danger',
  [PermissionStatus.Inactive]: 'outline',
};

export default function PermissionsListPage() {
  const { page, pageSize, setPage } = usePermissionsStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = usePermissions({
    page,
    pageSize,
    search: debouncedSearch,
    status: (statusFilter || undefined) as PermissionStatus | undefined,
  });
  const createPermission = useCreatePermission();
  const updatePermission = useUpdatePermission();
  const deletePermission = useDeletePermission();

  const rows = useMemo(() => data?.data ?? [], [data]);

  const formModal = useModal<Permission>();
  const viewModal = useModal<Permission>();
  const deleteModal = useModal<Permission>();
  const editing = formModal.data;

  const [selectedIds, setSelectedIds] = useState<Set<Permission['id']>>(new Set());
  const allSelected = rows.length > 0 && selectedIds.size === rows.length;

  const toggleSelectAll = useCallback(() => {
    setSelectedIds(allSelected ? new Set() : new Set(rows.map((item) => item.id)));
  }, [allSelected, rows]);

  const toggleSelect = useCallback((id: Permission['id']) => {
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

  const handleSubmit = (values: PermissionFormValues) => {
    const onSuccess = () => formModal.close();
    if (editing) {
      updatePermission.mutate({ id: editing.id, dto: values }, { onSuccess });
    } else {
      createPermission.mutate(values, { onSuccess });
    }
  };

  const columns = useMemo<ColumnDef<Permission, unknown>[]>(
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
        header: 'Permission',
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
              aria-label="View permission"
              onClick={() => viewModal.open(row.original)}
              className="text-info transition-opacity hover:opacity-70"
            >
              <Eye className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Edit permission"
              onClick={() => formModal.open(row.original)}
              className="text-success transition-opacity hover:opacity-70"
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Delete permission"
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
      <PageHeader title="Permission Management" description="" />

      <Card className="grid grid-cols-2 items-center gap-3 p-4">
        <SearchInput
          value={search}
          className="max-w-md"
          onChange={setSearch}
          placeholder="Search permissions…"
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
        emptyMessage="No permissions match your search."
        title="All Permissions"
        headerActions={
          <PermissionGate permissions={[PERMISSIONS_PERMISSIONS.CREATE]}>
            <Button leftIcon={<Plus className="size-4" />} onClick={() => formModal.open()}>
              New Permission
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
        title={editing ? 'Edit Permission' : 'New Permission'}
        description="Provide the permission's details below."
      >
        <PermissionForm
          defaultValues={editing ?? undefined}
          onSubmit={handleSubmit}
          isSubmitting={createPermission.isPending || updatePermission.isPending}
          submitLabel={editing ? 'Update' : 'Create'}
        />
      </Modal>

      <Modal
        isOpen={viewModal.isOpen}
        onClose={viewModal.close}
        title="Permission details"
        description="Read-only view of this permission's record."
      >
        {viewModal.data && (
          <PermissionForm defaultValues={viewModal.data} readOnly onSubmit={() => {}} />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={() =>
          deleteModal.data &&
          deletePermission.mutate(deleteModal.data.id, { onSuccess: deleteModal.close })
        }
        title="Delete permission?"
        message={`This will permanently remove "${deleteModal.data?.name}".`}
        confirmLabel="Delete"
        isLoading={deletePermission.isPending}
      />
    </div>
  );
}
