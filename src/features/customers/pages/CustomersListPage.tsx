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
import { CUSTOMERS_PERMISSIONS } from '../constants';
import {
  useCreateCustomer,
  useDeleteCustomer,
  useCustomers,
  useUpdateCustomer,
} from '../hooks/useCustomers';
import { useCustomersStore } from '../store/customers.store';
import { CustomerForm } from '../components/CustomerForm';
import { CustomerDetails } from '../components/CustomerDetails';
import { CustomerStatus, type Customer } from '../types';
import type { CustomerFormValues } from '../schemas/customers.schema';

const statusFilterOptions: SelectOption[] = [
  { label: 'All Status', value: '' },
  ...Object.values(CustomerStatus).map((value) => ({ label: value, value })),
];

const toFormValues = (customer: Customer): CustomerFormValues => ({
  name: customer.name,
  company: customer.company ?? '',
  email: customer.email ?? '',
  phone: customer.phone ?? '',
  country: customer.country ?? '',
});

export default function CustomersListPage() {
  const { page, pageSize, setPage } = useCustomersStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = useCustomers({
    page,
    pageSize,
    search: debouncedSearch,
    status: (statusFilter || undefined) as CustomerStatus | undefined,
  });
  const createCustomer = useCreateCustomer();
  const updateCustomer = useUpdateCustomer();
  const deleteCustomer = useDeleteCustomer();

  const rows = useMemo(() => data?.data ?? [], [data]);

  const formModal = useModal<Customer>();
  const viewModal = useModal<Customer>();
  const deleteModal = useModal<Customer>();
  const editing = formModal.data;

  const [selectedIds, setSelectedIds] = useState<Set<Customer['id']>>(new Set());
  const allSelected = rows.length > 0 && selectedIds.size === rows.length;

  const toggleSelectAll = useCallback(() => {
    setSelectedIds(allSelected ? new Set() : new Set(rows.map((item) => item.id)));
  }, [allSelected, rows]);

  const toggleSelect = useCallback((id: Customer['id']) => {
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

  const handleSubmit = (values: CustomerFormValues) => {
    const onSuccess = () => formModal.close();
    if (editing) {
      updateCustomer.mutate({ id: editing.id, dto: values }, { onSuccess });
    } else {
      createCustomer.mutate(values, { onSuccess });
    }
  };

  const columns = useMemo<ColumnDef<Customer, unknown>[]>(
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
        header: 'Customer',
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
          <p className="font-bold text-sm text-black10">{row.original.company || '—'}</p>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
          <p className="font-mono font-medium text-sm text-muted-foreground">
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
        accessorKey: 'country',
        header: 'Country',
        cell: ({ row }) => (
          <p className="font-mono font-medium text-sm text-muted-foreground">
            {row.original.country || '—'}
          </p>
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
              aria-label="View customer"
              onClick={() => viewModal.open(row.original)}
              className="text-info transition-opacity hover:opacity-70"
            >
              <Eye className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Edit customer"
              onClick={() => formModal.open(row.original)}
              className="text-success transition-opacity hover:opacity-70"
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Delete customer"
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
      <PageHeader title="Customer Management" description="" />

      <Card className="grid grid-cols-2 items-center gap-3 p-4">
        <SearchInput
          value={search}
          className="max-w-md"
          onChange={setSearch}
          placeholder="Search customers…"
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
        emptyMessage="No customers match your search."
        title="All Customers"
        headerActions={
          <PermissionGate permissions={[CUSTOMERS_PERMISSIONS.CREATE]}>
            <Button leftIcon={<Plus className="size-4" />} onClick={() => formModal.open()}>
              New Customer
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
        title={editing ? 'Edit Customer' : 'New Customer'}
        description=""
        size="lg"
      >
        <CustomerForm
          defaultValues={editing ? toFormValues(editing) : undefined}
          customer={editing ?? undefined}
          onSubmit={handleSubmit}
          onCancel={formModal.close}
          isSubmitting={createCustomer.isPending || updateCustomer.isPending}
          submitLabel={editing ? 'Update' : 'Create'}
        />
      </Modal>

      <Modal
        isOpen={viewModal.isOpen}
        onClose={viewModal.close}
        title="Customer details"
        description=""
        size="lg"
      >
        {viewModal.data && <CustomerDetails customer={viewModal.data} />}
      </Modal>

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={() =>
          deleteModal.data &&
          deleteCustomer.mutate(deleteModal.data.id, { onSuccess: deleteModal.close })
        }
        title="Delete customer?"
        message={`This will permanently remove "${deleteModal.data?.name}".`}
        confirmLabel="Delete"
        isLoading={deleteCustomer.isPending}
      />
    </div>
  );
}
