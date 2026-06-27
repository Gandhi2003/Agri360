/**
 * Cross-feature query keys. Feature-specific keys live in each feature's
 * `constants/` module to keep the cache namespaced and tree-shakeable.
 */
export const QUERY_KEYS = {
  CURRENT_USER: ['auth', 'current-user'] as const,
  NOTIFICATIONS: ['notifications'] as const,
} as const;
