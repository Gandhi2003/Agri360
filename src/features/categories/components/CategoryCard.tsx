import { MoreHorizontal, Pencil, Tag, Trash2 } from 'lucide-react';
import { Badge, Button, Card, Dropdown } from '@components';
import { formatDate } from '@common/utils';
import type { Category } from '../types';
import { getCategoryStatusVariant } from '../utils/categories.utils';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  return (
    <Card
      onClick={() => onEdit(category)}
      className="group flex cursor-pointer flex-col p-5 transition-all hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Tag className="size-5" />
        </span>
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Badge variant={getCategoryStatusVariant(category.status)}>{category.status}</Badge>
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

      <div className="mt-4 min-w-0 space-y-1">
        <h3 className="truncate font-semibold text-foreground group-hover:text-primary">
          {category.name}
        </h3>
        <p className="font-mono text-xs text-muted-foreground">{category.code}</p>
      </div>

      <p className="mt-2 line-clamp-2 min-h-10 text-sm text-muted-foreground">
        {category.description || 'No description provided.'}
      </p>

      <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
        Updated {formatDate(category.updatedAt)}
      </div>
    </Card>
  );
}
