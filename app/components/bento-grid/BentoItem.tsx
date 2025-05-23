import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { type BentoItem as BentoItemType } from '@/app/types';

interface BentoItemProps {
  item: BentoItemType;
  className?: string;
  index?: number;
}

export function BentoItem({ item, className = '', index = 0 }: BentoItemProps) {
  // Layout horizontal apenas em desktop para cards específicos
  const isHorizontalLayout = (index === 0 || index === 1);

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      style={{
        backgroundColor: item.backgroundColor || '#ffffff',
      }}
      className={`group relative flex h-full overflow-hidden rounded-xl shadow-lg transition-all ${className}`}
    >
      {item.isSubscription ? (
        // Card de inscrição
        <div className="flex h-full flex-col md:flex-row items-center justify-between p-6 md:p-8 text-white">
          <div className="text-center md:text-left mb-4 md:mb-0 md:mr-8">
            <h3 className="text-2xl md:text-3xl font-bold">{item.title}</h3>
            {item.description && (
              <p className="mt-3 text-base md:text-lg text-white/90 max-w-xl">{item.description}</p>
            )}
          </div>
          {item.buttonText && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto whitespace-nowrap rounded-lg border border-white/20 bg-white/10 px-8 py-3 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              {item.buttonText}
            </motion.button>
          )}
        </div>
      ) : (
        // Cards normais com layout flexível
        <div className={`flex h-full w-full flex-col ${isHorizontalLayout ? 'md:flex-row' : ''}`}>
          {/* Container da imagem */}
          {item.image && (
            <div className={`relative h-48 ${isHorizontalLayout ? 'md:h-auto md:w-1/2' : 'md:h-56'}`}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes={isHorizontalLayout 
                  ? "(max-width: 768px) 100vw, 33vw"
                  : "(max-width: 768px) 100vw, 50vw"
                }
                priority={item.featured}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent md:bg-gradient-to-r" />
            </div>
          )}
          
          {/* Container do conteúdo */}
          <div className={`relative flex flex-col justify-between flex-1 p-4 ${
            isHorizontalLayout ? 'md:w-1/2 md:p-6' : ''
          }`}>
            <div>
              <h3 className="text-xl md:text-2xl font-bold leading-tight mb-2">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm md:text-base opacity-90">
                  {item.description}
                </p>
              )}
            </div>
            {item.buttonText && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 self-start rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20"
              >
                {item.buttonText}
              </motion.button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );

  if (item.link) {
    return (
      <Link href={item.link} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
} 