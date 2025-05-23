import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { type BentoGridProps, type AutoLayoutPattern, type BentoItem } from '@/app/types';
import { autoLayoutPatterns, themes, animationConfig } from '@/app/types';
import { BentoItem as BentoItemComponent } from './BentoItem';

export function BentoGrid({ 
  items, 
  selectedCategory,
  autoLayout = true,
  theme = 'light',
  gap = 'medium',
  animationDelay = 0.1,
  enableHover = true,
  maxItems,
  sortBy = 'priority',
  sortOrder = 'asc',
}: BentoGridProps) {
  // Separar o card de inscrição dos outros cards
  const subscriptionCard = items.find(item => item.isSubscription);
  const contentCards = items.filter(item => !item.isSubscription);

  // Filtrar e ordenar os cards de conteúdo
  const processedCards = useMemo(() => {
    let filtered = selectedCategory
      ? contentCards.filter((item) => item.categoryId === selectedCategory)
      : contentCards;

    // Aplicar limite máximo se especificado
    if (maxItems && maxItems > 0) {
      filtered = filtered.slice(0, maxItems);
    }

    // Ordenar os cards baseado na prioridade do autoLayoutPatterns
    filtered.sort((a, b) => {
      const indexA = parseInt(a.id) - 1;
      const indexB = parseInt(b.id) - 1;
      const patternA = autoLayoutPatterns[indexA] || autoLayoutPatterns[0];
      const patternB = autoLayoutPatterns[indexB] || autoLayoutPatterns[0];
      
      let comparison = 0;
      
      switch (sortBy) {
        case 'priority':
          comparison = patternA.priority - patternB.priority;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'date':
          comparison = new Date(a.date || '').getTime() - new Date(b.date || '').getTime();
          break;
        case 'category':
          comparison = a.categoryId.localeCompare(b.categoryId);
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [contentCards, selectedCategory, maxItems, sortBy, sortOrder]);

  // Aplicar autoLayout com TODAS as propriedades do padrão
  const cardsWithLayout = useMemo(() => {
    if (!autoLayout) return processedCards;

    return processedCards.map((item) => {
      // Usar o índice baseado no ID do card para manter consistência
      const cardIndex = parseInt(item.id) - 1;
      const pattern: AutoLayoutPattern = autoLayoutPatterns[cardIndex] || autoLayoutPatterns[0];
      
      // Mesclar item com TODAS as propriedades do padrão
      const enhancedItem: BentoItem & Partial<AutoLayoutPattern> = {
        ...item,
        // Layout
        colSpan: item.colSpan || pattern.col,
        rowSpan: item.rowSpan || pattern.row,
        
        // Propriedades visuais do padrão
        backgroundColor: pattern.backgroundColor,
        textColor: pattern.textColor,
        gradient: pattern.gradient,
        borderColor: pattern.borderColor,
        borderWidth: pattern.borderWidth,
        
        // Propriedades de imagem
        imageSize: pattern.imageSize,
        position: pattern.position,
        
        // Propriedades de texto
        titleSize: pattern.titleSize,
        descriptionSize: pattern.descriptionSize,
        
        // Propriedades de botão
        buttonText: pattern.buttonText,
        buttonVariant: pattern.buttonVariant,
        buttonColor: pattern.buttonColor,
        
        // Efeitos visuais
        hoverEffect: pattern.hoverEffect,
        shadow: pattern.shadow,
        rounded: pattern.rounded,
        
        // Metadados visuais
        icon: pattern.icon,
        badge: pattern.badge,
        badgeColor: pattern.badgeColor,
        
        // Controle de layout
        priority: pattern.priority,
        featured: pattern.featured,
        tailwindClasses: pattern.tailwindClasses,
      };
      
      return enhancedItem;
    });
  }, [processedCards, autoLayout]);

  // Classes de gap
  const gapClasses = {
    small: 'gap-2 md:gap-3',
    medium: 'gap-4 md:gap-6',
    large: 'gap-6 md:gap-8',
    xl: 'gap-8 md:gap-10',
  };

  // Tema atual
  const currentTheme = theme === 'auto' 
    ? themes.light // Por enquanto usar light como padrão para auto
    : themes[theme as 'light' | 'dark'] || themes.light;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Grid principal para os cards de conteúdo */}
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`grid grid-cols-2 md:grid-cols-12 auto-rows-[minmax(200px,auto)] ${gapClasses[gap]}`}
        style={{
          backgroundColor: currentTheme.background,
        }}
      >
        <AnimatePresence mode="popLayout">
          {cardsWithLayout.map((item, index) => {
            // Usar as classes Tailwind diretamente do padrão
            const spanClass = item.tailwindClasses || 'col-span-1 md:col-span-6 md:row-span-1';

            // Configuração de animação baseada no tipo
            const animConfig = animationConfig[item.animationType || 'scale'];

            return (
              <motion.div
                key={item.id}
                layout
                initial={animConfig.initial}
                animate={animConfig.animate}
                exit={animConfig.exit}
                transition={{ 
                  duration: 0.3,
                  ease: "easeOut",
                  delay: index * animationDelay,
                }}
                className={`${spanClass} h-full min-h-[200px] md:min-h-[250px]`}
              >
                <BentoItemComponent
                  item={item}
                  className="h-full"
                  enableHover={enableHover}
                  theme={theme}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Card de inscrição após o grid - também usa autoLayoutPatterns */}
      {subscriptionCard && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: cardsWithLayout.length * animationDelay + 0.2 }}
          className="w-full"
        >
          {(() => {
            // Aplicar padrão para o card de inscrição (índice 5 = card id '6')
            const subscriptionIndex = parseInt(subscriptionCard.id) - 1;
            const subscriptionPattern = autoLayoutPatterns[subscriptionIndex] || autoLayoutPatterns[5];
            
            const enhancedSubscriptionCard = {
              ...subscriptionCard,
              backgroundColor: subscriptionPattern.backgroundColor,
              textColor: subscriptionPattern.textColor,
              buttonText: subscriptionPattern.buttonText,
              buttonVariant: subscriptionPattern.buttonVariant,
              titleSize: subscriptionPattern.titleSize,
              hoverEffect: subscriptionPattern.hoverEffect,
              shadow: subscriptionPattern.shadow,
              icon: subscriptionPattern.icon,
              badge: subscriptionPattern.badge,
              badgeColor: subscriptionPattern.badgeColor,
            };
            
            return (
              <BentoItemComponent
                item={enhancedSubscriptionCard}
                className="max-w-4xl mx-auto shadow-2xl"
                enableHover={enableHover}
                theme={theme}
              />
            );
          })()}
        </motion.div>
      )}

      {/* Indicador de items filtrados */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-500 mt-4"
        >
          Mostrando {cardsWithLayout.length} {cardsWithLayout.length === 1 ? 'item' : 'itens'}
          {maxItems && cardsWithLayout.length >= maxItems && ` (limitado a ${maxItems})`}
        </motion.div>
      )}
    </div>
  );
} 