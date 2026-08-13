import { Package, Settings, ShieldCheck, UserCog, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, PageHeader, PermissionGate } from '@components';
import { PERMISSIONS } from '@common/permissions';
import { ROUTES } from '@common/constants';
import type { Permission } from '@common/types';

interface SettingsSection {
  title: string;
  description: string;
  to: string;
  icon: LucideIcon;
  permission: Permission;
}

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    title: 'General',
    description: 'Manage company profile, currency, time zone and date format.',
    to: ROUTES.SETTINGS_GENERAL,
    icon: Settings,
    permission: PERMISSIONS.SETTINGS_VIEW,
  },
  {
    title: 'Products',
    description: 'Manage catalog items, pricing and product details.',
    to: '/products',
    icon: Package,
    permission: PERMISSIONS.PRODUCTS_VIEW,
  },
  {
    title: 'Add User',
    description: 'Create a new user account and assign their roles.',
    to: ROUTES.SETTINGS_USERS,
    icon: UserCog,
    permission: PERMISSIONS.USERS_MANAGE,
  },
  {
    title: 'Roles',
    description: 'Define roles and the permissions assigned to them.',
    to: '/roles',
    icon: ShieldCheck,
    permission: PERMISSIONS.ROLES_VIEW,
  },
];

export default function SettingsListPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage products, users, roles and permissions." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SETTINGS_SECTIONS.map((section) => (
          <PermissionGate key={section.to} permissions={[section.permission]}>
            <Link
              to={section.to}
              className="block rounded-6px focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Card className="flex h-full items-start gap-4 p-5 transition-shadow hover:shadow-lg">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <section.icon className="size-5" />
                </span>
                <div className="space-y-1">
                  <h3 className=" text-black20 font-bold text-buttonlarge ">{section.title}</h3>
                  <p className=" text-gray92 font-medium text-bodysmall ">{section.description}</p>
                </div>
              </Card>
            </Link>
          </PermissionGate>
        ))}
      </div>
    </div>
  );
}
