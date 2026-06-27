import { useEffect, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { cn } from '@lib/cn';
import { FileUpload } from './FileUpload';

interface ImageUploadProps {
  value?: string;
  onChange: (file: File | null) => void;
  className?: string;
}

/** Single-image picker with live preview. */
export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(value);

  useEffect(
    () => () => {
      if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  const handleFiles = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  if (preview) {
    return (
      <div className={cn('relative w-40', className)}>
        <img src={preview} alt="Preview" className="h-40 w-40 rounded-lg object-cover" />
        <button
          type="button"
          onClick={() => {
            setPreview(undefined);
            onChange(null);
          }}
          className="absolute -right-2 -top-2 rounded-full bg-danger p-1 text-white shadow"
          aria-label="Remove image"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      <FileUpload
        accept="image/*"
        onFiles={handleFiles}
        label="Upload image"
        hint="PNG, JPG up to 5MB"
      />
      <ImagePlus className="sr-only" />
    </div>
  );
}
