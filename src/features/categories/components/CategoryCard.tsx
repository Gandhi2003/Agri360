import { MoreHorizontal, Pencil, Tag, Trash2 } from 'lucide-react';
import { Button, Card, Dropdown, Switch } from '@components';
import { formatDate } from '@common/utils';
import { cn } from '@lib/cn';
import { CategoryStatus, type Category } from '../types';
import { getCategoryAccentColor } from '../utils/categories.utils';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onToggleStatus: (category: Category) => void;
  isTogglingStatus?: boolean;
}

export function CategoryCard({
  category,
  onEdit,
  onDelete,
  onToggleStatus,
  isTogglingStatus,
}: CategoryCardProps) {
  const accent = getCategoryAccentColor(category);

  return (
    <Card
      onClick={() => onEdit(category)}
      className="group relative flex cursor-pointer flex-col overflow-hidden p-5 pb-4 transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              'flex size-11 shrink-0 items-center justify-center rounded-xl text-white',
              accent.icon,
            )}
          >
            <Tag className="size-5" />
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-foreground group-hover:text-primary">
              {category.name}
            </h3>
            <p className="truncate font-mono text-xs text-muted-foreground">{category.code}</p>
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
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
      </div>

      <p className="mt-3 line-clamp-2 min-h-10 text-sm text-muted-foreground">
        {category.description || 'No description provided.'}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <span>Updated {formatDate(category.updatedAt)}</span>
        <Switch
          checked={category.status === CategoryStatus.Active}
          disabled={isTogglingStatus}
          onClick={(e) => e.stopPropagation()}
          onChange={() => onToggleStatus(category)}
          aria-label={`Toggle ${category.name} status`}
        />
      </div>

      <span className={cn('absolute inset-x-0 bottom-0 h-1', accent.bar)} />
    </Card>
  );
}
