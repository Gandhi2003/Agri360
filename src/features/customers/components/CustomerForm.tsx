import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, Textarea } from '@components';
import { CustomerStatus } from '../types';
import { customerSchema, type CustomerFormValues } from '../schemas/customers.schema';

interface CustomerFormProps {
  defaultValues?: Partial<CustomerFormValues>;
  onSubmit: (values: CustomerFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const statusOptions = Object.values(CustomerStatus).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export function CustomerForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Save',
}: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: { status: CustomerStatus.Active, ...defaultValues },
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
