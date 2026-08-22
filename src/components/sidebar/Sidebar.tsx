import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import logo from '@assets/images/logo.png';
import { AgriLogo } from '@components/shared/AgriLogo';
import { cn } from '@lib/cn';
import { usePermissions } from '@common/hooks';
import { useUiStore } from '@app/store';
import { NAVIGATION, type NavItem } from '@app/router/navigation.config';

function SidebarLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const { icon: Icon, label, to } = item;
  return (
    <NavLink
      to={to}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        cn(
          'flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors',
          collapsed && 'justify-center',
          isActive
            ? 'bg-primary font-bold text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon className="size-4 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
          {!collapsed && <span className="truncate">{label}</span>}
        </>
      )}
    </NavLink>
  );
}

export function Sidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const mobileOpen = useUiStore((s) => s.mobileSidebarOpen);
  const setMobileOpen = useUiStore((s) => s.setMobileSidebarOpen);
  const { can } = usePermissions();

  const visibleSections = NAVIGATION.map((section) => ({
    ...section,
    items: section.items.filter((item) => !item.permission || can(item.permission)),
  })).filter((section) => section.items.length > 0);

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex flex-col bg-card shadow-customTable transition-[width,transform] duration-200 lg:static lg:translate-x-0',
          collapsed ? 'w-[72px]' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between gap-2 border-b border-border px-4">
          <div className={cn('flex items-center overflow-hidden', collapsed && 'justify-center')}>
            {collapsed ? (
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                <AgriLogo className="size-5" />
              </span>
            ) : (
              <span className="grid h-10 shrink-0 place-items-center rounded-md bg-white px-2">
                <img src={logo} alt="Agro Trade" className="h-8 w-auto object-contain" />
              </span>
            )}
          </div>
          <button
            className="rounded-md p-1 text-muted-foreground hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="sidebar-scroll flex-1 space-y-6 overflow-y-auto px-3 py-4">
          {visibleSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {!collapsed && (
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  {section.title}
                </p>
              )}
              {section.items.map((item) => (
                <SidebarLink key={item.to} item={item} collapsed={collapsed} />
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
