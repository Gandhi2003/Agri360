import { lazy, Suspense, type ComponentType } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { ROUTES } from '@common/constants';
import type { FeatureRoute } from '@common/types';
import { AuthLayout, DashboardLayout } from '@app/layouts';
import { GuestRoute, PermissionGuard, ProtectedRoute } from '@app/guards';
import { Loader } from '@components/ui/Spinner';
import { featureRoutes } from './feature.routes';

const NotFoundPage = lazy(() => import('@/routes/NotFoundPage'));
const ForbiddenPage = lazy(() => import('@/routes/ForbiddenPage'));

// Public auth pages (no protected aggregation).
const LoginPage = lazy(() => import('@features/auth/pages/LoginPage'));
const ForgotPasswordPage = lazy(() => import('@features/auth/pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@features/auth/pages/ResetPasswordPage'));

const withSuspense = (Component: ComponentType) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const toRouteObject = (route: FeatureRoute): RouteObject => {
  const Component = lazy(route.component);
  return {
    path: route.path,
    element: (
      <PermissionGuard permission={route.permission} roles={route.roles}>
        {withSuspense(Component)}
      </PermissionGuard>
    ),
    children: route.children?.map(toRouteObject),
  };
};

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  // ── Public / auth ──
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <GuestRoute>{withSuspense(LoginPage)}</GuestRoute> },
      { path: ROUTES.FORGOT_PASSWORD, element: withSuspense(ForgotPasswordPage) },
      { path: ROUTES.RESET_PASSWORD, element: withSuspense(ResetPasswordPage) },
    ],
  },
  // ── Protected app ──
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: featureRoutes.map(toRouteObject),
  },
  // ── Errors ──
  { path: ROUTES.UNAUTHORIZED, element: withSuspense(ForbiddenPage) },
  { path: '*', element: withSuspense(NotFoundPage) },
]);
