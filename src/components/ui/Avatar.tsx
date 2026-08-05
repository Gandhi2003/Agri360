import { useState } from 'react';
import { cn } from '@lib/cn';
import { formatInitials } from '@common/utils';

interface AvatarProps {
  src?: string;
  firstName?: string;
  lastName?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = { sm: 'size-8 text-xs', md: 'size-10 text-sm', lg: 'size-12 text-base' };

export function Avatar({ src, firstName, lastName, size = 'md', className }: AvatarProps) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-bold text-primary-foreground',
        sizes[size],
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={`${firstName ?? ''} ${lastName ?? ''}`.trim()}
          className="size-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        formatInitials(firstName, lastName)
      )}
    </span>
  );
}
