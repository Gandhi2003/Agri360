// AUTO-AGGREGATED feature route table. Regenerate via scripts/generate.mjs.
import type { FeatureRoute } from '@common/types';
import { dashboardRoutes } from '@features/dashboard/routes';
import { authenticationRoutes } from '@features/authentication/routes';
import { usersRoutes } from '@features/users/routes';
import { rolesRoutes } from '@features/roles/routes';
import { permissionsRoutes } from '@features/permissions/routes';
import { farmersRoutes } from '@features/farmers/routes';
import { dealersRoutes } from '@features/dealers/routes';
import { customersRoutes } from '@features/customers/routes';
import { suppliersRoutes } from '@features/suppliers/routes';
import { productsRoutes } from '@features/products/routes';
import { categoriesRoutes } from '@features/categories/routes';
import { inventoryRoutes } from '@features/inventory/routes';
import { warehouseRoutes } from '@features/warehouse/routes';
import { stockRoutes } from '@features/stock/routes';
import { purchaseRoutes } from '@features/purchase/routes';
import { quotationsRoutes } from '@features/quotations/routes';
import { salesRoutes } from '@features/sales/routes';
import { invoicesRoutes } from '@features/invoices/routes';
import { paymentsRoutes } from '@features/payments/routes';
import { deliveryRoutes } from '@features/delivery/routes';
import { cropRoutes } from '@features/crop/routes';
import { farmVisitsRoutes } from '@features/farm-visits/routes';
import { marketingRoutes } from '@features/marketing/routes';
import { reportsRoutes } from '@features/reports/routes';
import { notificationsRoutes } from '@features/notifications/routes';
import { settingsRoutes } from '@features/settings/routes';
import { profileRoutes } from '@features/profile/routes';

/** Flattened list of every feature's protected routes. */
export const featureRoutes: FeatureRoute[] = [
  ...dashboardRoutes,
  ...authenticationRoutes,
  ...usersRoutes,
  ...rolesRoutes,
  ...permissionsRoutes,
  ...farmersRoutes,
  ...dealersRoutes,
  ...customersRoutes,
  ...suppliersRoutes,
  ...productsRoutes,
  ...categoriesRoutes,
  ...inventoryRoutes,
  ...warehouseRoutes,
  ...stockRoutes,
  ...purchaseRoutes,
  ...quotationsRoutes,
  ...salesRoutes,
  ...invoicesRoutes,
  ...paymentsRoutes,
  ...deliveryRoutes,
  ...cropRoutes,
  ...farmVisitsRoutes,
  ...marketingRoutes,
  ...reportsRoutes,
  ...notificationsRoutes,
  ...settingsRoutes,
  ...profileRoutes,
];
