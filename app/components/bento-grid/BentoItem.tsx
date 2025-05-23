import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { type BentoItem as BentoItemType } from '@/app/types';

interface BentoItemProps {
  item: BentoItemType;
  className?: string;
}

export function BentoItem({ item, className = '' }: BentoItemProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className={`group relative overflow-hidden rounded-xl border bg-background/50 p-4 transition-all hover:bg-background/80 ${className}`}
    >
      {item.image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={item.featured}
            />
          </motion.div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 space-y-2"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground/90 group-hover:text-foreground">
            {item.title}
          </h3>
          <span className="text-xs font-medium text-foreground/60 bg-foreground/5 px-2 py-1 rounded-full">
            {item.categoryId.charAt(0).toUpperCase() + item.categoryId.slice(1)}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-foreground/60 group-hover:text-foreground/80">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  );

  if (item.link) {
    return (
      <Link href={item.link} className="block">
        {content}
      </Link>
    );
  }

  return content;
} 