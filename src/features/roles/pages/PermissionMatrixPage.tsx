import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowDownAZ, ArrowLeft, ArrowUpAZ } from 'lucide-react';
import { Button, Card, Pagination, PageHeader, SearchInput } from '@components';
import { useDebounce } from '@common/hooks';
import { PAGE_SIZE_OPTIONS } from '@common/constants';
import { useBreadcrumbStore } from '@app/store';
import { PermissionMatrixTable } from '../components/PermissionMatrixTable';
import { usePermissionMatrix, useUpdatePermissionMatrix } from '../hooks/useRoles';
import type { PermissionActionKey, PermissionMatrixModule } from '../types';

export default function PermissionMatrixPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = usePermissionMatrix(id);
  const updateMatrix = useUpdatePermissionMatrix();

  const [modules, setModules] = useState<PermissionMatrixModule[]>([]);
  useEffect(() => {
    if (data) setModules(data.modules);
  }, [data]);

  const setBreadcrumbLabel = useBreadcrumbStore((state) => state.setLabel);
  const clearBreadcrumbLabel = useBreadcrumbStore((state) => state.clearLabel);
  useEffect(() => {
    if (!id || !data?.role_name) return;
    setBreadcrumbLabel(id, data.role_name);
    return () => clearBreadcrumbLabel(id);
  }, [id, data?.role_name, setBreadcrumbLabel, clearBreadcrumbLabel]);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = PAGE_SIZE_OPTIONS[0];

  const filteredModules = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    const filtered = term
      ? modules.filter((module) => module.resource.toLowerCase().includes(term))
      : modules;
    return [...filtered].sort((a, b) =>
      sortAsc ? a.resource.localeCompare(b.resource) : b.resource.localeCompare(a.resource),
    );
  }, [modules, debouncedSearch, sortAsc]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, pageSize]);

  const paginatedModules = useMemo(
    () => filteredModules.slice((page - 1) * pageSize, page * pageSize),
    [filteredModules, page, pageSize],
  );

  const toggleAction = (resourceCode: number, action: PermissionActionKey) => {
    setModules((prev) =>
      prev.map((module) =>
        module.resource_code === resourceCode
          ? {
              ...module,
              actions: {
                ...module.actions,
                [action]: {
                  ...module.actions[action],
                  checked: !module.actions[action].checked,
                },
              },
            }
          : module,
      ),
    );
  };

  const toggleAllowAll = (resourceCode: number) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.resource_code !== resourceCode) return module;
        const nextChecked = !Object.values(module.actions).every((action) => action.checked);
        const actions = Object.fromEntries(
          Object.entries(module.actions).map(([key, action]) => [
            key,
            { ...action, checked: nextChecked },
          ]),
        ) as PermissionMatrixModule['actions'];
        return { ...module, actions, allow_all: nextChecked };
      }),
    );
  };

  const handleSave = () => {
    if (!id) return;
    const permissions = modules.flatMap((module) =>
      Object.values(module.actions).map((action) => ({
        permission_id: action.permission_id,
        checked: action.checked,
      })),
    );
    updateMatrix.mutate({ id, dto: { permissions } });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions List"
        description={data?.role_name ? `Permissions for ${data.role_name}` : ''}
        actions={
          <>
            <Button
              variant="outline"
              leftIcon={<ArrowLeft className="size-4" />}
              onClick={() => navigate('/roles')}
            >
              Back to Roles
            </Button>
            <Button
              variant="outline"
              leftIcon={
                sortAsc ? <ArrowDownAZ className="size-4" /> : <ArrowUpAZ className="size-4" />
              }
              onClick={() => setSortAsc((prev) => !prev)}
            >
              Sort by {sortAsc ? 'A-Z' : 'Z-A'}
            </Button>
          </>
        }
      />

      <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-2">
          <SearchInput
            value={search}
            onChange={setSearch}
            className="max-w-xs"
            placeholder="Search modules…"
          />
        </div>
      </Card>

      <PermissionMatrixTable
        modules={paginatedModules}
        isLoading={isLoading}
        emptyMessage="No modules match your search."
        onToggleAction={toggleAction}
        onToggleAllowAll={toggleAllowAll}
        title="Permissions"
        headerActions={
          <Button onClick={handleSave} isLoading={updateMatrix.isPending} disabled={isLoading}>
            Save Changes
          </Button>
        }
      />

      <Pagination
        page={page}
        pageSize={pageSize}
        total={filteredModules.length}
        onPageChange={setPage}
      />
    </div>
  );
}
