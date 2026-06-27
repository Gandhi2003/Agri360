import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@common/hooks';
import { Button } from '@components/ui/Button';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  );
}
