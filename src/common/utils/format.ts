/** Formatting helpers — pure, no side effects. */

const DEFAULT_LOCALE = 'en-IN';

export const formatCurrency = (value: number, currency = 'INR', locale = DEFAULT_LOCALE): string =>
  new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 2 }).format(
    value,
  );

export const formatNumber = (value: number, locale = DEFAULT_LOCALE): string =>
  new Intl.NumberFormat(locale).format(value);

export const formatDate = (
  value: string | number | Date,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' },
  locale = DEFAULT_LOCALE,
): string => new Intl.DateTimeFormat(locale, options).format(new Date(value));

export const formatDateTime = (value: string | number | Date, locale = DEFAULT_LOCALE): string =>
  formatDate(value, { dateStyle: 'medium', timeStyle: 'short' }, locale);

export const formatInitials = (first?: string, last?: string): string =>
  `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase() || '?';

export const truncate = (text: string, max = 64): string =>
  text.length > max ? `${text.slice(0, max - 1)}…` : text;

export const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);
