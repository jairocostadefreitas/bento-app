import { type BentoGridProps, type BentoItem } from '@/app/types';
import { BentoCard } from './bento-card';

export function BentoGrid({ items, selectedCategory }: BentoGridProps) {
  const filteredItems = selectedCategory
    ? items.filter((item) => item.categoryId === selectedCategory)
    : items;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredItems.map((item) => (
        <BentoCard
          key={item.id}
          item={item}
          className={item.featured ? 'md:col-span-2 md:row-span-2' : ''}
        />
      ))}
    </div>
  );
} 