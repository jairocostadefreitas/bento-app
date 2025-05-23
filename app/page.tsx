'use client';

import { useState } from 'react';
import { type BentoItem, type Category } from './types';
import { BentoGrid } from './components/ui/bento-grid';
import { CategoryFilter } from './components/ui/category-filter';

// Dados de exemplo - em produção, isso viria de uma API ou CMS
const categories: Category[] = [
  { id: 'web', name: 'Web Development' },
  { id: 'mobile', name: 'Mobile Apps' },
  { id: 'design', name: 'Design' },
];

const items: BentoItem[] = [
  {
    id: '1',
    title: 'Next.js Dashboard',
    description: 'Modern dashboard built with Next.js and TailwindCSS',
    categoryId: 'web',
    featured: true,
    image: '/images/dashboard.jpg',
  },
  // Adicione mais itens conforme necessário
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Projetos em Destaque</h1>
      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <BentoGrid
        items={items}
        categories={categories}
        selectedCategory={selectedCategory}
      />
    </main>
  );
}
