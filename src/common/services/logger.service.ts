import { env } from '@common/config';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Minimal logging facade. Swap the sink (Sentry, Datadog, etc.) here without
 * touching call sites. No-ops below `warn` in production.
 */
const emit = (level: LogLevel, message: string, meta?: unknown): void => {
  if (env.isProd && (level === 'debug' || level === 'info')) return;
  const sink = level === 'debug' ? console.log : console[level];
  sink(`[agri360] ${message}`, meta ?? '');
};

export const logger = {
  debug: (message: string, meta?: unknown) => emit('debug', message, meta),
  info: (message: string, meta?: unknown) => emit('info', message, meta),
  warn: (message: string, meta?: unknown) => emit('warn', message, meta),
  error: (message: string, meta?: unknown) => emit('error', message, meta),
};
