import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type BentoItem } from '@/app/types';

// Função para combinar classes CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Função para filtrar itens por busca
export function filterItemsBySearch(items: BentoItem[], query: string): BentoItem[] {
  if (!query.trim()) return items;
  
  const searchTerm = query.toLowerCase().trim();
  
  return items.filter(item => 
    item.title.toLowerCase().includes(searchTerm) ||
    item.description?.toLowerCase().includes(searchTerm) ||
    item.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    item.author?.toLowerCase().includes(searchTerm) ||
    item.categoryId.toLowerCase().includes(searchTerm)
  );
}

// Função para ordenar itens
export function sortItems(
  items: BentoItem[], 
  sortBy: 'date' | 'priority' | 'title' | 'category',
  sortOrder: 'asc' | 'desc' = 'asc'
): BentoItem[] {
  return [...items].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'priority':
        comparison = (a.priority || 999) - (b.priority || 999);
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title, 'pt-BR');
        break;
      case 'date':
        const dateA = new Date(a.date || '').getTime();
        const dateB = new Date(b.date || '').getTime();
        comparison = dateA - dateB;
        break;
      case 'category':
        comparison = a.categoryId.localeCompare(b.categoryId, 'pt-BR');
        break;
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });
}

// Função para calcular contadores por categoria
export function calculateCategoryCounts(items: BentoItem[]): Record<string, number> {
  const counts: Record<string, number> = {};
  
  items.filter(item => !item.isSubscription).forEach(item => {
    counts[item.categoryId] = (counts[item.categoryId] || 0) + 1;
  });
  
  return counts;
}

// Função para gerar cores aleatórias para categorias
export function generateCategoryColor(index: number): string {
  const colors = [
    '#E6007E', '#5CB85C', '#00BFA5', '#03A9F4', '#FF9800',
    '#9C27B0', '#F44336', '#2196F3', '#4CAF50', '#FF5722'
  ];
  return colors[index % colors.length];
}

// Função para formatar data
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

// Função para truncar texto
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Função para validar URL de imagem
export function isValidImageUrl(url: string): boolean {
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
  } catch {
    return false;
  }
}

// Função para gerar slug a partir do título
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}

// Função para detectar tema do sistema
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Função para debounce (útil para busca)
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Função para verificar se um item está em destaque
export function isFeaturedItem(item: BentoItem): boolean {
  return item.featured === true || item.priority === 1 || item.badge === 'Popular';
}

// Função para gerar classes de animação
export function getAnimationClasses(
  animationType: string,
  index: number,
  delay: number = 0.1
): string {
  const baseDelay = index * delay;
  
  switch (animationType) {
    case 'slide':
      return `animate-slide-in-left delay-[${baseDelay}s]`;
    case 'fade':
      return `animate-fade-in delay-[${baseDelay}s]`;
    case 'bounce':
      return `animate-bounce-in delay-[${baseDelay}s]`;
    case 'flip':
      return `animate-flip-in delay-[${baseDelay}s]`;
    default:
      return `animate-scale-in delay-[${baseDelay}s]`;
  }
} 