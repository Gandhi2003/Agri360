import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Plus, Trash2, Eye } from 'lucide-react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  ConfirmDialog,
  DataTable,
  Dropdown,
  Modal,
  PageHeader,
  SearchInput,
  Select,
} from '@components';
import { useDebounce } from '@common/hooks';
import { formatDate } from '@common/utils';
import {
  useCreateProfile,
  useDeleteProfile,
  useProfile,
  useUpdateProfile,
} from '../hooks/useProfile';
import { useProfileStore } from '../store/profile.store';
import { ProfileForm } from '../components/ProfileForm';
import { ProfileDetailDrawer } from '../components/ProfileDetailDrawer';
import { getProfileStatusVariant } from '../utils/profile.utils';
import { ProfileStatus, type Profile } from '../types';
import type { ProfileFormValues } from '../schemas/profile.schema';

type ModalState = { mode: 'create' } | { mode: 'edit'; profile: Profile } | null;

const statusFilterOptions = [
  { value: '', label: 'All statuses' },
  ...Object.values(ProfileStatus).map((value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  })),
];

/** Profile — paginated list view with create/edit/detail/delete flows. */
export default function ProfileListPage() {
  const { page, pageSize, setPage } = useProfileStore();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ProfileStatus | ''>('');
  const debouncedSearch = useDebounce(search, 350);

  const [modal, setModal] = useState<ModalState>(null);
  const [detailTarget, setDetailTarget] = useState<Profile | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Profile | null>(null);

  const { data, isLoading } = useProfile({
    page,
    pageSize,
    search: debouncedSearch,
    status: status || undefined,
  });
  const createProfile = useCreateProfile();
  const updateProfile = useUpdateProfile();
  const deleteProfile = useDeleteProfile();

  const rows = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  const statusCounts = useMemo(() => {
    const counts = { active: 0, pending: 0, inactive: 0, archived: 0 };
    for (const row of rows) counts[row.status] += 1;
    return counts;
  }, [rows]);

  const columns = useMemo<ColumnDef<Profile>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar firstName={row.original.name} size="sm" />
            <div className="min-w-0">
              <p className="truncate font-medium text-foreground">{row.original.name}</p>
              <p className="font-mono text-xs text-muted-foreground">{row.original.code}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <Badge variant={getProfileStatusVariant(row.original.status)}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: 'updatedAt',
        header: 'Last updated',
        cell: ({ row }) => (
          <span className="text-muted-foreground">{formatDate(row.original.updatedAt)}</span>
        ),
      },
      {
        id: 'actions',
        header: '',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
            <Dropdown
              trigger={
                <Button variant="ghost" size="sm" aria-label="Row actions">
                  <MoreHorizontal className="size-4" />
                </Button>
              }
              items={[
                {
                  label: 'View details',
                  icon: <Eye className="size-4" />,
                  onClick: () => setDetailTarget(row.original),
                },
                {
                  label: 'Edit',
                  icon: <Pencil className="size-4" />,
                  onClick: () => setModal({ mode: 'edit', profile: row.original }),
                },
                {
                  label: 'Delete',
                  icon: <Trash2 className="size-4" />,
                  danger: true,
                  onClick: () => setDeleteTarget(row.original),
                },
              ]}
            />
          </div>
        ),
      },
    ],
    [],
  );

  const handleSubmit = (values: ProfileFormValues) => {
    if (modal?.mode === 'edit') {
      updateProfile.mutate(
        { id: modal.profile.id, dto: values },
        { onSuccess: () => setModal(null) },
      );
    } else {
      createProfile.mutate(values, { onSuccess: () => setModal(null) });
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteProfile.mutate(deleteTarget.id, {
      onSuccess: () => {
        setDeleteTarget(null);
        setDetailTarget(null);
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        description={`Manage profile records across your organization${total ? ` · ${total} total` : ''}.`}
        actions={
          <Button
            leftIcon={<Plus className="size-4" />}
            onClick={() => setModal({ mode: 'create' })}
          >
            New
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {(
          [
            { label: 'Active', value: statusCounts.active, variant: 'success' },
            { label: 'Pending', value: statusCounts.pending, variant: 'warning' },
            { label: 'Inactive', value: statusCounts.inactive, variant: 'outline' },
            { label: 'Archived', value: statusCounts.archived, variant: 'danger' },
          ] as const
        ).map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center justify-between p-4 pt-4">
              <div>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label} on this page</p>
              </div>
              <Badge variant={stat.variant}>{stat.label}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="sm:max-w-sm sm:flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Search profile..." />
        </div>
        <div className="sm:w-48">
          <Select
            options={statusFilterOptions}
            value={status}
            onChange={(e) => setStatus(e.target.value as ProfileStatus | '')}
            aria-label="Filter by status"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={rows}
        isLoading={isLoading}
        emptyMessage="No profiles match your filters yet."
        onRowClick={setDetailTarget}
        pagination={{
          page,
          pageSize,
          total,
          onPageChange: setPage,
        }}
      />

      <Modal
        isOpen={modal !== null}
        onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Edit profile' : 'New profile'}
        description={
          modal?.mode === 'edit'
            ? 'Update the details for this profile record.'
            : 'Create a new profile record.'
        }
      >
        {modal !== null && (
          <ProfileForm
            defaultValues={modal.mode === 'edit' ? modal.profile : undefined}
            onSubmit={handleSubmit}
            isSubmitting={createProfile.isPending || updateProfile.isPending}
            submitLabel={modal.mode === 'edit' ? 'Save changes' : 'Create'}
          />
        )}
      </Modal>

      <ProfileDetailDrawer
        profile={detailTarget}
        isOpen={detailTarget !== null}
        onClose={() => setDetailTarget(null)}
        onEdit={(profile) => {
          setDetailTarget(null);
          setModal({ mode: 'edit', profile });
        }}
        onDelete={(profile) => setDeleteTarget(profile)}
      />

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete profile"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={deleteProfile.isPending}
      />
    </div>
  );
}
