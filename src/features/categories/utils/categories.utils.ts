import type { BadgeProps } from '@components';
import { CategoryStatus } from '../types';

/** Maps a Category lifecycle status to a Badge variant for consistent color coding. */
export const getCategoryStatusVariant = (status: CategoryStatus): BadgeProps['variant'] => {
  switch (status) {
    case CategoryStatus.Active:
      return 'success';
    case CategoryStatus.Pending:
      return 'warning';
    case CategoryStatus.Archived:
      return 'danger';
    case CategoryStatus.Inactive:
    default:
      return 'outline';
  }
};
