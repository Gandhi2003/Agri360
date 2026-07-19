export const INVOICES_QUERY_KEY = 'invoices' as const;

export const INVOICES_PERMISSIONS = {
  VIEW: 'invoices:view',
  CREATE: 'invoices:create',
  UPDATE: 'invoices:update',
  DELETE: 'invoices:delete',
  EXPORT: 'invoices:export',
} as const;

export type InvoicePermission = (typeof INVOICES_PERMISSIONS)[keyof typeof INVOICES_PERMISSIONS];

export const INVOICES_PAGE_SIZE = 10;
