import { useRef, useState, type DragEvent } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@lib/cn';

interface FileUploadProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  hint?: string;
  className?: string;
}

/** Drag-and-drop + click file picker. */
export function FileUpload({
  onFiles,
  accept,
  multiple = false,
  label = 'Click to upload or drag and drop',
  hint,
  className,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const emit = (list: FileList | null) => {
    if (list && list.length) onFiles(Array.from(list));
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    emit(e.dataTransfer.files);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray5 bg-muted/30 p-8 text-center transition-colors hover:border-primary/50',
        dragging && 'border-primary bg-primary/5',
        className,
      )}
    >
      <Upload className="size-7 text-muted-foreground" />
      <p className="text-xs font-bold text-[#1d252db3]">{label}</p>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => emit(e.target.files)}
      />
    </div>
  );
}
