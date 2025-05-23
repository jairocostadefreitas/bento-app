'use client';

import { useState } from 'react';
import { type BentoItem, type Category } from './types';
import { BentoGrid } from './components/bento-grid/BentoGrid';
import { CategoryFilter } from './components/CategoryFilter';

const categories: Category[] = [
  { id: 'fitness', name: 'Fitness' },
  { id: 'saude', name: 'Saúde' },
  { id: 'bem-estar', name: 'Bem-estar' },
];

const items: BentoItem[] = [
  {
    id: '1',
    title: 'Treino Funcional',
    description: 'Descubra o poder do treino funcional para um corpo mais forte e saudável. Exercícios que simulam movimentos do dia a dia.',
    categoryId: 'fitness',
    featured: true,
    image: '/imagens/workout-6972949_1280.png',
  },
  {
    id: '2',
    title: 'Equilíbrio e Saúde',
    description: 'Mantenha seu peso ideal e uma vida equilibrada. Dicas e orientações para uma vida mais saudável.',
    categoryId: 'saude',
    featured: true,
    image: '/imagens/scale-149033_1280.png',
  },
  {
    id: '3',
    title: 'Bem-estar Feminino',
    description: 'Cuide do seu corpo e mente com nossas dicas especiais para o bem-estar feminino.',
    categoryId: 'bem-estar',
    image: '/imagens/women-5635784_1280.png',
  },
  {
    id: '4',
    title: 'Saúde Integral',
    description: 'A importância de manter um corpo saudável através de exercícios e boa alimentação.',
    categoryId: 'saude',
    image: '/imagens/body-8782319_1280.png',
  },
  {
    id: '5',
    title: 'Fitness Feminino',
    description: 'Programas de treino especialmente desenvolvidos para mulheres que buscam uma vida mais ativa.',
    categoryId: 'fitness',
    image: '/imagens/womenn-5635784_1280.png',
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-foreground">
          Saúde e Bem-estar
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
