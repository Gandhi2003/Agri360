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

// One color per letter, A–Z, so no two letters collide.
const bgVariants = [
  'bg-[#198754] text-white', // A
  'bg-[#2563eb] text-white', // B
  'bg-[#d97706] text-white', // C
  'bg-[#dc2626] text-white', // D
  'bg-[#9f57bd] text-white', // E
  'bg-[#3498db] text-white', // F
  'bg-[#f3712b] text-white', // G
  'bg-[#da58c4] text-white', // H
  'bg-[#24d1ad] text-white', // I
  'bg-[#a1620a] text-white', // J
  'bg-[#4c36c3] text-white', // K
  'bg-[#0c8021] text-white', // L
  'bg-[#5654d4] text-white', // M
  'bg-[#e9497f] text-white', // N
  'bg-[#d12424] text-white', // O
  'bg-[#f0bd18] text-white', // P
  'bg-[#444584] text-white', // Q
  'bg-[#1e2e5a] text-white', // R
  'bg-[#bb2230] text-white', // S
  'bg-[#4f7942] text-white', // T
  'bg-[#d70040] text-white', // U
  'bg-[#239cdc] text-white', // V
  'bg-[#64a450] text-white', // W
  'bg-[#073073] text-white', // X
  'bg-[#f3603c] text-white', // Y
  'bg-[#17803d] text-white', // Z
];

function pickBgVariant(name: string) {
  const letter = name.trim().charAt(0).toUpperCase();
  const code = letter ? letter.charCodeAt(0) - 'A'.charCodeAt(0) : 0;
  return bgVariants[((code % bgVariants.length) + bgVariants.length) % bgVariants.length];
}

export function Avatar({ src, firstName, lastName, size = 'md', className }: AvatarProps) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-bold',
        pickBgVariant(`${firstName ?? ''}${lastName ?? ''}`),
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
