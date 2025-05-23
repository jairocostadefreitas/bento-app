export type Category = {
  id: string;
  name: string;
  description?: string;
};

export type BentoItem = {
  id: string;
  title: string;
  description: string;
  image?: string;
  categoryId: string;
  featured?: boolean;
  link?: string;
};

export type BentoGridProps = {
  items: BentoItem[];
  categories: Category[];
  selectedCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
}; 