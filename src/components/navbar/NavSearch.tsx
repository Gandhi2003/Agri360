import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { usePermissions } from '@common/hooks';
import { NAVIGATION } from '@app/router/navigation.config';

/** Quick-nav search over the sidebar menu — filters by label and jumps on select. */
export function NavSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { can } = usePermissions();

  const items = useMemo(
    () =>
      NAVIGATION.flatMap((section) => section.items).filter(
        (item) => !item.permission || can(item.permission),
      ),
    [can],
  );

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return items.filter((item) => item.label.toLowerCase().includes(term)).slice(0, 8);
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const goTo = (to: string) => {
    navigate(to);
    setQuery('');
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => query && setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && results[0]) goTo(results[0].to);
        }}
        placeholder="Search…"
        aria-label="Search menu"
        className="focus-ring h-10 w-full rounded-md border border-gray5 bg-muted pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground"
      />
      {open && results.length > 0 && (
        <div className="absolute z-40 mt-1 w-full animate-scale-in rounded-md border border-border bg-card p-1 shadow-lg">
          {results.map((item) => (
            <button
              key={item.to}
              type="button"
              onClick={() => goTo(item.to)}
              className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-foreground hover:bg-muted"
            >
              <item.icon className="size-4 text-muted-foreground" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
