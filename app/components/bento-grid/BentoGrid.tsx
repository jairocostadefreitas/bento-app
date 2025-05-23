import { motion, AnimatePresence } from 'framer-motion';
import { type BentoGridProps } from '@/app/types';
import { BentoItem } from './BentoItem';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function BentoGrid({ items, selectedCategory }: BentoGridProps) {
  const filteredItems = selectedCategory
    ? items.filter((item) => item.categoryId === selectedCategory)
    : items;

  return (
    <motion.div
      layout
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
    >
      <AnimatePresence mode="popLayout">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <BentoItem
              item={item}
              className={item.featured ? 'md:col-span-2 md:row-span-2' : ''}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
} 