import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, LogOut, Menu, Settings, User } from 'lucide-react';
import { cn } from '@lib/cn';
import { ROUTES } from '@common/constants';
import { useAuth } from '@common/hooks';
import { useLogout } from '@features/auth';
import { useUiStore } from '@app/store';
import { Avatar } from '@components/ui/Avatar';
import { Button } from '@components/ui/Button';
import { Dropdown } from '@components/ui/Dropdown';
import { FullscreenToggle } from '@components/shared/FullscreenToggle';
import { ThemeToggle } from '@components/shared/ThemeToggle';
import { NavSearch } from './NavSearch';

const formatRoleLabel = (role?: string) =>
  role ? role.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '';

export function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { mutate: logout } = useLogout();
  const setMobileOpen = useUiStore((s) => s.setMobileSidebarOpen);
  const isSettingsActive = pathname.startsWith(ROUTES.SETTINGS);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-card/80 px-4 backdrop-blur">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>

      <div className="hidden flex-1 sm:block">
        <NavSearch />
      </div>

      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
        <FullscreenToggle />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          onClick={() => navigate('/notifications')}
        >
          <Bell className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Settings"
          className={cn(isSettingsActive && 'text-primary')}
          onClick={() => navigate(ROUTES.SETTINGS)}
        >
          <Settings className="size-5" />
        </Button>
        <Dropdown
          trigger={
            <button className="focus-ring flex items-center gap-2 rounded-full p-1">
              <Avatar
                src={user?.avatarUrl}
                firstName={user?.firstName}
                lastName={user?.lastName}
                size="sm"
              />
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-sm font-bold text-foreground">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="block text-xs font-medium text-muted-foreground">
                  {formatRoleLabel(user?.roles?.[0])}
                </span>
              </span>
            </button>
          }
          items={[
            {
              label: 'Profile',
              icon: <User className="size-4" />,
              onClick: () => navigate(ROUTES.PROFILE),
            },
            {
              label: 'Settings',
              icon: <Settings className="size-4" />,
              onClick: () => navigate(ROUTES.SETTINGS),
            },
            {
              label: 'Sign out',
              icon: <LogOut className="size-4" />,
              onClick: logout,
              danger: true,
            },
          ]}
        />
      </div>
    </header>
  );
}
