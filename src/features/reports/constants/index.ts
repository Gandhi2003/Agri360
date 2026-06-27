/** TanStack Query root key for the Reports feature. */
export const REPORTS_QUERY_KEY = 'reports' as const;

/** RBAC permission identifiers for Reports. */
export const REPORTS_PERMISSIONS = {
  VIEW: 'reports:view',
  CREATE: 'reports:create',
  UPDATE: 'reports:update',
  DELETE: 'reports:delete',
  EXPORT: 'reports:export',
} as const;

export type ReportPermission = (typeof REPORTS_PERMISSIONS)[keyof typeof REPORTS_PERMISSIONS];

/** Default page size for Reports tables. */
export const REPORTS_PAGE_SIZE = 10;
