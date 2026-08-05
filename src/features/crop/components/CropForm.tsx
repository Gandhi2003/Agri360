import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, Textarea } from '@components';
import { CropStatus } from '../types';
import { cropSchema, type CropFormValues } from '../schemas/crop.schema';

interface CropFormProps {
  defaultValues?: Partial<CropFormValues>;
  onSubmit: (values: CropFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const statusOptions = Object.values(CropStatus).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export function CropForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Save',
}: CropFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CropFormValues>({
    resolver: zodResolver(cropSchema),
    defaultValues: { status: CropStatus.Active, ...defaultValues },
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
