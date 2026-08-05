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
import { PURCHASE_PERMISSIONS } from '../constants';
import {
  useCreatePurchase,
  useDeletePurchase,
  usePurchase,
  useUpdatePurchase,
} from '../hooks/usePurchase';
import { usePurchaseStore } from '../store/purchase.store';
import { PurchaseForm } from '../components/PurchaseForm';
import { PurchaseStatus, type Purchase } from '../types';
import type { PurchaseFormValues } from '../schemas/purchase.schema';

const statusFilterOptions: SelectOption[] = [
  { label: 'All Status', value: '' },
  ...Object.values(PurchaseStatus).map((value) => ({ label: value, value })),
];

const statusBadgeVariant: Record<PurchaseStatus, 'success' | 'warning' | 'danger' | 'outline'> = {
  [PurchaseStatus.Active]: 'success',
  [PurchaseStatus.Pending]: 'warning',
  [PurchaseStatus.Archived]: 'danger',
  [PurchaseStatus.Inactive]: 'outline',
};

export default function PurchasesListPage() {
  const { page, pageSize, setPage } = usePurchaseStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = usePurchase({
    page,
    pageSize,
    search: debouncedSearch,
    status: (statusFilter || undefined) as PurchaseStatus | undefined,
  });
  const createPurchase = useCreatePurchase();
  const updatePurchase = useUpdatePurchase();
  const deletePurchase = useDeletePurchase();

  const rows = useMemo(() => data?.data ?? [], [data]);

  const formModal = useModal<Purchase>();
  const viewModal = useModal<Purchase>();
  const deleteModal = useModal<Purchase>();
  const editing = formModal.data;

  const [selectedIds, setSelectedIds] = useState<Set<Purchase['id']>>(new Set());
  const allSelected = rows.length > 0 && selectedIds.size === rows.length;

  const toggleSelectAll = useCallback(() => {
    setSelectedIds(allSelected ? new Set() : new Set(rows.map((item) => item.id)));
  }, [allSelected, rows]);

  const toggleSelect = useCallback((id: Purchase['id']) => {
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

  const handleSubmit = (values: PurchaseFormValues) => {
    const onSuccess = () => formModal.close();
    if (editing) {
      updatePurchase.mutate({ id: editing.id, dto: values }, { onSuccess });
    } else {
      createPurchase.mutate(values, { onSuccess });
    }
  };

  const columns = useMemo<ColumnDef<Purchase, unknown>[]>(
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
        header: 'Purchase',
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
              aria-label="View purchase"
              onClick={() => viewModal.open(row.original)}
              className="text-info transition-opacity hover:opacity-70"
            >
              <Eye className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Edit purchase"
              onClick={() => formModal.open(row.original)}
              className="text-success transition-opacity hover:opacity-70"
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Delete purchase"
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
      <PageHeader title="Purchase" description="" />

      <Card className="grid grid-cols-2 items-center gap-3 p-4">
        <SearchInput
          value={search}
          className="max-w-md"
          onChange={setSearch}
          placeholder="Search purchases…"
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
        emptyMessage="No purchases match your search."
        title="All Purchases"
        headerActions={
          <PermissionGate permissions={[PURCHASE_PERMISSIONS.CREATE]}>
            <Button leftIcon={<Plus className="size-4" />} onClick={() => formModal.open()}>
              New Purchase
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
        title={editing ? 'Edit Purchase' : 'New Purchase'}
        description="Provide the purchase's details below."
      >
        <PurchaseForm
          defaultValues={editing ?? undefined}
          onSubmit={handleSubmit}
          isSubmitting={createPurchase.isPending || updatePurchase.isPending}
          submitLabel={editing ? 'Update' : 'Create'}
        />
      </Modal>

      <Modal
        isOpen={viewModal.isOpen}
        onClose={viewModal.close}
        title="Purchase details"
        description="Read-only view of this purchase's record."
      >
        {viewModal.data && (
          <PurchaseForm defaultValues={viewModal.data} readOnly onSubmit={() => {}} />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={() =>
          deleteModal.data &&
          deletePurchase.mutate(deleteModal.data.id, { onSuccess: deleteModal.close })
        }
        title="Delete purchase?"
        message={`This will permanently remove "${deleteModal.data?.name}".`}
        confirmLabel="Delete"
        isLoading={deletePurchase.isPending}
      />
    </div>
  );
}
