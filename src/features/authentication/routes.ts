import type { FeatureRoute } from '@common/types';

/**
 * Authentication pages are PUBLIC and mounted under the AuthLayout directly in
 * the central router (`@app/router/router.tsx`), so this protected-aggregate
 * export is intentionally empty.
 */
export const authenticationRoutes: FeatureRoute[] = [];
