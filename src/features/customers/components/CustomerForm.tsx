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
  readOnly?: boolean;
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
  readOnly = false,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input label="Name" disabled={readOnly} {...register('name')} error={errors.name?.message} />
      <Input label="Code" disabled={readOnly} {...register('code')} error={errors.code?.message} />
      <Select
        label="Status"
        options={statusOptions}
        disabled={readOnly}
        {...register('status')}
        error={errors.status?.message}
      />
      <Textarea
        label="Description"
        disabled={readOnly}
        {...register('description')}
        error={errors.description?.message}
      />
      {!readOnly && (
        <div className="flex justify-end gap-2">
          <Button type="submit" isLoading={isSubmitting}>
            {submitLabel}
          </Button>
        </div>
      )}
    </form>
  );
}
