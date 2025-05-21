import { useState, useEffect } from 'react';

interface UseImageOptimizationProps {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
}

export const useImageOptimization = ({ src, width, height, quality = 80 }: UseImageOptimizationProps) => {
  const [optimizedSrc, setOptimizedSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const optimizeImage = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Если изображение уже оптимизировано или это внешний URL, используем его как есть
        if (src.startsWith('data:') || src.startsWith('http')) {
          setOptimizedSrc(src);
          return;
        }

        // Добавляем домен goldendie.de к относительным путям
        const baseUrl = src.startsWith('/') ? 'https://goldendie.de' : '';
        const fullSrc = `${baseUrl}${src}`;

        // Создаем URL с параметрами оптимизации
        const url = new URL(fullSrc);
        if (width) url.searchParams.set('w', width.toString());
        if (height) url.searchParams.set('h', height.toString());
        url.searchParams.set('q', quality.toString());

        // Загружаем изображение
        const response = await fetch(url.toString());
        if (!response.ok) throw new Error('Failed to load image');
        
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setOptimizedSrc(objectUrl);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to optimize image'));
        setOptimizedSrc(src); // Используем оригинальный src в случае ошибки
      } finally {
        setIsLoading(false);
      }
    };

    optimizeImage();

    // Очистка
    return () => {
      if (optimizedSrc.startsWith('blob:')) {
        URL.revokeObjectURL(optimizedSrc);
      }
    };
  }, [src, width, height, quality]);

  return { optimizedSrc, isLoading, error };
}; 