import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, Textarea } from '@components';
import { ReportStatus } from '../types';
import { reportSchema, type ReportFormValues } from '../schemas/reports.schema';

interface ReportFormProps {
  defaultValues?: Partial<ReportFormValues>;
  onSubmit: (values: ReportFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  readOnly?: boolean;
}

const statusOptions = Object.values(ReportStatus).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export function ReportForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Save',
  readOnly = false,
}: ReportFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: { status: ReportStatus.Active, ...defaultValues },
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
