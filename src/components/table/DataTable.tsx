import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { useState, type ReactNode } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { cn } from '@lib/cn';
import { EmptyState } from '@components/empty-state/EmptyState';
import { Skeleton } from '@components/ui/Skeleton';
import { Pagination, type PaginationProps } from './Pagination';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    /** Overrides the default `px-4 py-3` cell padding, e.g. to tighten adjacent columns. */
    cellClassName?: string;
    headerClassName?: string;
  }
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  isLoading?: boolean;
  emptyMessage?: string;
  pagination?: Omit<PaginationProps, 'className'>;
  onRowClick?: (row: TData) => void;
  /** Card header title, e.g. "All Farmers". Omit to render a bare table. */
  title?: ReactNode;
  /** Rendered next to the title, e.g. a "+ New" button. */
  headerActions?: ReactNode;
}

/** Generic, sortable, paginated table built on TanStack Table. */
export function DataTable<TData>({
  columns,
  data,
  isLoading,
  emptyMessage,
  pagination,
  onRowClick,
  title,
  headerActions,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  return (
    <div className="rounded-6px bg-card shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-6px_rgba(15,23,42,0.12)] px-4">
      {(title || headerActions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b  border-black1 py-4 mb-6">
          {title && <h2 className="text-lg font-bold text-foreground">{title}</h2>}
          {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
        </div>
      )}
      <div className="overflow-x-auto ">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-primary/10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDirection = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className={cn(
                        'whitespace-nowrap px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-black1',
                        header.column.columnDef.meta?.headerClassName,
                      )}
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex cursor-pointer items-center gap-1.5 uppercase hover:text-foreground"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <span className="inline-flex flex-col leading-none">
                            <AiFillCaretUp
                              className={cn(
                                'size-2.5',
                                sortDirection === 'asc' ? 'text-primary' : 'text-black1/60',
                              )}
                            />
                            <AiFillCaretDown
                              className={cn(
                                '-mt-1 size-2.5',
                                sortDirection === 'desc' ? 'text-danger' : 'text-black1/20',
                              )}
                            />
                          </span>
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 uppercase">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map((_col, colIdx) => (
                    <td key={colIdx} className="px-4 py-3">
                      <Skeleton className="h-4 w-full max-w-32" />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-0">
                  <EmptyState description={emptyMessage} />
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    'transition-colors hover:bg-primary/10',
                    onRowClick && 'cursor-pointer',
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        'whitespace-nowrap px-4 py-3 text-foreground',
                        cell.column.columnDef.meta?.cellClassName,
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && !isLoading && (
        <Pagination {...pagination} className="border-t border-border p-4" />
      )}
    </div>
  );
}
