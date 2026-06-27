/** TanStack Query root key for the Invoices feature. */
export const INVOICES_QUERY_KEY = 'invoices' as const;

/** RBAC permission identifiers for Invoices. */
export const INVOICES_PERMISSIONS = {
  VIEW: 'invoices:view',
  CREATE: 'invoices:create',
  UPDATE: 'invoices:update',
  DELETE: 'invoices:delete',
  EXPORT: 'invoices:export',
} as const;

export type InvoicePermission = (typeof INVOICES_PERMISSIONS)[keyof typeof INVOICES_PERMISSIONS];

/** Default page size for Invoices tables. */
export const INVOICES_PAGE_SIZE = 10;
