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
import { PRODUCTS_PERMISSIONS } from '../constants';
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from '../hooks/useProducts';
import { useProductsStore } from '../store/products.store';
import { ProductForm } from '../components/ProductForm';
import { ProductStatus, type Product } from '../types';
import type { ProductFormValues } from '../schemas/products.schema';

const statusFilterOptions: SelectOption[] = [
  { label: 'All Status', value: '' },
  ...Object.values(ProductStatus).map((value) => ({ label: value, value })),
];

const statusBadgeVariant: Record<ProductStatus, 'success' | 'warning' | 'danger' | 'outline'> = {
  [ProductStatus.Active]: 'success',
  [ProductStatus.Pending]: 'warning',
  [ProductStatus.Archived]: 'danger',
  [ProductStatus.Inactive]: 'outline',
};

export default function ProductsListPage() {
  const { page, pageSize, setPage } = useProductsStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = useProducts({
    page,
    pageSize,
    search: debouncedSearch,
    status: (statusFilter || undefined) as ProductStatus | undefined,
  });
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const rows = useMemo(() => data?.data ?? [], [data]);

  const formModal = useModal<Product>();
  const viewModal = useModal<Product>();
  const deleteModal = useModal<Product>();
  const editing = formModal.data;

  const [selectedIds, setSelectedIds] = useState<Set<Product['id']>>(new Set());
  const allSelected = rows.length > 0 && selectedIds.size === rows.length;

  const toggleSelectAll = useCallback(() => {
    setSelectedIds(allSelected ? new Set() : new Set(rows.map((item) => item.id)));
  }, [allSelected, rows]);

  const toggleSelect = useCallback((id: Product['id']) => {
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

  const handleSubmit = (values: ProductFormValues) => {
    const onSuccess = () => formModal.close();
    if (editing) {
      updateProduct.mutate({ id: editing.id, dto: values }, { onSuccess });
    } else {
      createProduct.mutate(values, { onSuccess });
    }
  };

  const columns = useMemo<ColumnDef<Product, unknown>[]>(
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
        header: 'Product',
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
              aria-label="View product"
              onClick={() => viewModal.open(row.original)}
              className="text-info transition-opacity hover:opacity-70"
            >
              <Eye className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Edit product"
              onClick={() => formModal.open(row.original)}
              className="text-success transition-opacity hover:opacity-70"
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Delete product"
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
      <PageHeader title="Products" description="" />

      <Card className="grid grid-cols-2 items-center gap-3 p-4">
        <SearchInput
          value={search}
          className="max-w-md"
          onChange={setSearch}
          placeholder="Search products…"
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
        emptyMessage="No products match your search."
        title="All Products"
        headerActions={
          <PermissionGate permissions={[PRODUCTS_PERMISSIONS.CREATE]}>
            <Button leftIcon={<Plus className="size-4" />} onClick={() => formModal.open()}>
              New Product
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
        title={editing ? 'Edit Product' : 'New Product'}
        description="Provide the product's details below."
      >
        <ProductForm
          defaultValues={editing ?? undefined}
          onSubmit={handleSubmit}
          isSubmitting={createProduct.isPending || updateProduct.isPending}
          submitLabel={editing ? 'Update' : 'Create'}
        />
      </Modal>

      <Modal
        isOpen={viewModal.isOpen}
        onClose={viewModal.close}
        title="Product details"
        description="Read-only view of this product's record."
      >
        {viewModal.data && (
          <ProductForm defaultValues={viewModal.data} readOnly onSubmit={() => {}} />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={() =>
          deleteModal.data &&
          deleteProduct.mutate(deleteModal.data.id, { onSuccess: deleteModal.close })
        }
        title="Delete product?"
        message={`This will permanently remove "${deleteModal.data?.name}".`}
        confirmLabel="Delete"
        isLoading={deleteProduct.isPending}
      />
    </div>
  );
}
