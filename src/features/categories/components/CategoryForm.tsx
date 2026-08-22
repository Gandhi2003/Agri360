import type { ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import { Button, Input, Switch, Textarea } from '@components';
import { categorySchema, type CategoryFormValues } from '../schemas/categories.schema';

interface CategoryFormProps {
  defaultValues?: Partial<CategoryFormValues>;
  onSubmit: (values: CategoryFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      {children}
    </div>
  );
}

export function CategoryForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel = 'Save',
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { is_active: true, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Field label="Name" htmlFor="name" required>
        <Input {...register('name')} error={errors.name?.message} placeholder="e.g. Seeds" />
      </Field>

      <Field label="Description" htmlFor="description">
        <Textarea
          {...register('description')}
          error={errors.description?.message}
          placeholder="Short description of this category…"
        />
      </Field>

      <Field label="Active">
        <Switch label="Active" {...register('is_active')} />
      </Field>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" leftIcon={<Save className="size-4" />} isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
