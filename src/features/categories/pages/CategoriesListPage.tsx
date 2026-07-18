import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Button,
  Card,
  ConfirmDialog,
  EmptyState,
  Modal,
  PageHeader,
  Pagination,
  SearchInput,
  Select,
  Skeleton,
} from '@components';
import { useDebounce } from '@common/hooks';
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '../hooks/useCategories';
import { useCategoriesStore } from '../store/categories.store';
import { CategoryCard } from '../components/CategoryCard';
import { CategoryForm } from '../components/CategoryForm';
import { CategoryStatus, type Category } from '../types';
import type { CategoryFormValues } from '../schemas/categories.schema';

type ModalState = { mode: 'create' } | { mode: 'edit'; category: Category } | null;

const statusFilterOptions = [
  { value: '', label: 'All statuses' },
  ...Object.values(CategoryStatus).map((value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  })),
];

/** Categories — card-grid list view with create/edit/delete flows. */
export default function CategoriesListPage() {
  const { page, pageSize, setPage } = useCategoriesStore();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<CategoryStatus | ''>('');
  const debouncedSearch = useDebounce(search, 350);

  const [modal, setModal] = useState<ModalState>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const { data, isLoading } = useCategories({
    page,
    pageSize,
    search: debouncedSearch,
    status: status || undefined,
  });
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const categories = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  const handleSubmit = (values: CategoryFormValues) => {
    if (modal?.mode === 'edit') {
      updateCategory.mutate(
        { id: modal.category.id, dto: values },
        { onSuccess: () => setModal(null) },
      );
    } else {
      createCategory.mutate(values, { onSuccess: () => setModal(null) });
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteCategory.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description={`Manage categories across your organization${total ? ` · ${total} total` : ''}.`}
        actions={
          <Button
            leftIcon={<Plus className="size-4" />}
            onClick={() => setModal({ mode: 'create' })}
          >
            New
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="sm:max-w-sm sm:flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Search categories..." />
        </div>
        <div className="sm:w-48">
          <Select
            options={statusFilterOptions}
            value={status}
            onChange={(e) => setStatus(e.target.value as CategoryStatus | '')}
            aria-label="Filter by status"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <Skeleton className="size-11 rounded-lg" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </Card>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <EmptyState
          title="No categories found"
          description="No categories match your filters yet. Create your first one to get started."
          action={
            <Button
              leftIcon={<Plus className="size-4" />}
              onClick={() => setModal({ mode: 'create' })}
            >
              New category
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={(c) => setModal({ mode: 'edit', category: c })}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
          <Pagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} />
        </>
      )}

      <Modal
        isOpen={modal !== null}
        onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Edit category' : 'New category'}
        description={
          modal?.mode === 'edit'
            ? 'Update the details for this category.'
            : 'Create a new category.'
        }
      >
        {modal !== null && (
          <CategoryForm
            defaultValues={modal.mode === 'edit' ? modal.category : undefined}
            onSubmit={handleSubmit}
            onCancel={() => setModal(null)}
            isSubmitting={createCategory.isPending || updateCategory.isPending}
            submitLabel={modal.mode === 'edit' ? 'Save changes' : 'Create'}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete category"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={deleteCategory.isPending}
      />
    </div>
  );
}
