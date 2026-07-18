import {
  BarChart3,
  Bell,
  Boxes,
  CreditCard,
  FileText,
  Handshake,
  KeyRound,
  Layers,
  LayoutDashboard,
  type LucideIcon,
  MapPinned,
  Megaphone,
  Package,
  PackageCheck,
  ReceiptText,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Tags,
  Tractor,
  TrendingUp,
  Truck,
  UserCircle,
  UserCog,
  Users,
  Warehouse,
} from 'lucide-react';
import { PERMISSIONS } from '@common/permissions';
import type { Permission } from '@common/types';

export interface NavItem {
  label: string;
  /** Absolute route path. */
  to: string;
  icon: LucideIcon;
  /** Permission required to see this item (omit = always visible). */
  permission?: Permission;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAVIGATION: NavSection[] = [
  {
    title: 'Overview',
    items: [{ label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'Partners',
    items: [
      { label: 'Farmers', to: '/farmers', icon: Tractor, permission: PERMISSIONS.FARMERS_VIEW },
      { label: 'Dealers', to: '/dealers', icon: Handshake, permission: PERMISSIONS.DEALERS_VIEW },
      { label: 'Customers', to: '/customers', icon: Users, permission: PERMISSIONS.CUSTOMERS_VIEW },
      { label: 'Suppliers', to: '/suppliers', icon: Truck, permission: PERMISSIONS.SUPPLIERS_VIEW },
    ],
  },
  {
    title: 'Catalog & Inventory',
    items: [
      { label: 'Products', to: '/products', icon: Package, permission: PERMISSIONS.PRODUCTS_VIEW },
      {
        label: 'Categories',
        to: '/categories',
        icon: Tags,
        permission: PERMISSIONS.CATEGORIES_VIEW,
      },
      { label: 'Inventory', to: '/inventory', icon: Boxes, permission: PERMISSIONS.INVENTORY_VIEW },
      {
        label: 'Warehouse',
        to: '/warehouse',
        icon: Warehouse,
        permission: PERMISSIONS.WAREHOUSE_VIEW,
      },
      { label: 'Stock', to: '/stock', icon: Layers, permission: PERMISSIONS.STOCK_VIEW },
    ],
  },
  {
    title: 'Procurement & Sales',
    items: [
      {
        label: 'Purchase',
        to: '/purchase',
        icon: ShoppingCart,
        permission: PERMISSIONS.PURCHASE_VIEW,
      },
      {
        label: 'Quotations',
        to: '/quotations',
        icon: FileText,
        permission: PERMISSIONS.QUOTATIONS_VIEW,
      },
      { label: 'Sales', to: '/sales', icon: TrendingUp, permission: PERMISSIONS.SALES_VIEW },
      {
        label: 'Invoices',
        to: '/invoices',
        icon: ReceiptText,
        permission: PERMISSIONS.INVOICES_VIEW,
      },
      {
        label: 'Payments',
        to: '/payments',
        icon: CreditCard,
        permission: PERMISSIONS.PAYMENTS_VIEW,
      },
      {
        label: 'Delivery',
        to: '/delivery',
        icon: PackageCheck,
        permission: PERMISSIONS.DELIVERY_VIEW,
      },
    ],
  },
  {
    title: 'Field Operations',
    items: [
      { label: 'Crop Management', to: '/crop', icon: Sprout, permission: PERMISSIONS.CROP_VIEW },
      {
        label: 'Farm Visits',
        to: '/farm-visits',
        icon: MapPinned,
        permission: PERMISSIONS.FARM_VISITS_VIEW,
      },
      {
        label: 'Marketing',
        to: '/marketing',
        icon: Megaphone,
        permission: PERMISSIONS.MARKETING_VIEW,
      },
    ],
  },
  {
    title: 'Insights',
    items: [
      { label: 'Reports', to: '/reports', icon: BarChart3, permission: PERMISSIONS.REPORTS_VIEW },
      { label: 'Notifications', to: '/notifications', icon: Bell },
    ],
  },
  {
    title: 'Administration',
    items: [
      { label: 'Users', to: '/users', icon: UserCog, permission: PERMISSIONS.USERS_VIEW },
      { label: 'Roles', to: '/roles', icon: ShieldCheck, permission: PERMISSIONS.ROLES_VIEW },
      {
        label: 'Permissions',
        to: '/permissions',
        icon: KeyRound,
        permission: PERMISSIONS.PERMISSIONS_VIEW,
      },
      { label: 'Settings', to: '/settings', icon: Settings, permission: PERMISSIONS.SETTINGS_VIEW },
    ],
  },
  {
    title: 'Account',
    items: [{ label: 'Profile', to: '/profile', icon: UserCircle }],
  },
];
