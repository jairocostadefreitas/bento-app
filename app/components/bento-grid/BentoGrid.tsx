import { motion, AnimatePresence } from 'framer-motion';
import { type BentoGridProps } from '@/app/types';
import { BentoItem as BentoItemComponent } from './BentoItem';

export function BentoGrid({ 
  items, 
  selectedCategory,
}: BentoGridProps) {
  // Separar o card de inscrição dos outros cards
  const subscriptionCard = items.find(item => item.isSubscription);
  const contentCards = items.filter(item => !item.isSubscription);

  // Filtrar apenas os cards de conteúdo
  const filteredContentCards = selectedCategory
    ? contentCards.filter((item) => item.categoryId === selectedCategory)
    : contentCards;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Grid principal para os cards de conteúdo */}
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredContentCards.map((item, index) => {
            // Definir classes de span baseadas no índice para criar um layout mais dinâmico
            let spanClass = '';
            if (index === 0) {
              spanClass = 'md:col-span-8 md:row-span-2'; // Primeiro card maior
            } else if (index === 1) {
              spanClass = 'md:col-span-4 md:row-span-2'; // Segundo card vertical
            } else if (index === 3) {
              spanClass = 'md:col-span-6 md:row-span-1'; // terceiro card maior
            } else {
              spanClass = 'md:col-span-3 md:row-span-1'; // Outros cards menores
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
        </AnimatePresence>
      </motion.div>

      {/* Card de inscrição após o grid */}
      {subscriptionCard && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <BentoItemComponent
            item={subscriptionCard}
            className="max-w-4xl mx-auto shadow-2xl"
          />
        </motion.div>
      )}
    </div>
  );
} 