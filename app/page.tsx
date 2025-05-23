'use client';

import { useState } from 'react';
import { type BentoItem, type Category } from './types';
import { BentoGrid } from './components/bento-grid/BentoGrid';
import { CategoryFilter } from './components/CategoryFilter';

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
    description: 'Dashboard moderno construído com Next.js e TailwindCSS',
    categoryId: 'web',
    featured: true,
    image: '/images/dashboard.jpg',
  },
  {
    id: '2',
    title: 'App Mobile React Native',
    description: 'Aplicativo móvel multiplataforma com React Native',
    categoryId: 'mobile',
    image: '/images/mobile-app.jpg',
  },
  {
    id: '3',
    title: 'Design System',
    description: 'Sistema de design unificado para produtos digitais',
    categoryId: 'design',
    featured: true,
    image: '/images/design-system.jpg',
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-foreground">
          Projetos em Destaque
        </h1>
        
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
      </div>
    </main>
  );
}
