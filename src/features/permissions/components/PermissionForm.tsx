import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, Textarea } from '@components';
import { PermissionStatus } from '../types';
import { permissionSchema, type PermissionFormValues } from '../schemas/permissions.schema';

interface PermissionFormProps {
  defaultValues?: Partial<PermissionFormValues>;
  onSubmit: (values: PermissionFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const statusOptions = Object.values(PermissionStatus).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export function PermissionForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Save',
}: PermissionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PermissionFormValues>({
    resolver: zodResolver(permissionSchema),
    defaultValues: { status: PermissionStatus.Active, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
