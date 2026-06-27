import { useCallback } from 'react';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { ApiError } from '@common/types';
import { normalizeError } from '@common/api';

/**
 * Maps a normalized API validation error (422) onto react-hook-form fields,
 * so server-side validation surfaces inline next to the relevant inputs.
 */
export function useFormErrors<T extends FieldValues>(setError: UseFormSetError<T>) {
  return useCallback(
    (error: unknown): ApiError => {
      const normalized = normalizeError(error);
      if (normalized.details) {
        for (const [field, messages] of Object.entries(normalized.details)) {
          setError(field as Path<T>, { type: 'server', message: messages[0] });
        }
      }
      return normalized;
    },
    [setError],
  );
}
