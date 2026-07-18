import type { ReactNode } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Avatar, Badge, Button, Drawer } from '@components';
import { formatDateTime } from '@common/utils';
import type { Profile } from '../types';
import { getProfileStatusVariant } from '../utils/profile.utils';

interface ProfileDetailDrawerProps {
  profile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (profile: Profile) => void;
  onDelete: (profile: Profile) => void;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{children}</dd>
    </div>
  );
}

/** Slide-over panel presenting the full details of a single Profile record. */
export function ProfileDetailDrawer({
  profile,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: ProfileDetailDrawerProps) {
  if (!profile) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Profile details"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            leftIcon={<Trash2 className="size-4" />}
            onClick={() => onDelete(profile)}
          >
            Delete
          </Button>
          <Button leftIcon={<Pencil className="size-4" />} onClick={() => onEdit(profile)}>
            Edit
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar firstName={profile.name} size="lg" />
          <div className="min-w-0 space-y-1">
            <h3 className="truncate text-lg font-semibold text-foreground">{profile.name}</h3>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">{profile.code}</span>
              <Badge variant={getProfileStatusVariant(profile.status)}>{profile.status}</Badge>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-5 border-t border-border pt-6">
          <Field label="Code">
            <span className="font-mono">{profile.code}</span>
          </Field>
          <Field label="Status">
            <Badge variant={getProfileStatusVariant(profile.status)}>{profile.status}</Badge>
          </Field>
          <div className="col-span-2">
            <Field label="Description">
              {profile.description ? (
                profile.description
              ) : (
                <span className="text-muted-foreground">No description provided.</span>
              )}
            </Field>
          </div>
          <Field label="Created">{formatDateTime(profile.createdAt)}</Field>
          <Field label="Last updated">{formatDateTime(profile.updatedAt)}</Field>
        </dl>
      </div>
    </Drawer>
  );
}
