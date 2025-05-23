export type Category = {
  id: string;
  name: string;
  description?: string;
};

export type BentoItem = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  categoryId: string;
  featured?: boolean;
  link?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  buttonColor?: string;
  colSpan?: number;
  rowSpan?: number;
  position?: "left" | "right" | "top" | "bottom" | "full";
  isSubscription?: boolean;
  imageSize?: "small" | "medium" | "large";
  titleSize?: "sm" | "base" | "lg" | "xl" | "2xl";
  descriptionSize?: "sm" | "base" | "lg";
};

export type BentoGridProps = {
  items: BentoItem[];
  categories: Category[];
  selectedCategory?: string;
  columnsPerRow?: number;
  autoLayout?: boolean;
  gridRows?: number;
  gridCols?: number;
  gap?: "small" | "medium" | "large";
};

// Padrões de layout pré-definidos
export const autoLayoutPattern = [
  { col: 6, row: 2, imageSize: "large", titleSize: "2xl", position: "left" },
  { col: 6, row: 2, imageSize: "medium", titleSize: "xl", position: "right" },
  { col: 4, row: 3, imageSize: "large", titleSize: "lg", position: "top" },
  { col: 4, row: 3, imageSize: "medium", titleSize: "lg", position: "bottom" },
  { col: 4, row: 3, imageSize: "large", titleSize: "lg", position: "top" },
  { col: 12, row: 1, imageSize: "small", titleSize: "xl", position: "left" },
]; 