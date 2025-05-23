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
      className="mb-6 flex flex-wrap gap-2"
    >
      <motion.button
        variants={item}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onCategoryChange('')}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          !selectedCategory 
            ? 'bg-black text-white' 
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Todos
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category.id}
          variants={item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategoryChange(category.id)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selectedCategory === category.id
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </motion.div>
  );
} 