import { useNavigate } from 'react-router-dom';
import { Bell, LogOut, Menu, PanelLeftClose, PanelLeft, Settings, User } from 'lucide-react';
import { ROUTES } from '@common/constants';
import { useAuth } from '@common/hooks';
import { useAuthStore, useUiStore } from '@app/store';
import { Avatar } from '@components/ui/Avatar';
import { Button } from '@components/ui/Button';
import { Dropdown } from '@components/ui/Dropdown';
import { Breadcrumb } from '@components/breadcrumb/Breadcrumb';
import { ThemeToggle } from '@components/shared/ThemeToggle';

export function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const clearSession = useAuthStore((s) => s.clearSession);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const setMobileOpen = useUiStore((s) => s.setMobileSidebarOpen);

  const logout = () => {
    clearSession();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border bg-card/80 px-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:inline-flex"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <PanelLeft className="size-5" /> : <PanelLeftClose className="size-5" />}
        </Button>
        <div className="hidden md:block">
          <Breadcrumb />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          onClick={() => navigate('/notifications')}
        >
          <Bell className="size-5" />
        </Button>
        <Dropdown
          trigger={
            <button className="focus-ring flex items-center gap-2 rounded-full p-1 hover:bg-muted">
              <Avatar
                src={user?.avatarUrl}
                firstName={user?.firstName}
                lastName={user?.lastName}
                size="sm"
              />
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
