import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
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
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-headinglarge font-extrabold text-primary">Welcome Back.</h1>
        <p className="text-sm text-muted-foreground">Sign in to continue to {`Agri360`}.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-gray400 text-titlesmall font-bold">
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-gray400 text-titlesmall font-bold ">
              Password
            </label>
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-titlesmall font-bold text-primary hover:underline"
            >
              Forgot Password
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <Checkbox label="Remember me" {...register('rememberMe')} />

        <Button
          type="submit"
          fullWidth
          size="lg"
          className="rounded-lg  px-6 py-2 text-buttonlarge font-bold cursor-pointer text-white transition duration-300 ease-in-out hover:border hover:bg-white! hover:text-primary! hover:boredr-primary border-primary"
          isLoading={login.isPending}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
