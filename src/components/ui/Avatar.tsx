import { SafeImage } from '@/components/ui/SafeImage';
import { HTMLAttributes } from 'react';
import { cn, getInitials } from '@/lib/utils';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Avatar({ src, alt, name, size = 'md', className, ...props }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };
  
  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold',
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <SafeImage
          src={src}
          alt={alt || name || 'Avatar'}
          fill
          sizes="(max-width: 768px) 40px, 48px"
          className="object-cover"
        />
      ) : (
        <span>{name ? getInitials(name) : '??'}</span>
      )}
    </div>
  );
}

