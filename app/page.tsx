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
    description: 'Descubra o poder do treino funcional para um corpo mais forte e saudável.',
    categoryId: 'fitness',
    image: '/imagens/workout-6972949_1280.png',
    backgroundColor: '#E6007E',
    textColor: 'white',
    buttonText: '+ Saiba mais',
  },
  {
    id: '2',
    title: 'Equilíbrio e Saúde',
    description: 'Mantenha seu peso ideal e uma vida equilibrada.',
    categoryId: 'saude',
    image: '/imagens/scale-149033_1280.png',
    backgroundColor: '#5CB85C',
    textColor: 'white',
    buttonText: '+ Saiba mais',
  },
  {
    id: '3',
    title: 'Bem-estar Feminino',
    description: 'Cuide do seu corpo e mente.',
    categoryId: 'bem-estar',
    image: '/imagens/women-5635784_1280.png',
    backgroundColor: '#00BFA5',
    textColor: 'white',
    buttonText: '+ Saiba mais',
  },
  {
    id: '4',
    title: 'Saúde Integral',
    description: 'A importância de manter um corpo saudável.',
    categoryId: 'saude',
    image: '/imagens/body-8782319_1280.png',
    backgroundColor: '#1E4C9A',
    textColor: 'white',
    buttonText: '+ Saiba mais',
  },
  {
    id: '5',
    title: 'Fitness Feminino',
    description: 'Programas de treino para mulheres.',
    categoryId: 'fitness',
    image: '/imagens/womenn-5635784_1280.png',
    backgroundColor: '#03A9F4',
    textColor: 'white',
    buttonText: '+ Saiba mais',
  },
  {
    id: '6',
    title: 'Receba nossas novidades',
    description: 'Inscreva-se para receber dicas e conteúdos exclusivos sobre saúde e bem-estar.',
    categoryId: 'bem-estar',
    buttonText: 'Inscrever-se',
    backgroundColor: '#111111',
    textColor: 'white',
    isSubscription: true,
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">
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
          autoLayout={true}
        />
      </div>
    </main>
  );
}
