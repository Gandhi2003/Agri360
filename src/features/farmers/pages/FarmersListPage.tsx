import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import {
  Badge,
  Button,
  ConfirmDialog,
  DataTable,
  Dropdown,
  Modal,
  PageHeader,
  PermissionGate,
  SearchInput,
} from '@components';
import { useDebounce, useModal } from '@common/hooks';
import { formatDate } from '@common/utils';
import { FARMERS_PERMISSIONS } from '../constants';
import { useCreateFarmer, useDeleteFarmer, useFarmers, useUpdateFarmer } from '../hooks/useFarmers';
import { useFarmersStore } from '../store/farmers.store';
import { FarmerForm } from '../components/FarmerForm';
import type { Farmer } from '../types';
import type { FarmerFormValues } from '../schemas/farmers.schema';

export default function FarmersListPage() {
  const { page, pageSize, setPage } = useFarmersStore();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = useFarmers({ page, pageSize, search: debouncedSearch });
  const createFarmer = useCreateFarmer();
  const updateFarmer = useUpdateFarmer();
  const deleteFarmer = useDeleteFarmer();

  const formModal = useModal<Farmer>();
  const deleteModal = useModal<Farmer>();
  const editing = formModal.data;

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
      { accessorKey: 'code', header: 'Code' },
      { accessorKey: 'name', header: 'Name' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <Badge variant={row.original.status === 'active' ? 'success' : 'outline'}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        id: 'actions',
        header: '',
        enableSorting: false,
        cell: ({ row }) => (
          <Dropdown
            trigger={
              <Button variant="ghost" size="icon" aria-label="Row actions">
                <MoreHorizontal className="size-4" />
              </Button>
            }
            items={[
              {
                label: 'Edit',
                icon: <Pencil className="size-4" />,
                onClick: () => formModal.open(row.original),
              },
              {
                label: 'Delete',
                icon: <Trash2 className="size-4" />,
                danger: true,
                onClick: () => deleteModal.open(row.original),
              },
            ]}
          />
        ),
      },
    ],
    [formModal, deleteModal],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Farmer Management"
        description="Register, search and manage farmer records across regions."
        actions={
          <PermissionGate permissions={[FARMERS_PERMISSIONS.CREATE]}>
            <Button leftIcon={<Plus className="size-4" />} onClick={() => formModal.open()}>
              New Farmer
            </Button>
          </PermissionGate>
        }
      />

      <div className="max-w-sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search farmers…" />
      </div>

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        emptyMessage="No farmers match your search."
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
