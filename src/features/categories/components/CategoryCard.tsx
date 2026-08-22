import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Badge, Button, Card, Dropdown } from '@components';
import { formatDate } from '@common/utils';
import { cn } from '@lib/cn';
import type { Category } from '../types';
import { getCategoryAccentColor, getCategoryIcon } from '../utils/categories.utils';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  const accent = getCategoryAccentColor(category);
  const Icon = getCategoryIcon(category);

  return (
    <Card className="group relative flex flex-col overflow-hidden p-5 pb-4 transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              'flex size-11 shrink-0 items-center justify-center rounded-xl text-white',
              accent.icon,
            )}
          >
            <Icon className="size-5" />
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-foreground">{category.name}</h3>
          </div>
        </div>
        <Dropdown
          trigger={
            <Button variant="ghost" size="sm" aria-label="Category actions">
              <MoreHorizontal className="size-4" />
            </Button>
          }
          items={[
            {
              label: 'Edit',
              icon: <Pencil className="size-4" />,
              onClick: () => onEdit(category),
            },
            {
              label: 'Delete',
              icon: <Trash2 className="size-4" />,
              danger: true,
              onClick: () => onDelete(category),
            },
          ]}
        />
      </div>

      <p className="mt-3 line-clamp-2 min-h-10 text-sm text-muted-foreground">
        {category.description || 'No description provided.'}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <span>Updated {formatDate(category.updated_at)}</span>
        <Badge variant={category.is_active ? 'success' : 'outline'}>
          {category.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      <span className={cn('absolute inset-x-0 bottom-0 h-1', accent.bar)} />
    </Card>
  );
}
