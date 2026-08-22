import type { ReactNode } from 'react';
import { Avatar } from '@components';
import { formatDateTime } from '@common/utils';
import type { Dealer } from '../types';

interface DealerDetailsProps {
  dealer: Dealer;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{children}</dd>
    </div>
  );
}

export function DealerDetails({ dealer }: DealerDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar firstName={dealer.name} size="lg" />
        <div className="min-w-0 space-y-1">
          <h3 className="truncate text-lg font-semibold text-foreground">{dealer.name}</h3>
          <p className="truncate text-sm text-muted-foreground">{dealer.company || '—'}</p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-5 border-t border-border pt-6">
        <Field label="Email">{dealer.email || '—'}</Field>
        <Field label="Phone">{dealer.phone || '—'}</Field>
        <Field label="Region">{dealer.region || '—'}</Field>
        <Field label="GST Number">
          <span className="font-mono">{dealer.gst_number || '—'}</span>
        </Field>
      </dl>

      {dealer.owner && (
        <div className="rounded-md border border-border bg-muted/40 p-3.5">
          <p className="mb-2 text-xs font-bold text-[#1d252db3]">Owner</p>
          <p className="text-sm font-medium text-foreground">{dealer.owner.full_name}</p>
          <p className="text-sm text-muted-foreground">{dealer.owner.email}</p>
        </div>
      )}

      <dl className="grid grid-cols-2 gap-5 border-t border-border pt-6">
        <Field label="Created">{formatDateTime(dealer.created_at)}</Field>
        <Field label="Last updated">{formatDateTime(dealer.updated_at)}</Field>
      </dl>
    </div>
  );
}
