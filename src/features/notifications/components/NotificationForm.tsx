import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, Textarea } from '@components';
import { NotificationStatus } from '../types';
import { notificationSchema, type NotificationFormValues } from '../schemas/notifications.schema';

interface NotificationFormProps {
  defaultValues?: Partial<NotificationFormValues>;
  onSubmit: (values: NotificationFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const statusOptions = Object.values(NotificationStatus).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export function NotificationForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Save',
}: NotificationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: { status: NotificationStatus.Active, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Name" {...register('name')} error={errors.name?.message} />
      <Input label="Code" {...register('code')} error={errors.code?.message} />
      <Select
        label="Status"
        options={statusOptions}
        {...register('status')}
        error={errors.status?.message}
      />
      <Textarea
        label="Description"
        {...register('description')}
        error={errors.description?.message}
      />
      <div className="flex justify-end gap-2">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
