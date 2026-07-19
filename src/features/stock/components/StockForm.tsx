import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, Textarea } from '@components';
import { StockStatus } from '../types';
import { stockSchema, type StockFormValues } from '../schemas/stock.schema';

interface StockFormProps {
  defaultValues?: Partial<StockFormValues>;
  onSubmit: (values: StockFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const statusOptions = Object.values(StockStatus).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export function StockForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Save',
}: StockFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StockFormValues>({
    resolver: zodResolver(stockSchema),
    defaultValues: { status: StockStatus.Active, ...defaultValues },
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
