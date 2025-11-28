'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  fallbackSrc?: string;
}

export function SafeImage({ 
  src, 
  alt, 
  fill = false, 
  width, 
  height, 
  sizes, 
  className,
  fallbackSrc = '/images/placeholder-course.png'
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const imageProps = {
    src: imgSrc,
    alt,
    className,
    onError: handleError,
    ...(fill ? { fill: true, sizes } : { width, height })
  };

  return <Image {...imageProps} />;
}
