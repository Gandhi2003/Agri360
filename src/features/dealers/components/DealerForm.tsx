import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, Textarea } from '@components';
import { DealerStatus } from '../types';
import { dealerSchema, type DealerFormValues } from '../schemas/dealers.schema';

interface DealerFormProps {
  defaultValues?: Partial<DealerFormValues>;
  onSubmit: (values: DealerFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const statusOptions = Object.values(DealerStatus).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export function DealerForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Save',
}: DealerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DealerFormValues>({
    resolver: zodResolver(dealerSchema),
    defaultValues: { status: DealerStatus.Active, ...defaultValues },
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
