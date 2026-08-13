import { Role, type Permission } from '@common/types';

export const PERMISSIONS = {
  // Farmer / partner management
  FARMERS_VIEW: 'farmers:view',
  FARMERS_CREATE: 'farmers:create',
  FARMERS_UPDATE: 'farmers:update',
  FARMERS_DELETE: 'farmers:delete',
  DEALERS_VIEW: 'dealers:view',
  CUSTOMERS_VIEW: 'customers:view',
  SUPPLIERS_VIEW: 'suppliers:view',

  // Catalog & inventory
  PRODUCTS_VIEW: 'products:view',
  CATEGORIES_VIEW: 'categories:view',
  INVENTORY_VIEW: 'inventory:view',
  WAREHOUSE_VIEW: 'warehouse:view',
  STOCK_VIEW: 'stock:view',

  // Commerce
  PURCHASE_VIEW: 'purchase:view',
  QUOTATIONS_VIEW: 'quotations:view',
  SALES_VIEW: 'sales:view',
  INVOICES_VIEW: 'invoices:view',
  PAYMENTS_VIEW: 'payments:view',
  DELIVERY_VIEW: 'delivery:view',

  // Field ops
  CROP_VIEW: 'crop:view',
  FARM_VISITS_VIEW: 'farm-visits:view',
  MARKETING_VIEW: 'marketing:view',

  // Platform
  REPORTS_VIEW: 'reports:view',
  USERS_VIEW: 'users:view',
  USERS_MANAGE: 'users:create',
  ROLES_VIEW: 'roles:view',
  SETTINGS_VIEW: 'settings:view',
} as const;

export type AppPermission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
export const ROLE_PERMISSIONS: Record<Role, Permission[] | '*'> = {
  [Role.SuperAdmin]: '*',
  [Role.Admin]: Object.values(PERMISSIONS),
  [Role.Manager]: [
    PERMISSIONS.FARMERS_VIEW,
    PERMISSIONS.DEALERS_VIEW,
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.PRODUCTS_VIEW,
    PERMISSIONS.INVENTORY_VIEW,
    PERMISSIONS.SALES_VIEW,
    PERMISSIONS.REPORTS_VIEW,
  ],
  [Role.SalesAgent]: [
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.QUOTATIONS_VIEW,
    PERMISSIONS.SALES_VIEW,
    PERMISSIONS.INVOICES_VIEW,
  ],
  [Role.FieldOfficer]: [
    PERMISSIONS.FARMERS_VIEW,
    PERMISSIONS.CROP_VIEW,
    PERMISSIONS.FARM_VISITS_VIEW,
  ],
  [Role.Viewer]: [PERMISSIONS.REPORTS_VIEW],
};
