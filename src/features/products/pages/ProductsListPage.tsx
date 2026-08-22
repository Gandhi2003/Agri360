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
  Drawer,
  Modal,
  PageHeader,
  PermissionGate,
  SearchInput,
  Select,
} from '@components';
import { useDebounce, useModal } from '@common/hooks';
import { formatCurrency, formatNumber } from '@common/utils';
import type { SelectOption } from '@common/types';
import { useCategories } from '@features/categories';
import { PRODUCTS_PERMISSIONS } from '../constants';
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from '../hooks/useProducts';
import { useProductsStore } from '../store/products.store';
import { PRODUCT_FORM_ID, ProductForm } from '../components/ProductForm';
import { ProductDetails } from '../components/ProductDetails';
import type { Product } from '../types';
import type { ProductFormValues } from '../schemas/products.schema';

const activeFilterOptions: SelectOption[] = [
  { label: 'All Products', value: '' },
  { label: 'Active', value: 'true' },
  { label: 'Inactive', value: 'false' },
];

const toFormValues = (product: Product): ProductFormValues => ({
  name: product.name,
  sku: product.sku,
  description: product.description ?? '',
  unit: product.unit,
  price: product.price,
  cost_price: product.cost_price,
  stock_quantity: product.stock_quantity,
  reorder_level: product.reorder_level,
  is_active: product.is_active,
  category_id: product.category_id,
});

export default function ProductsListPage() {
  const { page, pageSize, setPage } = useProductsStore();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = useProducts({
    page,
    pageSize,
    search: debouncedSearch,
    is_active: activeFilter === '' ? undefined : activeFilter === 'true',
  });
  const { data: categoriesData } = useCategories({ page: 1, pageSize: 100 });
  const categoryOptions = useMemo<SelectOption[]>(
    () =>
      (categoriesData?.data ?? []).map((category) => ({
        label: category.name,
        value: String(category.id),
      })),
    [categoriesData],
  );
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
              <p className="font-mono text-xs text-muted-foreground">{row.original.sku}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => (
          <p className="font-mono text-sm text-muted-foreground">
            {row.original.category?.name || '—'}
          </p>
        ),
      },
      {
        accessorKey: 'unit',
        header: 'Unit',
        cell: ({ row }) => (
          <p className="font-mono text-sm text-muted-foreground">{row.original.unit || '—'}</p>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => (
          <p className="font-bold text-sm text-foreground">
            {formatCurrency(Number(row.original.price))}
          </p>
        ),
      },
      {
        accessorKey: 'stock_quantity',
        header: 'Stock',
        cell: ({ row }) => (
          <p className="font-mono text-sm text-muted-foreground">
            {formatNumber(row.original.stock_quantity)}
          </p>
        ),
      },
      {
        accessorKey: 'is_active',
        header: 'Active',
        cell: ({ row }) => (
          <Badge variant={row.original.is_active ? 'success' : 'outline'}>
            {row.original.is_active ? 'Active' : 'Inactive'}
          </Badge>
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
            options={activeFilterOptions}
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            aria-label="Filter by active status"
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

      <Drawer
        isOpen={formModal.isOpen}
        onClose={formModal.close}
        title={editing ? 'Edit Product' : 'New Product'}
        width="max-w-2xl"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={formModal.close}
              disabled={createProduct.isPending || updateProduct.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form={PRODUCT_FORM_ID}
              isLoading={createProduct.isPending || updateProduct.isPending}
            >
              {editing ? 'Update' : 'Create'}
            </Button>
          </div>
        }
      >
        <ProductForm
          defaultValues={editing ? toFormValues(editing) : undefined}
          product={editing ?? undefined}
          categoryOptions={categoryOptions}
          onSubmit={handleSubmit}
        />
      </Drawer>

      <Modal
        isOpen={viewModal.isOpen}
        onClose={viewModal.close}
        title="Product details"
        description=""
        size="lg"
      >
        {viewModal.data && <ProductDetails product={viewModal.data} />}
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
