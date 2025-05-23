'use client';

import { motion } from 'framer-motion';
import { type Category } from '@/app/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
  onCategoryChange: (categoryId: string) => void;
  showCount?: boolean;
  itemCounts?: Record<string, number>;
  variant?: 'default' | 'pills' | 'tabs';
  size?: 'sm' | 'md' | 'lg';
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
  showCount = false,
  itemCounts = {},
  variant = 'default',
  size = 'md',
}: CategoryFilterProps) {
  
  // Classes baseadas no tamanho
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1 text-xs';
      case 'lg':
        return 'px-6 py-3 text-base';
      default:
        return 'px-4 py-1.5 text-sm';
    }
  };

  // Classes baseadas na variante
  const getVariantClasses = (isSelected: boolean, category?: Category) => {
    const baseClasses = `${getSizeClasses()} font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1`;
    
    switch (variant) {
      case 'pills':
        return `${baseClasses} rounded-full ${
          isSelected 
            ? `bg-black text-white shadow-lg transform scale-105` 
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:scale-102'
        }`;
      case 'tabs':
        return `${baseClasses} rounded-t-lg border-b-2 ${
          isSelected 
            ? 'bg-white text-black border-black shadow-sm' 
            : 'bg-transparent text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
        }`;
      default:
        return `${baseClasses} rounded-full ${
          isSelected 
            ? `text-white shadow-lg transform scale-105` 
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:scale-102'
        }`;
    }
  };

  // Obter cor de fundo para categoria selecionada
  const getSelectedBackground = (category?: Category) => {
    if (variant === 'default' && category?.color) {
      return { backgroundColor: category.color };
    }
    return {};
  };

  const totalCount = Object.values(itemCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="mb-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`flex flex-wrap gap-2 ${variant === 'tabs' ? 'border-b border-gray-200' : ''}`}
      >
        {/* Botão "Todos" */}
        <motion.button
          variants={item}
          whileHover={{ scale: variant === 'tabs' ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategoryChange('')}
          className={getVariantClasses(!selectedCategory)}
          style={!selectedCategory ? getSelectedBackground() : {}}
          aria-label="Mostrar todos os itens"
        >
          <span className="flex items-center gap-2">
            <span>Todos</span>
            {showCount && (
              <span className="text-xs opacity-75 bg-white/20 px-2 py-0.5 rounded-full">
                {totalCount}
              </span>
            )}
          </span>
        </motion.button>

        {/* Botões das categorias */}
        {categories.map((category) => (
          <motion.button
            key={category.id}
            variants={item}
            whileHover={{ scale: variant === 'tabs' ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategoryChange(category.id)}
            className={getVariantClasses(selectedCategory === category.id, category)}
            style={selectedCategory === category.id ? getSelectedBackground(category) : {}}
            aria-label={`Filtrar por ${category.name}`}
          >
            <span className="flex items-center gap-2">
              {/* Ícone da categoria */}
              {category.icon && (
                <span className="text-base" role="img" aria-hidden="true">
                  {category.icon}
                </span>
              )}
              
              <span>{category.name}</span>
              
              {/* Contador de itens */}
              {showCount && itemCounts[category.id] !== undefined && (
                <span className="text-xs opacity-75 bg-white/20 px-2 py-0.5 rounded-full">
                  {itemCounts[category.id]}
                </span>
              )}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Descrição da categoria selecionada */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3"
        >
          {categories.find(cat => cat.id === selectedCategory)?.description && (
            <p className="text-sm text-gray-600 italic">
              {categories.find(cat => cat.id === selectedCategory)?.description}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
} 