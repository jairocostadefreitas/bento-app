import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { type BentoItem as BentoItemType } from '@/app/types';
import { 
  getImageSizeClasses, 
  getTitleSizeClasses, 
  getDescriptionSizeClasses,
  themes 
} from '@/app/types';

interface BentoItemProps {
  item: BentoItemType;
  className?: string;
  enableHover?: boolean;
  theme?: "light" | "dark" | "auto";
}

export function BentoItem({ 
  item, 
  className = '', 
  enableHover = true,
  theme = 'light'
}: BentoItemProps) {
  // Determinar o tema atual
  const currentTheme = theme === 'auto' 
    ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? themes.dark : themes.light)
    : themes[theme as keyof typeof themes] || themes.light;

  // MELHORIA: Classes de aspect-ratio baseadas no imageSize
  const getAspectRatioClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'aspect-square';
      case 'medium':
        return 'aspect-video';
      case 'large':
        return 'aspect-[4/3]';
      case 'full':
        return 'aspect-auto';
      default:
        return 'aspect-video';
    }
  };

  // Classes de posicionamento de imagem
  const getImagePositionClasses = () => {
    const position = item.position || 'top';
    const imageSize = item.imageSize || 'medium';
    
    switch (position) {
      case 'left':
        return {
          container: 'flex-row',
          imageWrapper: `relative ${getImageSizeClasses(imageSize, position)} ${getAspectRatioClasses(imageSize)} flex-shrink-0`,
          contentWrapper: 'flex-1 min-w-0'
        };
      case 'right':
        return {
          container: 'flex-row-reverse',
          imageWrapper: `relative ${getImageSizeClasses(imageSize, position)} ${getAspectRatioClasses(imageSize)} flex-shrink-0`,
          contentWrapper: 'flex-1 min-w-0'
        };
      case 'bottom':
        return {
          container: 'flex-col-reverse',
          imageWrapper: `relative ${getImageSizeClasses(imageSize, position)} ${getAspectRatioClasses(imageSize)} flex-shrink-0`,
          contentWrapper: 'flex-1 min-w-0'
        };
      case 'full':
        return {
          container: 'relative',
          imageWrapper: 'absolute inset-0',
          contentWrapper: 'relative z-10 flex flex-col justify-end h-full'
        };
      case 'background':
        return {
          container: 'relative',
          imageWrapper: 'absolute inset-0',
          contentWrapper: 'relative z-10 flex flex-col justify-center items-center h-full text-center'
        };
      default: // top
        return {
          container: 'flex-col',
          imageWrapper: `relative ${getImageSizeClasses(imageSize, position)} ${getAspectRatioClasses(imageSize)} flex-shrink-0`,
          contentWrapper: 'flex-1 min-w-0'
        };
    }
  };

  const positionClasses = getImagePositionClasses();

  // Classes de hover effect
  const getHoverEffectClasses = () => {
    if (!enableHover) return '';
    
    switch (item.hoverEffect) {
      case 'lift':
        return 'hover:shadow-2xl hover:-translate-y-2';
      case 'glow':
        return 'hover:shadow-2xl hover:shadow-blue-500/25';
      case 'rotate':
        return 'hover:rotate-1';
      case 'none':
        return '';
      default: // scale
        return 'hover:scale-[1.02]';
    }
  };

  // Classes de sombra
  const getShadowClasses = () => {
    const shadowMap = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
    };
    return shadowMap[item.shadow || 'lg'];
  };

  // Classes de border radius
  const getRoundedClasses = () => {
    const roundedMap = {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      full: 'rounded-full',
    };
    return roundedMap[item.rounded || 'xl'];
  };

  // Classes de botão
  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg';
    
    switch (item.buttonVariant) {
      case 'outline':
        return `${baseClasses} border-2 border-current bg-transparent hover:bg-current hover:text-white`;
      case 'secondary':
        return `${baseClasses} bg-gray-100 text-gray-900 hover:bg-gray-200`;
      case 'ghost':
        return `${baseClasses} bg-transparent hover:bg-white/10`;
      case 'gradient':
        return `${baseClasses} bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700`;
      default:
        return `${baseClasses} bg-white/10 text-white backdrop-blur-sm hover:bg-white/20`;
    }
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={enableHover ? { scale: item.hoverEffect === 'scale' ? 1.02 : 1 } : {}}
      style={{
        backgroundColor: item.backgroundColor || currentTheme.background,
        color: item.textColor || currentTheme.text,
        background: item.gradient || item.backgroundColor || currentTheme.background,
        borderColor: item.borderColor,
        borderWidth: item.borderWidth || 0,
      }}
      className={`
        group relative flex h-full overflow-hidden transition-all duration-300
        ${getRoundedClasses()}
        ${getShadowClasses()}
        ${getHoverEffectClasses()}
        ${className}
      `}
    >
      {item.isSubscription ? (
        // Card de inscrição melhorado
        <div className="flex h-full flex-col md:flex-row items-center justify-between p-6 md:p-8">
          <div className="text-center md:text-left mb-4 md:mb-0 md:mr-8 flex-1">
            {item.icon && (
              <div className="mb-4">
                <span className="text-4xl">{item.icon}</span>
              </div>
            )}
            <h3 className={`font-bold text-balance ${getTitleSizeClasses(item.titleSize || '2xl')}`}>
              {item.title}
            </h3>
            {item.description && (
              <p className={`mt-3 opacity-90 max-w-xl line-clamp-3 text-balance ${getDescriptionSizeClasses(item.descriptionSize || 'base')}`}>
                {item.description}
              </p>
            )}
            {item.badge && (
              <span 
                className="inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full"
                style={{ backgroundColor: item.badgeColor || 'rgba(255,255,255,0.2)' }}
              >
                {item.badge}
              </span>
            )}
          </div>
          {item.buttonText && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full md:w-auto whitespace-nowrap ${getButtonClasses()}`}
              aria-label={`${item.buttonText} - ${item.title}`}
            >
              {item.buttonText}
            </motion.button>
          )}
        </div>
      ) : (
        // Cards normais com posicionamento flexível de imagem
        <div className={`flex h-full w-full ${positionClasses.container}`}>
          {/* Container da imagem */}
          {item.image && (
            <div className={positionClasses.imageWrapper}>
              <Image
                src={item.image}
                alt={item.title ? `Imagem do artigo: ${item.title}` : 'Imagem do artigo'}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={item.featured}
              />
              {/* Overlay melhorado */}
              {(item.overlay !== false) && (
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent"
                  style={{ opacity: item.overlayOpacity || 0.6 }}
                />
              )}
            </div>
          )}
          
          {/* Container do conteúdo */}
          <div className={`
            relative flex flex-col justify-between p-4 md:p-6 lg:p-8
            ${positionClasses.contentWrapper}
            ${item.position === 'full' || item.position === 'background' ? 'text-white' : ''}
          `}>
            <div className="flex-1 space-y-2">
              {/* Metadados */}
              {(item.author || item.date || item.readTime) && (
                <div className="flex items-center gap-2 mb-2 text-xs opacity-75 line-clamp-1">
                  {item.author && <span className="truncate">{item.author}</span>}
                  {item.date && <span>•</span>}
                  {item.date && <span className="truncate">{new Date(item.date).toLocaleDateString('pt-BR')}</span>}
                  {item.readTime && <span>•</span>}
                  {item.readTime && <span className="truncate">{item.readTime}</span>}
                </div>
              )}

              {/* Ícone */}
              {item.icon && (
                <div className="mb-2">
                  <span className="text-2xl">{item.icon}</span>
                </div>
              )}

              {/* Título com text-balance */}
              <h3 className={`font-bold leading-tight mb-2 text-balance line-clamp-3 ${getTitleSizeClasses(item.titleSize || 'lg')}`}>
                {item.title}
              </h3>

              {/* Descrição com line-clamp */}
              {item.description && (
                <p className={`opacity-90 line-clamp-3 text-balance leading-relaxed ${getDescriptionSizeClasses(item.descriptionSize || 'base')}`}>
                  {item.description}
                </p>
              )}

              {/* Tags com overflow controlado */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {item.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 text-xs bg-white/20 rounded-full truncate max-w-[100px]"
                      title={tag}
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-white/20 rounded-full">
                      +{item.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Badge */}
              {item.badge && (
                <span 
                  className="inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full truncate max-w-[120px]"
                  style={{ backgroundColor: item.badgeColor || 'rgba(255,255,255,0.2)' }}
                  title={item.badge}
                >
                  {item.badge}
                </span>
              )}
            </div>

            {/* Botão */}
            {item.buttonText && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`mt-4 self-start truncate max-w-full ${getButtonClasses()}`}
                aria-label={`${item.buttonText} - ${item.title}`}
                title={item.buttonText}
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
      <Link 
        href={item.link} 
        className="block h-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
        aria-label={`Ir para ${item.title}`}
      >
        {content}
      </Link>
    );
  }

  return content;
} 