import Image from 'next/image';
import Link from 'next/link';
import { type BentoItem } from '@/app/types';
import { cn } from '@/app/lib/utils';

interface BentoCardProps {
  item: BentoItem;
  className?: string;
}

export function BentoCard({ item, className }: BentoCardProps) {
  const content = (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border bg-background p-4',
        'hover:shadow-lg transition-all duration-300',
        className
      )}
    >
      {item.image && (
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{item.title}</h3>
        <p className="mt-2 text-foreground/80">{item.description}</p>
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