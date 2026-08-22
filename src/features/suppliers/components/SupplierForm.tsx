import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@components';
import { formatDateTime } from '@common/utils';
import type { Supplier } from '../types';
import { supplierSchema, type SupplierFormValues } from '../schemas/suppliers.schema';

interface SupplierFormProps {
  defaultValues?: Partial<SupplierFormValues>;
  supplier?: Supplier;
  onSubmit: (values: SupplierFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  readOnly?: boolean;
}

export function SupplierForm({
  defaultValues,
  supplier,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel = 'Save',
  readOnly = false,
}: SupplierFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Name"
          required
          disabled={readOnly}
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Company"
          disabled={readOnly}
          {...register('company')}
          error={errors.company?.message}
        />
        <Input
          label="Email"
          type="email"
          disabled={readOnly}
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Phone"
          disabled={readOnly}
          {...register('phone')}
          error={errors.phone?.message}
        />
        <Input
          label="Country"
          disabled={readOnly}
          {...register('country')}
          error={errors.country?.message}
        />
      </div>

      {supplier && (
        <div className="rounded-md border border-border bg-muted/40 p-3.5">
          <p className="mb-2 text-xs font-bold text-[#1d252db3]">Owner</p>
          <p className="text-sm font-medium text-foreground">{supplier.owner?.full_name ?? '—'}</p>
          <p className="text-sm text-muted-foreground">{supplier.owner?.email ?? '—'}</p>
          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-3">
            <div>
              <p className="text-xs font-bold text-[#1d252db3]">Created</p>
              <p className="text-sm text-foreground">{formatDateTime(supplier.created_at)}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-[#1d252db3]">Last updated</p>
              <p className="text-sm text-foreground">{formatDateTime(supplier.updated_at)}</p>
            </div>
          </div>
        </div>
      )}

      {!readOnly && (
        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
          )}
          <Button type="submit" isLoading={isSubmitting}>
            {submitLabel}
          </Button>
        </div>
      )}
    </form>
  );
}
