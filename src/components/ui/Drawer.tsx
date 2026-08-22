import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@lib/cn';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  side?: 'left' | 'right';
  width?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  footer,
  side = 'right',
  width = 'max-w-md',
}: DrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 animate-fade-in bg-black/50" onClick={onClose} aria-hidden />
      <aside
        className={cn(
          'absolute top-0 flex h-full w-full animate-slide-in-right flex-col border-border bg-card shadow-xl',
          width,
          side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
        )}
        role="dialog"
        aria-modal="true"
      >
        <header className="flex h-15 shrink-0 items-center justify-between border-b border-border px-5">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="focus-ring rounded-md p-1 text-muted-foreground hover:bg-muted"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer && <footer className="p-5">{footer}</footer>}
      </aside>
    </div>,
    document.body,
  );
}
