'use client';

import { type Category } from '@/app/types';
import { cn } from '@/app/lib/utils';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onCategoryChange('')}
        className={cn(
          'px-4 py-2 rounded-lg transition-colors',
          'hover:bg-foreground/10',
          !selectedCategory && 'bg-foreground/10'
        )}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            'px-4 py-2 rounded-lg transition-colors',
            'hover:bg-foreground/10',
            selectedCategory === category.id && 'bg-foreground/10'
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
} 