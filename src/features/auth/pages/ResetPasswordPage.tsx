import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button, Input } from '@components';
import { useResetPassword } from '../hooks/useAuthentication';
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '../schemas/authentication.schema';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const reset = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Reset password</h2>
        <p className="text-sm text-muted-foreground">Choose a new password for your account.</p>
      </div>

      <form onSubmit={handleSubmit((v) => reset.mutate(v))} className="space-y-4">
        <input type="hidden" {...register('token')} />
        <Input
          label="New password"
          type="password"
          autoComplete="new-password"
          leftIcon={<Lock className="size-4" />}
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          leftIcon={<Lock className="size-4" />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Button
          type="submit"
          fullWidth
          isLoading={reset.isPending}
          className="rounded-lg  px-6 py-2 text-buttonlarge font-bold cursor-pointer text-white transition duration-300 ease-in-out hover:border hover:bg-white! hover:text-primary! hover:boredr-primary border-primary"
        >
          Reset password
        </Button>
      </form>
    </div>
  );
}
