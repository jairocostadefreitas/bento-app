'use client';

import { type Category } from '@/app/types';

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
    <div className="flex flex-wrap gap-2 p-4">
      <button
        onClick={() => onCategoryChange('')}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors
          ${!selectedCategory 
            ? 'bg-foreground text-background' 
            : 'bg-background/50 text-foreground hover:bg-background/80'
          }`}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors
            ${selectedCategory === category.id
              ? 'bg-foreground text-background'
              : 'bg-background/50 text-foreground hover:bg-background/80'
            }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
} 