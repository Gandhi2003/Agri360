import type { ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FileText, Hash, Save, Tag, ToggleLeft } from 'lucide-react';
import { Button, Input, Select, Textarea } from '@components';
import { CategoryStatus } from '../types';
import { categorySchema, type CategoryFormValues } from '../schemas/categories.schema';

interface CategoryFormProps {
  defaultValues?: Partial<CategoryFormValues>;
  onSubmit: (values: CategoryFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const statusOptions = Object.values(CategoryStatus).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

function Field({
  icon,
  label,
  htmlFor,
  children,
}: {
  icon: ReactNode;
  label: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        <span className="text-primary">{icon}</span>
        {label}
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
    defaultValues: { status: CategoryStatus.Active, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field icon={<Tag className="size-4" />} label="Name" htmlFor="name">
        <Input {...register('name')} error={errors.name?.message} placeholder="e.g. Seeds" />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field icon={<Hash className="size-4" />} label="Code" htmlFor="code">
          <Input {...register('code')} error={errors.code?.message} placeholder="e.g. SEED" />
        </Field>
        <Field icon={<ToggleLeft className="size-4" />} label="Status" htmlFor="status">
          <Select options={statusOptions} {...register('status')} error={errors.status?.message} />
        </Field>
      </div>

      <Field icon={<FileText className="size-4" />} label="Description" htmlFor="description">
        <Textarea
          {...register('description')}
          error={errors.description?.message}
          placeholder="Short description of this category…"
        />
      </Field>

      <div className="flex justify-end gap-2 border-t border-border pt-5">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
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
