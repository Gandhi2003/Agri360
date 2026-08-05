/**
 * Root component barrel. Import shared UI from here:
 *   import { Button, DataTable, PageHeader } from '@components';
 */
export * from './ui';
export * from './table';
export * from './charts';
export { EmptyState } from './empty-state/EmptyState';
export { Breadcrumb } from './breadcrumb/Breadcrumb';
export { Sidebar } from './sidebar/Sidebar';
export { Navbar } from './navbar/Navbar';
export { ErrorBoundary, FullscreenToggle, PageHeader, PermissionGate, ThemeToggle } from './shared';
