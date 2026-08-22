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
} from '@components';
import { useDebounce, useModal } from '@common/hooks';
import { SUPPLIERS_PERMISSIONS } from '../constants';
import {
  useCreateSupplier,
  useDeleteSupplier,
  useSuppliers,
  useUpdateSupplier,
} from '../hooks/useSuppliers';
import { useSuppliersStore } from '../store/suppliers.store';
import { SupplierForm } from '../components/SupplierForm';
import { SupplierDetails } from '../components/SupplierDetails';
import type { Supplier } from '../types';
import type { SupplierFormValues } from '../schemas/suppliers.schema';

const toFormValues = (supplier: Supplier): SupplierFormValues => ({
  name: supplier.name,
  company: supplier.company ?? '',
  email: supplier.email ?? '',
  phone: supplier.phone ?? '',
  country: supplier.country ?? '',
});

export default function SuppliersListPage() {
  const { page, pageSize, setPage } = useSuppliersStore();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = useSuppliers({
    page,
    pageSize,
    search: debouncedSearch,
  });
  const createSupplier = useCreateSupplier();
  const updateSupplier = useUpdateSupplier();
  const deleteSupplier = useDeleteSupplier();

  const rows = useMemo(() => data?.data ?? [], [data]);

  const formModal = useModal<Supplier>();
  const viewModal = useModal<Supplier>();
  const deleteModal = useModal<Supplier>();
  const editing = formModal.data;

  const [selectedIds, setSelectedIds] = useState<Set<Supplier['id']>>(new Set());
  const allSelected = rows.length > 0 && selectedIds.size === rows.length;

  const toggleSelectAll = useCallback(() => {
    setSelectedIds(allSelected ? new Set() : new Set(rows.map((item) => item.id)));
  }, [allSelected, rows]);

  const toggleSelect = useCallback((id: Supplier['id']) => {
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

  const handleSubmit = (values: SupplierFormValues) => {
    const onSuccess = () => formModal.close();
    if (editing) {
      updateSupplier.mutate({ id: editing.id, dto: values }, { onSuccess });
    } else {
      createSupplier.mutate(values, { onSuccess });
    }
  };

  const columns = useMemo<ColumnDef<Supplier, unknown>[]>(
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
        header: 'Supplier',
        meta: { cellClassName: 'pl-1', headerClassName: 'pl-1' },
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar firstName={row.original.name} size="sm" />
            <div className="min-w-0">
              <p className="truncate font-semibold text-foreground">{row.original.name}</p>
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
          <p className="font-bold text-sm text-black10">{row.original.company || '—'}</p>
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
        accessorKey: 'country',
        header: 'Country',
        cell: ({ row }) => (
          <p className="font-mono text-sm text-muted-foreground">{row.original.country || '—'}</p>
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
              aria-label="View supplier"
              onClick={() => viewModal.open(row.original)}
              className="text-info transition-opacity hover:opacity-70"
            >
              <Eye className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Edit supplier"
              onClick={() => formModal.open(row.original)}
              className="text-success transition-opacity hover:opacity-70"
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Delete supplier"
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
      <PageHeader title="Supplier Management" description="" />

      <Card className="flex items-center gap-3 p-4">
        <SearchInput
          value={search}
          className="max-w-md"
          onChange={setSearch}
          placeholder="Search suppliers…"
        />
      </Card>

      <DataTable
        columns={columns}
        data={rows}
        isLoading={isLoading}
        emptyMessage="No suppliers match your search."
        title="All Suppliers"
        headerActions={
          <PermissionGate permissions={[SUPPLIERS_PERMISSIONS.CREATE]}>
            <Button leftIcon={<Plus className="size-4" />} onClick={() => formModal.open()}>
              New Supplier
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
        title={editing ? 'Edit Supplier' : 'New Supplier'}
        description=""
        size="lg"
      >
        <SupplierForm
          defaultValues={editing ? toFormValues(editing) : undefined}
          supplier={editing ?? undefined}
          onSubmit={handleSubmit}
          onCancel={formModal.close}
          isSubmitting={createSupplier.isPending || updateSupplier.isPending}
          submitLabel={editing ? 'Update' : 'Create'}
        />
      </Modal>

      <Modal
        isOpen={viewModal.isOpen}
        onClose={viewModal.close}
        title="Supplier details"
        description=""
        size="lg"
      >
        {viewModal.data && <SupplierDetails supplier={viewModal.data} />}
      </Modal>

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={() =>
          deleteModal.data &&
          deleteSupplier.mutate(deleteModal.data.id, { onSuccess: deleteModal.close })
        }
        title="Delete supplier?"
        message={`This will permanently remove "${deleteModal.data?.name}".`}
        confirmLabel="Delete"
        isLoading={deleteSupplier.isPending}
      />
    </div>
  );
}
