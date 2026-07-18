import { Toaster } from 'react-hot-toast';
import { TOAST_DURATION_MS } from '@common/constants';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: TOAST_DURATION_MS,
        style: {
          background: 'rgb(var(--card))',
          color: 'rgb(var(--card-foreground))',
          border: '1px solid rgb(var(--border))',
          fontSize: '0.875rem',
        },
        success: { iconTheme: { primary: 'rgb(var(--success))', secondary: '#fff' } },
        error: { iconTheme: { primary: 'rgb(var(--danger))', secondary: '#fff' } },
      }}
    />
  );
}
