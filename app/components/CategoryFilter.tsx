'use client';

import { motion } from 'framer-motion';
import { type Category } from '@/app/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
  onCategoryChange: (categoryId: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap gap-3 p-4 mb-4"
    >
      <motion.button
        variants={item}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCategoryChange('')}
        className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all
          ${!selectedCategory 
            ? 'bg-foreground text-background shadow-lg' 
            : 'bg-background/50 text-foreground hover:bg-background/80 hover:shadow'
          }`}
      >
        Todos
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category.id}
          variants={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all
            ${selectedCategory === category.id
              ? 'bg-foreground text-background shadow-lg'
              : 'bg-background/50 text-foreground hover:bg-background/80 hover:shadow'
            }`}
        >
          {category.name}
        </motion.button>
      ))}
    </motion.div>
  );
} 