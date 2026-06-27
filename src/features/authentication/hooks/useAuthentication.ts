import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '@common/constants';
import { useAuthStore } from '@app/store';
import type { ForgotPasswordPayload, LoginPayload, ResetPasswordPayload } from '@common/types';
import { authApi } from '../api/authentication.api';

/** Authenticate, persist the session, then route to the dashboard (or `redirectTo`). */
export const useLogin = (redirectTo: string = ROUTES.DASHBOARD) => {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: ({ user, tokens }) => {
      setSession(user, tokens);
      toast.success(`Welcome back, ${user.firstName}!`);
      navigate(redirectTo, { replace: true });
    },
  });
};

/** Clear the server session + local state, then return to login. */
export const useLogout = () => {
  const navigate = useNavigate();
  const clearSession = useAuthStore((s) => s.clearSession);

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      clearSession();
      navigate(ROUTES.LOGIN, { replace: true });
    },
  });
};

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => authApi.forgotPassword(payload),
    onSuccess: () => toast.success('If the email exists, a reset link has been sent.'),
  });

export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => authApi.resetPassword(payload),
    onSuccess: () => {
      toast.success('Password reset. You can now sign in.');
      navigate(ROUTES.LOGIN, { replace: true });
    },
  });
};
