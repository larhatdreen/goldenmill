import { useImageOptimization } from '../../hooks/useImageOptimization';
import { Shimmer } from '../Shimmer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  quality?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  quality = 80,
}) => {
  const { optimizedSrc, isLoading, error } = useImageOptimization({
    src,
    width,
    height,
    quality,
  });

  if (error) {
    console.error('Error loading image:', error);
    return null;
  }

  return (
    <div className="relative" style={{ width, height }}>
      {isLoading && <Shimmer />}
      <img
        src={optimizedSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </div>
  );
}; 