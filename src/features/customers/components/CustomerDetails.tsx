import type { ReactNode } from 'react';
import { Avatar } from '@components';
import { formatDateTime } from '@common/utils';
import type { Customer } from '../types';

interface CustomerDetailsProps {
  customer: Customer;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{children}</dd>
    </div>
  );
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar firstName={customer.name} size="lg" />
        <div className="min-w-0 space-y-1">
          <h3 className="truncate text-lg font-semibold text-foreground">{customer.name}</h3>
          <p className="truncate text-sm text-muted-foreground">{customer.company || '—'}</p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-5 border-t border-border pt-6">
        <Field label="Email">{customer.email || '—'}</Field>
        <Field label="Phone">{customer.phone || '—'}</Field>
        <Field label="Country">{customer.country || '—'}</Field>
      </dl>

      {customer.owner && (
        <div className="rounded-md border border-border bg-muted/40 p-3.5">
          <p className="mb-2 text-xs font-bold text-[#1d252db3]">Owner</p>
          <p className="text-sm font-medium text-foreground">{customer.owner.full_name}</p>
          <p className="text-sm text-muted-foreground">{customer.owner.email}</p>
        </div>
      )}

      <dl className="grid grid-cols-2 gap-5 border-t border-border pt-6">
        <Field label="Created">{formatDateTime(customer.created_at)}</Field>
        <Field label="Last updated">{formatDateTime(customer.updated_at)}</Field>
      </dl>
    </div>
  );
}
