import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { ROUTES } from '@common/constants';
import { useFormErrors } from '@common/hooks';
import { Button, Checkbox, Input } from '@components';
import { useLogin } from '../hooks/useAuthentication';
import { loginSchema, type LoginFormValues } from '../schemas/authentication.schema';

export default function LoginPage() {
  const location = useLocation();
  const redirectTo = (location.state as { from?: string } | null)?.from ?? ROUTES.DASHBOARD;
  const login = useLogin(redirectTo);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
  const mapErrors = useFormErrors(setError);

  const onSubmit = (values: LoginFormValues) => login.mutate(values, { onError: mapErrors });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Sign in</h2>
        <p className="text-sm text-muted-foreground">Welcome back. Enter your credentials.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@agri360.com"
          leftIcon={<Mail className="size-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          leftIcon={<Lock className="size-4" />}
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" {...register('rememberMe')} />
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" fullWidth isLoading={login.isPending}>
          Sign in
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        Demo: this UI calls <code>POST /auth/login</code>. Wire it to your backend or a mock.
      </p>
    </div>
  );
}
