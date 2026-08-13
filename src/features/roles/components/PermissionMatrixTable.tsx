import type { ReactNode } from 'react';
import { Checkbox } from '@components';
import { EmptyState } from '@components/empty-state/EmptyState';
import { Skeleton } from '@components/ui/Skeleton';
import type { PermissionActionKey, PermissionMatrixModule } from '../types';

const ACTION_COLUMNS: Array<{ key: PermissionActionKey; label: string }> = [
  { key: 'create', label: 'Created' },
  { key: 'read', label: 'View' },
  { key: 'update', label: 'Edit' },
  { key: 'delete', label: 'Delete' },
];

interface PermissionMatrixTableProps {
  modules: PermissionMatrixModule[];
  isLoading?: boolean;
  emptyMessage?: string;
  onToggleAction: (resourceCode: number, action: PermissionActionKey) => void;
  onToggleAllowAll: (resourceCode: number) => void;
  /** Card header title, e.g. "Permissions". Omit to render a bare table. */
  title?: ReactNode;
  /** Rendered next to the title, e.g. a "Save Changes" button. */
  headerActions?: ReactNode;
}

export function PermissionMatrixTable({
  modules,
  isLoading,
  emptyMessage,
  onToggleAction,
  onToggleAllowAll,
  title,
  headerActions,
}: PermissionMatrixTableProps) {
  return (
    <div className="rounded-6px bg-card shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-6px_rgba(15,23,42,0.12)] px-4">
      {(title || headerActions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black1 py-4 mb-6">
          {title && <h2 className="text-lg font-bold text-foreground">{title}</h2>}
          {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-primary/10">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-black1">
                Modules
              </th>
              {ACTION_COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-black1"
                >
                  {column.label}
                </th>
              ))}
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-black1">
                Allow All
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {Array.from({ length: ACTION_COLUMNS.length + 2 }).map((_col, colIdx) => (
                    <td key={colIdx} className="px-4 py-3">
                      <Skeleton className="h-4 w-full max-w-32" />
                    </td>
                  ))}
                </tr>
              ))
            ) : modules.length === 0 ? (
              <tr>
                <td colSpan={ACTION_COLUMNS.length + 2} className="p-0">
                  <EmptyState description={emptyMessage} />
                </td>
              </tr>
            ) : (
              modules.map((module) => {
                const allChecked = ACTION_COLUMNS.every(
                  (column) => module.actions[column.key].checked,
                );
                return (
                  <tr key={module.resource_code} className="transition-colors hover:bg-primary/10">
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-foreground">
                      {module.resource}
                    </td>
                    {ACTION_COLUMNS.map((column) => (
                      <td key={column.key} className="whitespace-nowrap px-4 py-3">
                        <Checkbox
                          checked={module.actions[column.key].checked}
                          onChange={() => onToggleAction(module.resource_code, column.key)}
                          aria-label={`${column.label} ${module.resource}`}
                        />
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-4 py-3">
                      <Checkbox
                        checked={allChecked}
                        onChange={() => onToggleAllowAll(module.resource_code)}
                        aria-label={`Allow all ${module.resource}`}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
