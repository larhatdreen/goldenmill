import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CountButton from './CountButton';
import button from '../assets/UI/Btn.svg';
import { useTranslation } from 'react-i18next';

interface LocalizedText {
  ru: string;
  en: string;
  de: string;
}

interface ManufacturingSection {
  title: LocalizedText;
  subtitle?: LocalizedText;
  description?: LocalizedText;
  hint?: LocalizedText;
}

interface ProductCardProps {
  product: Product;
}

interface Product {
  id: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  description: LocalizedText;
  imageUrl: string;
  activeImageUrl?: string;
  category: string;
  application: string[];
  granulation: string[];
  type: string[];
  price?: string;
  manufacturingSections?: ManufacturingSection[];
  sectionImages: string[];
  technicalTitle?: LocalizedText;
  technicalSubtitle?: LocalizedText;
  technicalDescription?: LocalizedText;
  technicalHint?: LocalizedText;
}

// Функция для валидации и форматирования текста
const formatText = (text: string, maxLength: number, type: 'title' | 'subtitle' | 'description'): string => {
  if (!text) return '';
  
  // Удаляем лишние пробелы
  let formatted = text.trim().replace(/\s+/g, ' ');
  
  // Применяем специфичные правила в зависимости от типа текста
  switch (type) {
    case 'title':
      // Для заголовка: первая буква заглавная, остальные как есть
      formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
      break;
    case 'subtitle':
      // Для подзаголовка: все слова с маленькой буквы
      formatted = formatted.toLowerCase();
      break;
    case 'description':
      // Для описания: первая буква предложения заглавная
      formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
      // Добавляем точку в конце, если её нет
      if (!formatted.endsWith('.')) {
        formatted += '.';
      }
      break;
  }
  
  // Обрезаем текст до максимальной длины
  if (formatted.length > maxLength) {
    formatted = formatted.substring(0, maxLength - 3) + '...';
  }
  
  return formatted;
};

const fadeInAnimation = `
@keyframes fadeInCard {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'ru' | 'en' | 'de';
  const navigate = useNavigate();
  
  const {
    id,
    title,
    subtitle,
    description,
    imageUrl,
    activeImageUrl,
    price,
    manufacturingSections,
    sectionImages,
    technicalTitle,
    technicalSubtitle,
    technicalDescription,
    technicalHint
  } = product;

  const handleImageClick = () => {
    navigate(`/${currentLanguage}/product/${id}`, { 
      state: { 
        id,
        title, 
        description, 
        imageUrl, 
        subtitle,
        activeImageUrl,
        price,
        manufacturingSections,
        sectionImages,
        technicalTitle,
        technicalSubtitle,
        technicalDescription,
        technicalHint
      } 
    });
  };

  // Форматируем тексты с ограничениями по длине
  const formattedTitle = formatText(title[currentLanguage], 50, 'title');
  const formattedSubtitle = subtitle ? formatText(subtitle[currentLanguage], 100, 'subtitle') : '';
  const formattedDescription = formatText(description[currentLanguage], 200, 'description');

  // Добавляем функцию форматирования цены
  const formatPrice = (price: string): string => {
    // Удаляем все нечисловые символы, кроме точки
    const cleanPrice = price.replace(/[^\d.]/g, '');
    const number = parseFloat(cleanPrice);
    
    if (isNaN(number)) return price;

    // Форматируем большие числа
    if (number >= 1000000) {
      // Для миллионов и больше используем сокращение M
      return `${Math.floor(number / 1000000)}M €`;
    }

    if (number >= 1000) {
      // Для тысяч используем сокращение K
      return `${Math.floor(number / 1000)}K €`;
    }
    
    // Для чисел меньше 1000
    if (number % 1 === 0) {
      // Если целое число, не показываем десятичные
      return `${Math.floor(number)} €`;
    }

    // Если есть десятичные, показываем максимум 1 знак
    return `${number.toFixed(1)} €`;
  };

  return (
    <>
      <Card 
        onClick={handleImageClick}
        sx={{ 
          width: '308px',
          minWidth: '308px',
          maxWidth: '308px',
          height: '450px',
          bgcolor: '#202020',
          backgroundImage: 'none',
          borderRadius: '10px',
          border: '1px solid rgba(213, 205, 189, 0.1)',
          transition: 'all 0.3s ease',
          padding: 0,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          margin: '0 auto',
          '&:hover': {
            border: '1px solid rgba(213, 205, 189, 0.2)',
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          }
        }}
      >
        <style>{fadeInAnimation}</style>
        <CardContent 
          sx={{ 
            p: 3,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '24px !important',
            gap: 2,
            position: 'relative'
          }}
        >
          {/* Header Section */}
          <Box sx={{ 
            mb: 1,
            width: 'calc(100% - 60px)',
            height: '72px',
            minHeight: '72px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: formattedTitle || formattedSubtitle ? 'flex-start' : 'center'
          }}>
            {formattedTitle && (
              <Tooltip 
                title={title[currentLanguage]}
                placement="top"
                enterDelay={500}
                arrow
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#82653E',
                    fontFamily: 'AdventProRegular',
                    fontSize: '20px',
                    letterSpacing: '0',
                    mb: 0.5,
                    fontWeight: 400,
                    lineHeight: 1.2,
                    wordBreak: 'break-word',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    userSelect: 'none',
                  }}
                >
                  {formattedTitle}
                </Typography>
              </Tooltip>
            )}

            {formattedSubtitle && (
              <Tooltip 
                title={subtitle?.[currentLanguage] || ''}
                placement="top"
                enterDelay={500}
                arrow
              >
                <Typography 
                  variant="subtitle1" 
                  sx={{
                    margin: 0,
                    color: '#A19F9B',
                    fontFamily: 'AdventProRegular',
                    fontSize: '18px',
                    lineHeight: 1.2,
                    letterSpacing: 0,
                    fontWeight: 300,
                    opacity: 0.5,
                    wordBreak: 'break-word',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: '4px',
                    userSelect: 'none',
                  }}
                >
                  {formattedSubtitle}
                </Typography>
              </Tooltip>
            )}
          </Box>

          {activeImageUrl && (
            <div 
              style={{
                position: 'absolute',
                top: '24px',
                right: '25px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                transition: '0.3s'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'visible'
                }}
              >
                <img 
                  src={activeImageUrl}
                  alt="Company logo"
                  style={{
                    maxWidth: '40px',
                    maxHeight: '40px',
                    width: '40px',
                    height: '40px',
                    objectFit: 'contain',
                    opacity: 1,
                    transition: 'opacity 0.3s',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </div>
          )}

          {/* Image Section */}
          <Box 
            sx={{ 
              position: 'relative',
              width: '100%',
              height: '180px',
              minHeight: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              mb: 1,
              borderRadius: '8px',
              '&:hover': {
                '& img': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s ease'
                }
              }
            }}
          >
            <CardMedia
              component="img"
              image={imageUrl}
              alt={formattedTitle}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              sx={{
                width: 'auto',
                height: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                transition: 'transform 0.3s ease',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />
          </Box>

          {/* Description Section */}
          <Box sx={{ 
            flex: '1 0 auto',
            minHeight: '54px',
            height: '54px',
            mb: 'auto'
          }}>
            {formattedDescription && (
              <Tooltip 
                title={description[currentLanguage]}
                placement="top"
                enterDelay={500}
                arrow
              >
                <Typography 
                  sx={{ 
                    color: '#A19F9B',
                    fontFamily: 'LabGrotesque',
                    fontSize: '15px',
                    opacity: 0.5,
                    lineHeight: '1.2',
                    letterSpacing: '0',
                    fontWeight: 300,
                    wordBreak: 'break-word',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    userSelect: 'none',
                  }}
                >
                  {formattedDescription}
                </Typography>
              </Tooltip>
            )}
          </Box>

          {/* Button Section */}
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              position: 'relative'
            }}
          >
            <CountButton
              className="relative z-[1] w-[200px] aspect-[282/58] font-bebas text-[#FFFFFF] flex items-center justify-center bg-contain bg-no-repeat transition-colors duration-300 select-none"
              src={button}
              defaultValue={price ? formatPrice(price) : t('products.onRequest')}
              style={{
                fontFamily: 'Bebas Neue',
                letterSpacing: '1px',
                fontWeight: 400,
                cursor: 'default',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                msUserSelect: 'none',
                MozUserSelect: 'none',
                pointerEvents: 'none',
                fontSize: '22px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                padding: '0 15px',
                maxWidth: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard; 