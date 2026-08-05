import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, Textarea } from '@components';
import { FarmVisitStatus } from '../types';
import { farmVisitSchema, type FarmVisitFormValues } from '../schemas/farm-visits.schema';

interface FarmVisitFormProps {
  defaultValues?: Partial<FarmVisitFormValues>;
  onSubmit: (values: FarmVisitFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const statusOptions = Object.values(FarmVisitStatus).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export function FarmVisitForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Save',
}: FarmVisitFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FarmVisitFormValues>({
    resolver: zodResolver(farmVisitSchema),
    defaultValues: { status: FarmVisitStatus.Active, ...defaultValues },
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
