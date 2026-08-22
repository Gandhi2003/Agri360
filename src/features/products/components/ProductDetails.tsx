import type { ReactNode } from 'react';
import { Avatar, Badge } from '@components';
import { formatCurrency, formatDateTime, formatNumber } from '@common/utils';
import type { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{children}</dd>
    </div>
  );
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar firstName={product.name} size="lg" />
        <div className="min-w-0 space-y-1">
          <h3 className="truncate text-lg font-semibold text-foreground">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">{product.sku}</span>
            <Badge variant={product.is_active ? 'success' : 'outline'}>
              {product.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-5 border-t border-border pt-6">
        <Field label="Category">{product.category?.name || '—'}</Field>
        <Field label="Unit">{product.unit || '—'}</Field>
        <Field label="Price">{formatCurrency(Number(product.price))}</Field>
        <Field label="Cost Price">{formatCurrency(Number(product.cost_price))}</Field>
        <Field label="Stock Quantity">{formatNumber(product.stock_quantity)}</Field>
        <Field label="Reorder Level">{formatNumber(product.reorder_level)}</Field>
        <div className="col-span-2">
          <Field label="Description">
            {product.description || (
              <span className="text-muted-foreground">No description provided.</span>
            )}
          </Field>
        </div>
      </dl>

      <dl className="grid grid-cols-2 gap-5 border-t border-border pt-6">
        <Field label="Created">{formatDateTime(product.created_at)}</Field>
        <Field label="Last updated">{formatDateTime(product.updated_at)}</Field>
      </dl>
    </div>
  );
}
