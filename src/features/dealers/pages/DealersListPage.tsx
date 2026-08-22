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
import { DEALERS_PERMISSIONS } from '../constants';
import { useCreateDealer, useDeleteDealer, useDealers, useUpdateDealer } from '../hooks/useDealers';
import { useDealersStore } from '../store/dealers.store';
import { DealerForm } from '../components/DealerForm';
import { DealerDetails } from '../components/DealerDetails';
import { DealerStatus, type Dealer } from '../types';
import type { DealerFormValues } from '../schemas/dealers.schema';

const statusFilterOptions: SelectOption[] = [
  { label: 'All Status', value: '' },
  ...Object.values(DealerStatus).map((value) => ({ label: value, value })),
];

const toFormValues = (dealer: Dealer): DealerFormValues => ({
  name: dealer.name,
  company: dealer.company,
  email: dealer.email ?? '',
  phone: dealer.phone ?? '',
  region: dealer.region ?? '',
  gst_number: dealer.gst_number ?? '',
});

export default function DealersListPage() {
  const { page, pageSize, setPage } = useDealersStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = useDealers({
    page,
    pageSize,
    search: debouncedSearch,
    status: (statusFilter || undefined) as DealerStatus | undefined,
  });
  const createDealer = useCreateDealer();
  const updateDealer = useUpdateDealer();
  const deleteDealer = useDeleteDealer();

  const rows = useMemo(() => data?.data ?? [], [data]);

  const formModal = useModal<Dealer>();
  const viewModal = useModal<Dealer>();
  const deleteModal = useModal<Dealer>();
  const editing = formModal.data;

  const [selectedIds, setSelectedIds] = useState<Set<Dealer['id']>>(new Set());
  const allSelected = rows.length > 0 && selectedIds.size === rows.length;

  const toggleSelectAll = useCallback(() => {
    setSelectedIds(allSelected ? new Set() : new Set(rows.map((item) => item.id)));
  }, [allSelected, rows]);

  const toggleSelect = useCallback((id: Dealer['id']) => {
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

  const handleSubmit = (values: DealerFormValues) => {
    const onSuccess = () => formModal.close();
    if (editing) {
      updateDealer.mutate({ id: editing.id, dto: values }, { onSuccess });
    } else {
      createDealer.mutate(values, { onSuccess });
    }
  };

  const columns = useMemo<ColumnDef<Dealer, unknown>[]>(
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
        header: 'Dealer',
        meta: { cellClassName: 'pl-1', headerClassName: 'pl-1' },
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar firstName={row.original.name} size="sm" />
            <div className="min-w-0">
              <p className="truncate font-bold text-foreground">{row.original.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {row.original.owner?.full_name || '—'}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'company',
        header: 'Company',
        cell: ({ row }) => (
          <p className=" font-bold text-sm text-black10">{row.original.company || '—'}</p>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
          <p className=" font-mono font-medium text-sm text-muted-foreground">
            {row.original.email || '—'}
          </p>
        ),
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        cell: ({ row }) => (
          <p className="font-mono font-medium text-sm text-muted-foreground">
            {row.original.phone || '—'}
          </p>
        ),
      },
      {
        accessorKey: 'region',
        header: 'Region',
        cell: ({ row }) => (
          <p className="font-mono text-sm text-muted-foreground">{row.original.region || '—'}</p>
        ),
      },
      {
        accessorKey: 'gst_number',
        header: 'GST Number',
        cell: ({ row }) => (
          <p className="font-bold text-sm text-foreground">{row.original.gst_number || '—'}</p>
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
              aria-label="View dealer"
              onClick={() => viewModal.open(row.original)}
              className="text-info transition-opacity hover:opacity-70"
            >
              <Eye className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Edit dealer"
              onClick={() => formModal.open(row.original)}
              className="text-success transition-opacity hover:opacity-70"
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Delete dealer"
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
      <PageHeader title="Dealer Management" description="" />

      <Card className="grid grid-cols-2 items-center gap-3 p-4">
        <SearchInput
          value={search}
          className="max-w-md"
          onChange={setSearch}
          placeholder="Search dealers…"
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
        emptyMessage="No dealers match your search."
        title="All Dealers"
        headerActions={
          <PermissionGate permissions={[DEALERS_PERMISSIONS.CREATE]}>
            <Button leftIcon={<Plus className="size-4" />} onClick={() => formModal.open()}>
              New Dealer
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
        title={editing ? 'Edit Dealer' : 'New Dealer'}
        description=""
        size="lg"
      >
        <DealerForm
          defaultValues={editing ? toFormValues(editing) : undefined}
          dealer={editing ?? undefined}
          onSubmit={handleSubmit}
          onCancel={formModal.close}
          isSubmitting={createDealer.isPending || updateDealer.isPending}
          submitLabel={editing ? 'Update' : 'Create'}
        />
      </Modal>

      <Modal
        isOpen={viewModal.isOpen}
        onClose={viewModal.close}
        title="Dealer details"
        description=""
        size="lg"
      >
        {viewModal.data && <DealerDetails dealer={viewModal.data} />}
      </Modal>

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={() =>
          deleteModal.data &&
          deleteDealer.mutate(deleteModal.data.id, { onSuccess: deleteModal.close })
        }
        title="Delete dealer?"
        message={`This will permanently remove "${deleteModal.data?.name}".`}
        confirmLabel="Delete"
        isLoading={deleteDealer.isPending}
      />
    </div>
  );
}
