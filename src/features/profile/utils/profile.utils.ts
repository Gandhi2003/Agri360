import type { BadgeProps } from '@components';
import { ProfileStatus } from '../types';

/** Maps a Profile lifecycle status to a Badge variant for consistent color coding. */
export const getProfileStatusVariant = (status: ProfileStatus): BadgeProps['variant'] => {
  switch (status) {
    case ProfileStatus.Active:
      return 'success';
    case ProfileStatus.Pending:
      return 'warning';
    case ProfileStatus.Archived:
      return 'danger';
    case ProfileStatus.Inactive:
    default:
      return 'outline';
  }
};
