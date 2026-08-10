import { CheckCircle2, X, XCircle } from 'lucide-react';
import { toast, ToastBar, Toaster } from 'react-hot-toast';
import { TOAST_DURATION_MS } from '@common/constants';
import { cn } from '@lib/cn';

export function ToastProvider() {
  return (
    <Toaster position="top-right" toastOptions={{ duration: TOAST_DURATION_MS }}>
      {(t) => {
        const isError = t.type === 'error';
        return (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              background: 'rgb(var(--card))',
              color: 'rgb(var(--card-foreground))',
              boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 8px 20px -6px rgba(15,23,42,0.12)',
              borderLeft: `4px solid rgb(var(--${isError ? 'danger' : 'success'}))`,
              borderRadius: '0.5rem',
              padding: '0.75rem 0.75rem 0.75rem 1rem',
            }}
          >
            {({ icon, message }) =>
              t.type === 'loading' ? (
                <div className="flex flex-1 items-center gap-3">
                  {icon}
                  <span className="flex-1 text-sm">{message}</span>
                </div>
              ) : (
                <div className="flex flex-1 items-center gap-3">
                  <span
                    className={cn(
                      'flex size-6 shrink-0 items-center justify-center rounded-md text-white',
                      isError ? 'bg-danger' : 'bg-success',
                    )}
                  >
                    {isError ? <XCircle className="size-4" /> : <CheckCircle2 className="size-4" />}
                  </span>
                  <span className="flex-1 text-sm">{message}</span>
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    aria-label="Dismiss notification"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              )
            }
          </ToastBar>
        );
      }}
    </Toaster>
  );
}
