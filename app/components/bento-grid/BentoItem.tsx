import Image from 'next/image';
import Link from 'next/link';
import { type BentoItem as BentoItemType } from '@/app/types';

interface BentoItemProps {
  item: BentoItemType;
  className?: string;
}

export function BentoItem({ item, className = '' }: BentoItemProps) {
  const content = (
    <div
      className={`group relative overflow-hidden rounded-xl border bg-background/50 p-4 transition-all hover:bg-background/80 ${className}`}
    >
      {item.image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="mt-4 space-y-2">
        <h3 className="text-xl font-semibold text-foreground/90 group-hover:text-foreground">
          {item.title}
        </h3>
        <p className="line-clamp-2 text-sm text-foreground/60 group-hover:text-foreground/80">
          {item.description}
        </p>
      </div>
    </div>
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