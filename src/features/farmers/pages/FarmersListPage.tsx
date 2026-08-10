import { useCallback, useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import {
  Avatar,
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
import type { SelectOption } from '@common/types';
import { FARMERS_PERMISSIONS } from '../constants';
import { useCreateFarmer, useDeleteFarmer, useFarmers, useUpdateFarmer } from '../hooks/useFarmers';
import { useFarmersStore } from '../store/farmers.store';
import { FarmerForm } from '../components/FarmerForm';
import { FarmerStatus, type Farmer } from '../types';
import type { FarmerFormValues } from '../schemas/farmers.schema';

const statusFilterOptions: SelectOption[] = [
  { label: 'All Status', value: '' },
  ...Object.values(FarmerStatus).map((value) => ({ label: value, value })),
];

export default function FarmersListPage() {
  const { page, pageSize, setPage } = useFarmersStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = useFarmers({
    page,
    pageSize,
    search: debouncedSearch,
    status: (statusFilter || undefined) as FarmerStatus | undefined,
  });
  const createFarmer = useCreateFarmer();
  const updateFarmer = useUpdateFarmer();
  const deleteFarmer = useDeleteFarmer();

  const rows = useMemo(() => data?.data ?? [], [data]);

  const formModal = useModal<Farmer>();
  const viewModal = useModal<Farmer>();
  const deleteModal = useModal<Farmer>();
  const editing = formModal.data;

  const [selectedIds, setSelectedIds] = useState<Set<Farmer['id']>>(new Set());
  const allSelected = rows.length > 0 && selectedIds.size === rows.length;

  const toggleSelectAll = useCallback(() => {
    setSelectedIds(allSelected ? new Set() : new Set(rows.map((farmer) => farmer.id)));
  }, [allSelected, rows]);

  const toggleSelect = useCallback((id: Farmer['id']) => {
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

  const handleSubmit = (values: FarmerFormValues) => {
    const onSuccess = () => formModal.close();
    if (editing) {
      updateFarmer.mutate({ id: editing.id, dto: values }, { onSuccess });
    } else {
      createFarmer.mutate(values, { onSuccess });
    }
  };

  const columns = useMemo<ColumnDef<Farmer, unknown>[]>(
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
        header: 'Farmer',
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
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
          <p className="font-mono text-sm text-muted-foreground">{row.original.email || '—'}</p>
        ),
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        cell: ({ row }) => (
          <p className="font-mono text-sm text-muted-foreground">{row.original.phone || '—'}</p>
        ),
      },
      {
        accessorKey: 'primary_crop',
        header: 'Primary Crop',
        cell: ({ row }) => (
          <p className="font-mono text-sm text-muted-foreground">
            {row.original.primary_crop || '—'}
          </p>
        ),
      },
      {
        accessorKey: 'land_size_acres',
        header: 'Land Size (acres)',
        cell: ({ row }) => (
          <p className="font-mono text-sm text-muted-foreground">
            {row.original.land_size_acres || '—'}
          </p>
        ),
      },
      {
        accessorKey: 'state',
        header: 'State',
        cell: ({ row }) => (
          <p className="font-mono text-sm text-muted-foreground">{row.original.state || '—'}</p>
        ),
      },

      {
        accessorKey: 'district',
        header: 'District',
        cell: ({ row }) => (
          <p className="font-mono text-sm text-muted-foreground">{row.original.district || '—'}</p>
        ),
      },
      {
        accessorKey: 'village',
        header: 'Village',
        cell: ({ row }) => (
          <p className="font-mono text-sm text-muted-foreground">{row.original.village || '—'}</p>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="View farmer"
              onClick={() => viewModal.open(row.original)}
              className="text-info transition-opacity hover:opacity-70"
            >
              <Eye className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Edit farmer"
              onClick={() => formModal.open(row.original)}
              className="text-success transition-opacity hover:opacity-70"
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Delete farmer"
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
      <PageHeader title="Farmer Management" description="" />

      <Card className="grid grid-cols-2 items-center gap-3 p-4">
        <SearchInput
          value={search}
          className="max-w-md"
          onChange={setSearch}
          placeholder="Search farmers…"
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
        emptyMessage="No farmers match your search."
        title="All Farmers"
        headerActions={
          <PermissionGate permissions={[FARMERS_PERMISSIONS.CREATE]}>
            <Button leftIcon={<Plus className="size-4" />} onClick={() => formModal.open()}>
              New Farmer
            </Button>
          </PermissionGate>
        }
        pagination={{
          page,
          pageSize,
          total: data?.meta?.total ?? 0,
          onPageChange: setPage,
        }}
      />

      <Modal
        isOpen={formModal.isOpen}
        onClose={formModal.close}
        title={editing ? 'Edit Farmer' : 'New Farmer'}
        description="Provide the farmer’s details below."
      >
        <FarmerForm
          defaultValues={editing ?? undefined}
          onSubmit={handleSubmit}
          isSubmitting={createFarmer.isPending || updateFarmer.isPending}
          submitLabel={editing ? 'Update' : 'Create'}
        />
      </Modal>

      <Modal
        isOpen={viewModal.isOpen}
        onClose={viewModal.close}
        title="Farmer details"
        description="Read-only view of this farmer’s record."
      >
        {viewModal.data && (
          <FarmerForm defaultValues={viewModal.data} readOnly onSubmit={() => {}} />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={() =>
          deleteModal.data &&
          deleteFarmer.mutate(deleteModal.data.id, { onSuccess: deleteModal.close })
        }
        title="Delete farmer?"
        message={`This will permanently remove "${deleteModal.data?.name}".`}
        confirmLabel="Delete"
        isLoading={deleteFarmer.isPending}
      />
    </div>
  );
}
