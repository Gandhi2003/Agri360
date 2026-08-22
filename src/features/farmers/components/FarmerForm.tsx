import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@components';
import type { Farmer } from '../types';
import { farmerSchema, type FarmerFormValues } from '../schemas/farmers.schema';

interface FarmerFormProps {
  defaultValues?: Partial<FarmerFormValues>;
  owner?: Farmer['owner'];
  onSubmit: (values: FarmerFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  readOnly?: boolean;
}

export function FarmerForm({
  defaultValues,
  owner,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel = 'Save',
  readOnly = false,
}: FarmerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FarmerFormValues>({
    resolver: zodResolver(farmerSchema),
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
          label="Phone"
          disabled={readOnly}
          {...register('phone')}
          error={errors.phone?.message}
        />
        <Input
          label="Email"
          type="email"
          disabled={readOnly}
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Primary Crop"
          disabled={readOnly}
          {...register('primary_crop')}
          error={errors.primary_crop?.message}
        />
        <Input
          label="Land Size (acres)"
          type="number"
          step="0.01"
          disabled={readOnly}
          {...register('land_size_acres')}
          error={errors.land_size_acres?.message}
        />
        <Input
          label="Village"
          disabled={readOnly}
          {...register('village')}
          error={errors.village?.message}
        />
        <Input
          label="District"
          disabled={readOnly}
          {...register('district')}
          error={errors.district?.message}
        />
        <Input
          label="State"
          disabled={readOnly}
          {...register('state')}
          error={errors.state?.message}
        />
      </div>

      {readOnly && owner && (
        <div className="rounded-md border border-border bg-muted/40 p-3.5">
          <p className="mb-2 text-xs font-bold text-[#1d252db3]">Owner</p>
          <p className="text-sm font-medium text-foreground">{owner.full_name}</p>
          <p className="text-sm text-muted-foreground">{owner.email}</p>
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
