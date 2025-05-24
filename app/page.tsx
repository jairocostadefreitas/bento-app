'use client';

import { useState, useMemo } from 'react';
import { type BentoItem, type Category } from './types';
import { BentoGrid } from './components/bento-grid/BentoGrid';
import { CategoryFilter } from './components/CategoryFilter';
import { SearchBar } from './components/SearchBar';

const categories: Category[] = [
  { 
    id: 'fitness', 
    name: 'Fitness', 
    description: 'Exercícios e treinos para manter-se em forma',
    color: '#E6007E',
    icon: '💪'
  },
  { 
    id: 'saude', 
    name: 'Saúde', 
    description: 'Dicas e informações sobre saúde e bem-estar',
    color: '#5CB85C',
    icon: '🏥'
  },
  { 
    id: 'bem-estar', 
    name: 'Bem-estar', 
    description: 'Cuidados com corpo e mente para uma vida equilibrada',
    color: '#00BFA5',
    icon: '🧘'
  },
  { 
    id: 'medicina', 
    name: 'Medicina', 
    description: 'Informações médicas e cuidados de saúde profissionais',
    color: '#FF6B6B',
    icon: '⚕️'
  },
];

// CARDS SIMPLIFICADOS - Propriedades visuais agora vêm do autoLayoutPatterns
// Para alterar aparência, cores, layout, etc., modifique o arquivo app/types/index.ts
const items: BentoItem[] = [
  {
    id: '1',
    title: 'Treino Funcional',
    description: 'Descubra o poder do treino funcional para um corpo mais forte e saudável.',
    categoryId: 'fitness',
    image: '/imagens/workout-6972949_1280.png',
    tags: ['treino', 'funcional', 'força'],
    author: 'Dr. Silva',
    date: '2024-01-15',
    readTime: '5 min',
  },
  {
    id: '2',
    title: 'Equilíbrio e Saúde',
    description: 'Mantenha seu peso ideal e uma vida equilibrada com nossas dicas especializadas.',
    categoryId: 'saude',
    image: '/imagens/scale-149033_1280.png',
    tags: ['peso', 'equilíbrio', 'saúde'],
    author: 'Nutricionista Ana',
    date: '2024-01-12',
    readTime: '3 min',
  },
  {
    id: '3',
    title: 'Bem-estar Feminino',
    description: 'Cuide do seu corpo e mente com práticas especialmente desenvolvidas para mulheres.',
    categoryId: 'bem-estar',
    image: '/imagens/women-5635784_1280.png',
    tags: ['mulher', 'autocuidado', 'bem-estar'],
    author: 'Dra. Maria',
    date: '2024-01-10',
    readTime: '4 min',
  },
  {
    id: '4',
    title: 'Saúde Integral',
    description: 'A importância de manter um corpo saudável através de hábitos integrados.',
    categoryId: 'saude',
    image: '/imagens/body-8782319_1280.png',
    tags: ['saúde', 'integral', 'hábitos'],
    author: 'Dr. João',
    date: '2024-01-08',
    readTime: '6 min',
  },
  {
    id: '5',
    title: 'Fitness Feminino',
    description: 'Programas de treino especialmente desenvolvidos para o público feminino.',
    categoryId: 'fitness',
    image: '/imagens/womenn-5635784_1280.png',
    tags: ['fitness', 'mulher', 'treino'],
    author: 'Personal Trainer Carol',
    date: '2024-01-05',
    readTime: '4 min',
  },
  {
    id: '6',
    title: 'Receba nossas novidades',
    description: 'Inscreva-se para receber dicas e conteúdos exclusivos sobre saúde e bem-estar diretamente no seu email.',
    categoryId: 'bem-estar',
    isSubscription: true,
  },
  {
    id: '7',
    title: 'Emergências Médicas',
    description: 'Saiba como agir em situações de emergência e quando procurar ajuda médica.',
    categoryId: 'medicina',
    image: '/imagens/ambulance.png',
    tags: ['emergência', 'primeiros socorros', 'urgência'],
    author: 'Dr. Carlos',
    date: '2024-01-20',
    readTime: '7 min',
  },
  {
    id: '8',
    title: 'Saúde do Coração',
    description: 'Monitore sua saúde cardiovascular e aprenda sobre prevenção de doenças cardíacas.',
    categoryId: 'saude',
    image: '/imagens/heart-2658206_1280.png',
    tags: ['coração', 'cardiovascular', 'prevenção'],
    author: 'Cardiologista Dr. Pedro',
    date: '2024-01-18',
    readTime: '8 min',
  },
  {
    id: '9',
    title: 'Monitoramento de Saúde',
    description: 'Acompanhe seus sinais vitais e mantenha um controle regular da sua saúde.',
    categoryId: 'medicina',
    image: '/imagens/pulse.jpg',
    tags: ['monitoramento', 'sinais vitais', 'controle'],
    author: 'Enfermeira Ana',
    date: '2024-01-16',
    readTime: '5 min',
  },
  {
    id: '10',
    title: 'Cuidados Médicos',
    description: 'Entenda a importância dos check-ups regulares e cuidados médicos preventivos.',
    categoryId: 'medicina',
    image: '/imagens/hospital medico.png',
    tags: ['check-up', 'prevenção', 'médico'],
    author: 'Dr. Roberto',
    date: '2024-01-14',
    readTime: '6 min',
  },
  {
    id: '11',
    title: 'Consulta Médica',
    description: 'Prepare-se para suas consultas médicas e tire o máximo proveito do atendimento.',
    categoryId: 'medicina',
    image: '/imagens/doctor-9301660_1280.jpg',
    tags: ['consulta', 'médico', 'atendimento'],
    author: 'Dra. Fernanda',
    date: '2024-01-13',
    readTime: '4 min',
  },
  {
    id: '12',
    title: 'Saúde da Família',
    description: 'Cuidados de saúde para toda a família, desde crianças até idosos.',
    categoryId: 'saude',
    image: '/imagens/family.jpg',
    tags: ['família', 'cuidados', 'todas idades'],
    author: 'Pediatra Dra. Lucia',
    date: '2024-01-11',
    readTime: '9 min',
  },
  {
    id: '13',
    title: 'Tecnologia em Saúde',
    description: 'Descubra como a inteligência artificial está revolucionando os cuidados médicos.',
    categoryId: 'medicina',
    image: '/imagens/ai-generated-9106907_1280.jpg',
    tags: ['tecnologia', 'IA', 'inovação'],
    author: 'Tech Dr. Alex',
    date: '2024-01-09',
    readTime: '10 min',
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtrar itens por busca
  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    
    return items.filter(item => 
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some(tag => tag?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.author?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Calcular contadores por categoria
  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    filteredItems.filter(item => !item.isSubscription).forEach(item => {
      counts[item.categoryId] = (counts[item.categoryId] || 0) + 1;
    });
    
    return counts;
  }, [filteredItems]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Saúde e Bem-estar
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra conteúdos exclusivos sobre fitness, saúde e bem-estar para transformar sua vida
          </p>
        </div>
       
        {/* Controles */}
        <div className="mb-8 space-y-4">
          {/* Barra de busca */}
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Buscar por título, descrição, tags ou autor..."
            className="max-w-md mx-auto"
          />

          {/* Filtro de categorias */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showCount={true}
            itemCounts={itemCounts}
            variant="default"
            size="md"
          />
        </div>

        {/* Resultados da busca */}
        {searchQuery && (
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-600">
              {filteredItems.filter(item => !item.isSubscription).length} resultado(s) encontrado(s) para {`"${searchQuery}"`}
            </p>
          </div>
        )}
 <div className="mb-8 text-center border-2 border-gray-300 rounded-lg p-4 min-h-96">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          artigos, dicas e notícias sobre saúde e bem-estar
          </h1>
       
        {/* Grid de conteúdo */}
        <BentoGrid
          items={filteredItems}
          categories={categories}
          selectedCategory={selectedCategory}
          autoLayout={true}
          theme="light"
          gap="medium"
          animationDelay={0.1}
          enableHover={true}
          sortBy="priority"
          sortOrder="asc"
        />
 </div>
        {/* Rodapé */}
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 Saúde e Bem-estar. Todos os direitos reservados.</p>
        </footer>
      </div>
    </main>
  );
}
