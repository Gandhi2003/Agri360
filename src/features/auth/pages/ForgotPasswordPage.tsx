import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@common/constants';
import { Button, Input } from '@components';
import { useForgotPassword } from '../hooks/useAuthentication';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '../schemas/authentication.schema';

export default function ForgotPasswordPage() {
  const forgot = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema) });

  return (
    <div className="space-y-8">
      <Link
        to={ROUTES.LOGIN}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back To Sign In
      </Link>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-primary">Forgot Password?</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit((v) => forgot.mutate(v))} className="space-y-5">
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

        <Button
          type="submit"
          fullWidth
          size="lg"
          isLoading={forgot.isPending}
          className="rounded-lg  px-6 py-2 text-buttonlarge font-bold cursor-pointer text-white transition duration-300 ease-in-out hover:border hover:bg-white! hover:text-primary! hover:boredr-primary border-primary"
        >
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}
