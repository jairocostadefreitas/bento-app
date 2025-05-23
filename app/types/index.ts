export type Category = {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
};

export type ImagePosition = "left" | "right" | "top" | "bottom" | "full" | "background";
export type ImageSize = "small" | "medium" | "large" | "full";
export type TitleSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
export type DescriptionSize = "xs" | "sm" | "base" | "lg";
export type ButtonVariant = "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | "gradient";
export type GridSize = "small" | "medium" | "large" | "xl";
export type AnimationType = "fade" | "slide" | "scale" | "bounce" | "flip";

// NOVO: AutoLayoutPattern expandido com todas as propriedades dos cards
export type AutoLayoutPattern = {
  // Layout básico
  col: number;
  row: number;
  
  // Propriedades visuais
  backgroundColor?: string;
  textColor?: string;
  gradient?: string;
  borderColor?: string;
  borderWidth?: number;
  
  // Propriedades de imagem
  imageSize: ImageSize;
  position: ImagePosition;
  
  // Propriedades de texto
  titleSize: TitleSize;
  descriptionSize?: DescriptionSize;
  
  // Propriedades de botão
  buttonText?: string;
  buttonVariant?: ButtonVariant;
  buttonColor?: string;
  
  // Efeitos visuais
  hoverEffect?: "scale" | "lift" | "glow" | "rotate" | "none";
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  
  // Metadados visuais
  icon?: string;
  badge?: string;
  badgeColor?: string;
  
  // Controle de layout
  priority: number;
  featured?: boolean;
  tailwindClasses: string;
};

export type BentoItem = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  categoryId: string;
  link?: string;
  isSubscription?: boolean;
  colSpan?: number;
  rowSpan?: number;
  overlay?: boolean;
  overlayOpacity?: number;
  animationType?: AnimationType;
  tags?: string[];
  author?: string;
  date?: string;
  readTime?: string;
  tailwindClasses?: string;
  
  // REMOVIDO: Propriedades que agora vêm do autoLayoutPatterns
  // backgroundColor, textColor, buttonText, position, imageSize, titleSize, etc.
};

export type BentoGridProps = {
  items: BentoItem[];
  categories: Category[];
  selectedCategory?: string;
  columnsPerRow?: number;
  autoLayout?: boolean;
  gridRows?: number;
  gridCols?: number;
  gap?: GridSize;
  theme?: "light" | "dark" | "auto";
  animationDelay?: number;
  enableHover?: boolean;
  enableAutoHeight?: boolean;
  maxItems?: number;
  sortBy?: "date" | "priority" | "title" | "category";
  sortOrder?: "asc" | "desc";
  enableSearch?: boolean;
  enablePagination?: boolean;
  itemsPerPage?: number;
};

// PADRÕES DE LAYOUT CENTRALIZADOS - TODAS AS PROPRIEDADES DOS CARDS
// IMPORTANTE: Altere estes padrões para modificar a aparência dos cards!
// Cada padrão define TODAS as propriedades visuais e de layout de um card
// 
// COMO USAR:
// - Cada card no page.tsx será automaticamente estilizado pelo padrão correspondente
// - Para alterar um card, modifique o padrão aqui ao invés do page.tsx
// - O índice do array corresponde ao card (padrão 0 = card id '1', padrão 1 = card id '2', etc.)
//
// EXEMPLO: Para alterar o primeiro card (Treino Funcional):
// Modifique o padrão no índice 0 abaixo
export const autoLayoutPatterns: AutoLayoutPattern[] = [
  // Card 1: Treino Funcional - TESTE: Alterando para demonstrar o sistema
  {
    col: 12, 
    row: 12,
    backgroundColor: 'silver', 
    textColor: 'black',
    position: "left", 
    titleSize: "3xl", 
    imageSize: "large", 
    hoverEffect: 'glow',
    shadow: '2xl', 
    buttonText: '🔥 Começar Agora', 
    buttonVariant: 'gradient', 
    badge: 'NOVO SISTEMA', 
    badgeColor: '#00FF88', 
    priority: 1,
    featured: true,
    tailwindClasses: "col-span-2 md:col-span-7 md:row-span-1" 
  },
  
  // Card 2: Equilíbrio e Saúde
  {
    col: 12,
    row: 12,
    backgroundColor: '#5CB85C',
    textColor: 'white',
    imageSize: "large",
    titleSize: "xl",
    position: "top",
    buttonText: '+ Saiba mais',
    buttonVariant: 'default',
    hoverEffect: 'lift',
    shadow: 'lg',
    priority: 2,
    icon: '⚖️',
    tailwindClasses: "col-span-2 md:col-span-5 md:row-span-2"
  },
  
  // Card 3: Bem-estar Feminino - TESTE: Alterando para demonstrar row-span funcionando
  {
    col: 12,
    row: 12, // ✏️ TESTE: 2 linhas de altura
    backgroundColor: 'pink',
    textColor: 'black',
    imageSize: "large",
    titleSize: "lg",
    position: "bottom",
    buttonText: '+ Saiba mais',
    buttonVariant: 'default',
    hoverEffect: 'glow',
    shadow: 'lg',
    priority: 3,
    icon: '🌸',
    badge: 'TESTE ROW-SPAN', // ✏️ TESTE: Badge indicando o teste
    badgeColor: '#4ECDC4',
    tailwindClasses: "col-span-2 md:col-span-7 md:row-span-1" // ✏️ TESTE: 2 linhas no desktop
  },
  
  // Card 4: Saúde Integral - TESTE: 1 linha para contrastar
  {
    col: 12,
    row: 12, // ✏️ TESTE: Apenas 1 linha de altura
    backgroundColor: '#1E4C9A',
    textColor: 'white',
    imageSize: "small",
    titleSize: "lg",
    position: "top",
    buttonText: '+ Saiba mais',
    buttonVariant: 'default',
    hoverEffect: 'glow',
    shadow: 'md',
    priority: 4,
    icon: '🏃',
    badge: 'TESTE 1 LINHA', // ✏️ TESTE: Badge indicando 1 linha
    badgeColor: '#3B82F6',
    tailwindClasses: "col-span-2 md:col-span-4 md:row-span-1" // ✏️ TESTE: 1 linha no desktop
  },
  
  // Card 5: Fitness Feminino
  {
    col: 12,
    row: 12,
    backgroundColor: '#03A9F4',
    textColor: 'white',
    imageSize: "small",
    titleSize: "base",
    position: "bottom",
    buttonText: '+ Saiba mais',
    buttonVariant: 'default',
    hoverEffect: 'rotate',
    shadow: 'md',
    priority: 5,
    icon: '🏋️‍♀️',
    tailwindClasses: "col-span-2 md:col-span-4 md:row-span-1"
  },
  
  // Card 6: Newsletter (Subscription)
  {
    col: 12,
    row: 12,
    backgroundColor: '#111111',
    textColor: 'white',
    imageSize: "medium",
    titleSize: "2xl",
    position: "left",
    buttonText: 'Inscrever-se',
    buttonVariant: 'gradient',
    hoverEffect: 'scale',
    shadow: '2xl',
    priority: 999,
    icon: '📧',
    badge: 'Grátis',
    badgeColor: '#10B981',
    tailwindClasses: "col-span-2 md:col-span-12 md:row-span-1"
  },
  
  // Card 7: Emergências Médicas
  {
    col: 12,
    row: 12,
    backgroundColor: '#DC2626',
    textColor: 'white',
    imageSize: "medium",
    titleSize: "xl",
    position: "right",
    buttonText: '+ Emergência',
    buttonVariant: 'default',
    hoverEffect: 'lift',
    shadow: 'lg',
    priority: 6,
    icon: '🚑',
    badge: 'Urgente',
    badgeColor: '#EF4444',
    tailwindClasses: "col-span-2 md:col-span-6 md:row-span-1"
  },
  
  // Card 8: Saúde do Coração
  {
    col: 12,
    row: 12,
    backgroundColor: '#DC2626',
    textColor: 'white',
    imageSize: "large",
    titleSize: "xl",
    position: "background",
    buttonText: '+ Saiba mais',
    buttonVariant: 'default',
    hoverEffect: 'glow',
    shadow: 'xl',
    priority: 7,
    icon: '❤️',
    badge: 'Importante',
    badgeColor: '#F59E0B',
    tailwindClasses: "col-span-2 md:col-span-6 md:row-span-1"
  },
  
  // Card 9: Monitoramento de Saúde
  {
    col: 12,
    row: 12,
    backgroundColor: '#059669',
    textColor: 'white',
    imageSize: "medium",
    titleSize: "lg",
    position: "left",
    buttonText: '+ Saiba mais',
    buttonVariant: 'default',
    hoverEffect: 'scale',
    shadow: 'lg',
    priority: 8,
    icon: '📊',
    badge: 'Essencial',
    badgeColor: '#10B981',
    tailwindClasses: "col-span-2 md:col-span-4 md:row-span-1"
  },
  
  // Card 10: Cuidados Médicos
  {
    col: 12,
    row: 12,
    backgroundColor: '#2563EB',
    textColor: 'white',
    imageSize: "small",
    titleSize: "lg",
    position: "top",
    buttonText: '+ Saiba mais',
    buttonVariant: 'default',
    hoverEffect: 'lift',
    shadow: 'md',
    priority: 9,
    icon: '🩺',
    tailwindClasses: "col-span-2 md:col-span-4 md:row-span-1"
  },
  
  // Card 11: Consulta Médica
  {
    col: 12,
    row: 12,
    backgroundColor: '#7C3AED',
    textColor: 'white',
    imageSize: "medium",
    titleSize: "base",
    position: "right",
    buttonText: '+ Saiba mais',
    buttonVariant: 'default',
    hoverEffect: 'glow',
    shadow: 'lg',
    priority: 10,
    icon: '👩‍⚕️',
    tailwindClasses: "col-span-2 md:col-span-4 md:row-span-1"
  },
  
  // Card 12: Saúde da Família
  {
    col: 12,
    row: 12,
    backgroundColor: '#F59E0B',
    textColor: 'white',
    imageSize: "large",
    titleSize: "xl",
    position: "background",
    buttonText: '+ Saiba mais',
    buttonVariant: 'default',
    hoverEffect: 'scale',
    shadow: 'xl',
    priority: 11,
    icon: '👨‍👩‍👧‍👦',
    badge: 'Família',
    badgeColor: '#F97316',
    tailwindClasses: "col-span-2 md:col-span-8 md:row-span-1"
  },
  
  // Card 13: Tecnologia em Saúde
  {
    col: 12,
    row: 12,
    backgroundColor: '#6366F1',
    textColor: 'white',
    imageSize: "full",
    titleSize: "lg",
    position: "full",
    buttonText: '+ Saiba mais',
    buttonVariant: 'default',
    hoverEffect: 'rotate',
    shadow: 'lg',
    priority: 12,
    icon: '🤖',
    badge: 'Inovação',
    badgeColor: '#8B5CF6',
    tailwindClasses: "col-span-2 md:col-span-4 md:row-span-1"
  }
];

// Temas predefinidos
export const themes = {
  light: {
    background: '#ffffff',
    text: '#1f2937',
    muted: '#6b7280',
    border: '#e5e7eb',
    accent: '#3b82f6',
  },
  dark: {
    background: '#111827',
    text: '#f9fafb',
    muted: '#9ca3af',
    border: '#374151',
    accent: '#60a5fa',
  },
};

// Configurações de animação
export const animationConfig = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  bounce: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  flip: {
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: -90 },
  },
};

// Utilitários para classes CSS
export const getImageSizeClasses = (size: ImageSize, position: ImagePosition) => {
  const sizeMap = {
    small: position === 'top' || position === 'bottom' ? 'h-24 md:h-32' : 'w-24 md:w-32',
    medium: position === 'top' || position === 'bottom' ? 'h-32 md:h-48' : 'w-32 md:w-48',
    large: position === 'top' || position === 'bottom' ? 'h-48 md:h-64' : 'w-48 md:w-64',
    full: 'w-full h-full',
  };
  return sizeMap[size] || sizeMap.medium;
};

export const getTitleSizeClasses = (size: TitleSize) => {
  const sizeMap = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
    xl: 'text-xl md:text-2xl',
    '2xl': 'text-2xl md:text-3xl',
    '3xl': 'text-3xl md:text-4xl lg:text-5xl',
  };
  return sizeMap[size] || sizeMap.base;
};

export const getDescriptionSizeClasses = (size: DescriptionSize) => {
  const sizeMap = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-sm md:text-base',
    lg: 'text-base md:text-lg',
  };
  return sizeMap[size] || sizeMap.base;
}; 