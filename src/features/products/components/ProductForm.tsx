import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input, Select, Switch, Textarea } from '@components';
import type { SelectOption } from '@common/types';
import { formatDateTime } from '@common/utils';
import type { Product } from '../types';
import { productSchema, type ProductFormValues } from '../schemas/products.schema';

export const PRODUCT_FORM_ID = 'product-form';

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  product?: Product;
  categoryOptions: SelectOption[];
  onSubmit: (values: ProductFormValues) => void;
  readOnly?: boolean;
}

export function ProductForm({
  defaultValues,
  product,
  categoryOptions,
  onSubmit,
  readOnly = false,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { is_active: true, ...defaultValues },
  });

  return (
    <form id={PRODUCT_FORM_ID} onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <Input
        label="Name"
        required
        disabled={readOnly}
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label="SKU"
        required
        disabled={readOnly}
        {...register('sku')}
        error={errors.sku?.message}
      />
      <Select
        label="Category"
        required
        options={categoryOptions}
        disabled={readOnly}
        {...register('category_id')}
        error={errors.category_id?.message}
      />
      <Input
        label="Unit"
        required
        disabled={readOnly}
        {...register('unit')}
        error={errors.unit?.message}
      />
      <Input
        label="Price"
        type="number"
        step="0.01"
        required
        disabled={readOnly}
        {...register('price')}
        error={errors.price?.message}
      />
      <Input
        label="Cost Price"
        type="number"
        step="0.01"
        required
        disabled={readOnly}
        {...register('cost_price')}
        error={errors.cost_price?.message}
      />
      <Input
        label="Stock Quantity"
        type="number"
        required
        disabled={readOnly}
        {...register('stock_quantity')}
        error={errors.stock_quantity?.message}
      />
      <Input
        label="Reorder Level"
        type="number"
        required
        disabled={readOnly}
        {...register('reorder_level')}
        error={errors.reorder_level?.message}
      />

      <div className="col-span-2">
        <Textarea
          label="Description"
          disabled={readOnly}
          {...register('description')}
          error={errors.description?.message}
        />
      </div>

      <div className="col-span-2">
        <Switch label="Active" disabled={readOnly} {...register('is_active')} />
      </div>

      {product && (
        <div className="col-span-2 rounded-md border border-border bg-muted/40 p-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-bold text-[#1d252db3]">Created</p>
              <p className="text-sm text-foreground">{formatDateTime(product.created_at)}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-[#1d252db3]">Last updated</p>
              <p className="text-sm text-foreground">{formatDateTime(product.updated_at)}</p>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
