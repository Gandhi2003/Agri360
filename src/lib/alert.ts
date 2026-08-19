import Swal, { type SweetAlertIcon, type SweetAlertResult } from 'sweetalert2';

const BUTTON_BASE =
  'focus-ring inline-flex h-10 select-none items-center justify-center gap-2 rounded-md px-4 mx-1 text-sm transition-colors cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50';

const swalTheme = Swal.mixin({
  buttonsStyling: false,
  confirmButtonText: 'Ok, got it!',
  customClass: {
    popup: 'rounded-lg font-sans !bg-card !text-card-foreground',
    title: '!text-foreground font-bold',
    htmlContainer: '!text-muted-foreground',
    confirmButton: `${BUTTON_BASE} bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-sm`,
    cancelButton: `${BUTTON_BASE} border border-border bg-transparent text-foreground hover:bg-muted font-medium`,
    denyButton: `${BUTTON_BASE} bg-danger text-white hover:bg-danger/90 font-bold`,
  },
});

export interface AlertOptions {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  showCloseButton?: boolean;
  showCancelButton?: boolean;
  cancelButtonText?: string;
}

const fire = (icon: SweetAlertIcon, options: AlertOptions = {}): Promise<SweetAlertResult> =>
  swalTheme.fire({ icon, ...options });

export const alert = {
  info: (options?: AlertOptions) => fire('info', options),
  success: (options?: AlertOptions) => fire('success', options),
  warning: (options?: AlertOptions) => fire('warning', options),
  error: (options?: AlertOptions) => fire('error', options),
  question: (options?: AlertOptions) => fire('question', options),
};
