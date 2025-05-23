import { motion, AnimatePresence } from 'framer-motion';
import { type BentoGridProps } from '@/app/types';
import { BentoItem as BentoItemComponent } from './BentoItem';

export function BentoGrid({ 
  items, 
  selectedCategory,
}: BentoGridProps) {
  // Encontrar o card de inscrição
  const subscriptionCard = items.find(item => item.isSubscription);
  
  // Filtrar os outros cards baseado na categoria
  const contentCards = items
    .filter(item => !item.isSubscription)
    .filter(item => !selectedCategory || item.categoryId === selectedCategory);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6"
    >
      <AnimatePresence mode="popLayout">
        {/* Cards de conteúdo */}
        {contentCards.map((item, index) => {
          let spanClass = '';
          if (index === 0) {
            spanClass = 'md:col-span-8 md:row-span-2'; // Primeiro card maior
          } else if (index === 1) {
            spanClass = 'md:col-span-4 md:row-span-2'; // Segundo card vertical
          } else {
            spanClass = 'md:col-span-4 md:row-span-1'; // Outros cards menores
          }

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.2,
                ease: "easeOut"
              }}
              className={`${spanClass} h-full min-h-[200px] md:min-h-[250px]`}
            >
              <BentoItemComponent
                item={item}
                index={index}
                className="h-full"
              />
            </motion.div>
          );
        })}

        {/* Card de inscrição */}
        {subscriptionCard && (
          <motion.div
            key="subscription"
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.2,
              ease: "easeOut"
            }}
            className={`col-span-2 md:col-span-${contentCards.length >= 3 ? '4' : '12'} h-full min-h-[120px]`}
          >
            <BentoItemComponent
              item={subscriptionCard}
              className="h-full shadow-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 