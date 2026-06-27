import { useThemeStore } from '@app/store';

/** Ergonomic accessor for theme state + toggling. */
export function useTheme() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  return { theme, isDark: theme === 'dark', setTheme, toggleTheme };
}
