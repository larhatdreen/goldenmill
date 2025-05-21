import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, CircularProgress, Tooltip, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams, Navigate } from 'react-router-dom';
import button from '../assets/UI/Btn.svg';
import CountButton from './CountButton';
import Modal from './Modal';
import QuestionIcon from './customIcons/QuestionIcon';
import { API_URL } from '../config';
import SEO from './SEO';
import { useSEO } from '../hooks/useSEO';
import MobileProductLanding from './MobileProductLanding';
import { useTheme } from '../hooks/useTheme';
import { getColor } from '../theme/utils';
import CircleTopicMobileIcon from './customIcons/CircleTopicMobileIcon';

interface ProductInfo {
  id: string;
  title: string;
  category: string;
}

interface ProductLandingProps {
  id: string;
  title: {
    ru: string;
    en: string;
    de: string;
  };
  description: {
    ru: string;
    en: string;
    de: string;
  };
  subtitle?: {
    ru: string;
    en: string;
    de: string;
  };
  imageUrl: string;
  price?: string;
  category?: string;
  // Manufacturing section
  manufacturingTitle?: {
    ru: string;
    en: string;
    de: string;
  };
  manufacturingSubtitle?: {
    ru: string;
    en: string;
    de: string;
  };
  manufacturingDescription?: {
    ru: string;
    en: string;
    de: string;
  };
  manufacturingHint?: {
    ru: string;
    en: string;
    de: string;
  };
  backgroundCircleImage?: string;
  sectionImages: string[];
  // Technical section
  technicalTitle?: {
    ru: string;
    en: string;
    de: string;
  };
  technicalSubtitle?: {
    ru: string;
    en: string;
    de: string;
  };
  technicalDescription?: {
    ru: string;
    en: string;
    de: string;
  };
  technicalHint?: {
    ru: string;
    en: string;
    de: string;
  };
  activeImageUrl?: string;
  manufacturingSections?: {
    title: {
      ru: string;
      en: string;
      de: string;
    };
    subtitle: {
      ru: string;
      en: string;
      de: string;
    };
    description: {
      ru: string;
      en: string;
      de: string;
    };
    hint: {
      ru: string;
      en: string;
      de: string;
    };
  }[];
}

const TooltipWrapper: React.FC<{ text: string; maxLines: number; customStyles?: React.CSSProperties }> = ({ text, maxLines, customStyles }) => {
  const textRef = React.useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const theme = useTheme();


  React.useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [text]);

  const content = (
    <Typography
      ref={textRef}
      sx={{
        margin: 0,
        fontFamily: 'AdventProRegular',
        fontWeight: 400,
        fontSize: '32px',
        lineHeight: 1.2,
        letterSpacing: '0.00938em',
        color: getColor(theme, 'subtitle'),
        width: '100%',
        textAlign: 'left',
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        hyphens: 'auto',
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        opacity: 1,
        mb: 12,
        cursor: isOverflowing ? 'help' : 'default',
        ...customStyles
      }}
    >
      {text}
      {isOverflowing && ' ...'}
    </Typography>
  );

  if (isOverflowing) {
    return (
      <Tooltip
        title={text}
        placement="top"
        arrow
      >
        {content}
      </Tooltip>
    );
  }

  return content;
};

const SectionTitle: React.FC<{ text: string }> = ({ text }) => {
  const MAX_CHARS_PER_LINE = 20;
  const theme = useTheme();
  const words = text.split(' ')
    .filter(word => word.trim())
    .slice(0, 3)
    .map(word => {
      if (word.length > MAX_CHARS_PER_LINE) {
        return word.substring(0, MAX_CHARS_PER_LINE) + '...';
      }
      return word;
    });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
      position: 'relative',
      minWidth: '600px'
    }}>
      {words.map((word, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            marginBottom: index < words.length - 1 ? '1px' : '0',
            marginLeft: '0'
          }}
        >
          {(index === 1 || index === 2) && (
            <Box
              sx={{
                width: '24px',
                height: '63px',
                background: getColor(theme, 'particle'),
                position: 'absolute',
                left: '-35px',
                top: '12px',
                zIndex: 2
              }}
            />
          )}
          <Typography
            variant="h2"
            sx={{
              color: getColor(theme, 'title'),
              fontFamily: 'Bebas Neue',
              fontSize: '90px',
              letterSpacing: '0',
              fontWeight: 'normal',
              lineHeight: 1,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              width: 'auto',
              minWidth: '400px',
              textAlign: 'left',
              marginLeft: '0'
            }}
          >
            {word}
          </Typography>
        </div>
      ))}
    </div>
  );
};

const RectangleDecorations = () => {
  const theme = useTheme();

  return (
    <Box sx={{
      width: '24px',
      height: '63px',
      background: getColor(theme, 'particle'),
      position: 'absolute',
      left: '-35px',
      top: '12px',
      zIndex: 2
    }} />
  );
}

const ProductLanding: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const theme = useTheme();
  const currentLanguage = i18n.language as 'ru' | 'en' | 'de';
  const [product, setProduct] = useState<ProductLandingProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [productInfo, setProductInfo] = useState<ProductInfo | undefined>(undefined);

  // Расширенные брейкпоинты для лучшей адаптивности
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(min-width:769px) and (max-width:1024px)');
  const isSmallDesktop = useMediaQuery('(min-width:1025px) and (max-width:1280px)');
  const isMediumDesktop = useMediaQuery('(min-width:1281px) and (max-width:1920px)');
  const isLargeDesktop = useMediaQuery('(min-width:1921px) and (max-width:2560px)');
  const isXLargeDesktop = useMediaQuery('(min-width:2561px)');
  const isDark = theme.name === 'dark';

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // First try to get data from route state
        if (location.state) {
          console.log('Using data from route state:', location.state);
          console.log('Active Image URL from state:', (location.state as ProductLandingProps).activeImageUrl);
          setProduct(location.state as ProductLandingProps);

          // Дополнительно проверяем данные через API
          console.log('Double checking with API for id:', id);
          const response = await fetch(`${API_URL}/products/${id}`);
          if (!response.ok) {
            console.error('Failed to fetch product from API:', response.status, response.statusText);
            return;
          }
          const apiData = await response.json();
          console.log('API Data:', apiData);
          console.log('API Active Image URL:', apiData.activeImageUrl);

          // Если данные из API отличаются, используем их
          if (apiData.activeImageUrl !== (location.state as ProductLandingProps).activeImageUrl) {
            console.log('Data mismatch detected, using API data');
            setProduct(apiData);
          }
          return;
        }

        console.log('Fetching product data for id:', id);
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) {
          console.error('Failed to fetch product:', response.status, response.statusText);
          throw new Error('Product not found');
        }
        const data = await response.json();
        console.log('Full API Response:', data);
        console.log('Active Image URL from API:', data.activeImageUrl);
        console.log('API URL being used:', API_URL);

        if (!data.title || !data.description) {
          console.error('Missing required fields in product data:', data);
          throw new Error('Invalid product data');
        }

        setProduct(data);
      } catch (err) {
        console.error('Error in fetchProduct:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    console.log('ProductLanding mounted with id:', id);
    console.log('Location state:', location.state);
    fetchProduct();
  }, [id, location.state]);

  // Add a new useEffect to track productData changes
  useEffect(() => {
    if (product) {
      console.log('ProductData updated:', product);
      console.log('Active Image URL after update:', product.activeImageUrl);
    }
  }, [product]);

  const handleOpenHelpModal = () => {
    if (product) {
      const newProductInfo = {
        id: product.id,
        title: product.title[currentLanguage],
        category: product.category || "matrices"
      };
      setProductInfo(newProductInfo);
      setIsHelpModalOpen(true);
    }
  };

  const handleCloseHelpModal = () => {
    setIsHelpModalOpen(false);
  };

  // Всегда передаем одинаковую структуру параметров
  const seoData = useSEO('product', {
    productName: product?.title?.[currentLanguage] ?? '',
    productDescription: product?.description?.[currentLanguage] ?? '',
    category: product?.category ? t(`products.categories.${product.category}`) : t('products.categories.default'),
  });

  if (isMobile) {
    return <MobileProductLanding />;
  }

  if (loading) {
    return (
      <Container sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !product) {
    return <Navigate to={`/${currentLanguage}/granulator`} replace />;
  }

  console.log('Rendering with productData:', product);
  console.log('Active Image URL in render:', product.activeImageUrl);

  const { title, description, subtitle, imageUrl, price } = product;


  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={product.imageUrl.startsWith('http') ? product.imageUrl : `${API_URL.replace('/api', '')}${product.imageUrl}`}
        article={true}
        product={{
          name: product.title[currentLanguage],
          description: product.description[currentLanguage],
          image: product.imageUrl.startsWith('http') ? product.imageUrl : `${API_URL.replace('/api', '')}${product.imageUrl}`,
          price: product.price || undefined,
          availability: 'https://schema.org/InStock',
          technicalSpecification: product.technicalDescription?.[currentLanguage],
          manufacturingDetails: product.manufacturingDescription?.[currentLanguage],
          category: t(`products.categories.${product.category || 'default'}`),
          brand: 'GOLDENMILL',
          model: product.subtitle?.[currentLanguage],
        }}
      />
      <Container
        maxWidth={false}
        component="main"
        role="main"
        sx={{
          minHeight: '100vh',
          color: '#fff',
          pt: 4,
          pb: 30,
          maxWidth: isXLargeDesktop
            ? '2560px !important'
            : isLargeDesktop
              ? '1920px !important'
              : isMediumDesktop
                ? '1440px !important'
                : isSmallDesktop
                  ? '1280px !important'
                  : isTablet
                    ? '1024px !important'
                    : '100% !important',
          margin: '0 auto',
          overflow: 'hidden',
          position: 'relative',
          px: isTablet
            ? 2
            : isSmallDesktop
              ? 3
              : isMediumDesktop
                ? 4
                : isLargeDesktop
                  ? 5
                  : 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Main product section */}
        <article style={{ width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
          <Box
            component="section"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: isTablet ? 2 : isSmallDesktop ? 3 : 4,
              p: isTablet ? 2 : isSmallDesktop ? 3 : 4,
              minHeight: '600px',
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'flex-start',
              margin: '0 auto',
              width: '100%'
            }}
          >
            {/* Left column with image */}
            <Box
              component="figure"
              sx={{
                flex: '0 0 auto',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                margin: 0,
                width: isTablet
                  ? '400px'
                  : isSmallDesktop
                    ? '450px'
                    : isMediumDesktop
                      ? '500px'
                      : '521.67px'
              }}
            >
              <Box
                sx={{
                  width: isTablet
                    ? '400px'
                    : isSmallDesktop
                      ? '450px'
                      : isMediumDesktop
                        ? '500px'
                        : '521.67px',
                  height: isTablet
                    ? '400px'
                    : isSmallDesktop
                      ? '450px'
                      : isMediumDesktop
                        ? '500px'
                        : '521.67px',
                  position: 'relative',
                  borderRadius: '0',
                  overflow: 'hidden',
                  bgcolor: 'transparent'
                }}
              >
                <img
                  src={imageUrl.startsWith('http') ? imageUrl : `${API_URL.replace('/api', '')}${imageUrl}`}
                  alt={`Product ${title[currentLanguage]} detailed view`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    padding: '0',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Box>
            </Box>

            {/* Right column with information */}
            <Box
              component="section"
              aria-label="Product Information"
              sx={{
                flex: '0 0 auto',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                maxWidth: isTablet
                  ? '300px'
                  : isSmallDesktop
                    ? '350px'
                    : '400px'
              }}
            >
              {/* Help button */}
              <Box
                component="nav"
                aria-label="Help Navigation"
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 10,
                  marginBottom: '24px'
                }}
              >
                <button
                  className={`font-labgrotesque text-[16px] sm:text-[18px] laptop:text-[20px] flex flex-row items-center ${isDark ? 'text-[#D5CDBD] hover:text-[#82653E]' : 'text-[#2A3242] hover:text-[#2A3242]'
                    }`}
                  onClick={handleOpenHelpModal}
                  aria-label="Need Help"
                >
                  <QuestionIcon className='w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] laptop:w-[40px] laptop:h-[40px] mt-[8px] mr-2' aria-hidden="true" />
                  <span>{t('titleBlock.needHelpWithSize')}</span>
                </button>
              </Box>

              {/* Title and subtitle */}
              <Box component="header" sx={{ display: 'flex', flexDirection: 'column', mt: isTablet ? 8 : isSmallDesktop ? 10 : 12 }}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mb: isTablet ? 4 : isSmallDesktop ? 5 : 6,
                  maxWidth: isTablet
                    ? '300px'
                    : isSmallDesktop
                      ? '350px'
                      : '400px'
                }}>
                  {(() => {
                    const words = title[currentLanguage].split(' ');
                    const lines: string[] = [];
                    let currentLine = '';

                    // Process words to create lines with max 14 characters
                    for (let i = 0; i < words.length && lines.length < 3; i++) {
                      const word = words[i];
                      if (currentLine.length + word.length + (currentLine ? 1 : 0) <= 14) {
                        currentLine = currentLine ? `${currentLine} ${word}` : word;
                      } else {
                        if (currentLine) {
                          lines.push(currentLine);
                          currentLine = word;
                        } else {
                          // If a single word is longer than 14 chars, truncate it
                          lines.push(word.length > 14 ? word.substring(0, 14) + '...' : word);
                        }
                      }
                    }

                    // Add the last line if we have space
                    if (currentLine && lines.length < 3) {
                      lines.push(currentLine);
                    }

                    return lines.map((line, index) => (
                      <Typography
                        key={index}
                        variant="h1"
                        sx={{
                          color: getColor(theme, 'title'),
                          fontFamily: 'Bebas Neue',
                          fontSize: isTablet
                            ? '70px'
                            : isSmallDesktop
                              ? '80px'
                              : '90px',
                          letterSpacing: '0',
                          lineHeight: 0.9,
                          textTransform: 'uppercase',
                          fontWeight: 'normal',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          maxWidth: '100%',
                          userSelect: 'none'
                        }}
                      >
                        {line}
                      </Typography>
                    ));
                  })()}
                </Box>

                {subtitle && (
                  <>
                    {title[currentLanguage].split(' ').length <= 2 ? (
                      // Если заголовок занимает 1-2 строки, показываем 3 строки для subtitle
                      <TooltipWrapper
                        text={subtitle[currentLanguage]}
                        maxLines={3}
                        customStyles={{
                          fontSize: isTablet
                            ? '28px'
                            : isSmallDesktop
                              ? '30px'
                              : '32px'
                        }}
                      />
                    ) : (
                      // Если заголовок занимает 3 строки, показываем 2 строки для subtitle
                      <TooltipWrapper
                        text={subtitle[currentLanguage]}
                        maxLines={2}
                        customStyles={{
                          fontSize: isTablet
                            ? '28px'
                            : isSmallDesktop
                              ? '30px'
                              : '32px'
                        }}
                      />
                    )}
                  </>
                )}
              </Box>

              {/* Price button */}
              <Box
                sx={{
                  mt: '-24px'
                }}
              >
                <CountButton
                  className="relative z-[1] w-[282px] aspect-[282/58] font-bebas text-[22px] flex items-center justify-center bg-contain bg-no-repeat"
                  src={<img src={button} alt="btn" />}
                  defaultValue={price ? formatPrice(price) : t('products.onRequest')}
                  onClick={handleOpenHelpModal}
                />
              </Box>
            </Box>
          </Box>
        </article>

        {/* Main description */}
        <Box sx={{
          maxWidth: isTablet
            ? '900px'
            : isSmallDesktop
              ? '1000px'
              : isMediumDesktop
                ? '1100px'
                : '1200px',
          margin: '0 auto',
          px: isTablet ? 2 : 3,
          mt: isTablet ? 4 : isSmallDesktop ? 5 : 6,
          display: 'flex',
          gap: isTablet ? 2 : isSmallDesktop ? 3 : 4,
          alignItems: 'flex-start'
        }}>
          <Box sx={{
            width: isTablet ? '100px' : isSmallDesktop ? '120px' : '132px',
            height: isTablet ? '100px' : isSmallDesktop ? '120px' : '132px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: getColor(theme, 'decorative'),
            borderRadius: '50%',
            overflow: 'visible'
          }}>
            {product.activeImageUrl ? (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'visible'
                }}
              >
                <img
                  src={product.activeImageUrl?.startsWith('http') ? product.activeImageUrl : `${API_URL.replace('/api', '')}${product.activeImageUrl}`}
                  alt="Product logo"
                  style={{
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    position: 'relative',
                    maxWidth: '80%',
                    maxHeight: '100%',
                    transform: 'scale(1)',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onError={(e) => {
                    console.error('Error loading active image:', product.activeImageUrl);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            ) : (
              <Typography sx={{ color: getColor(theme, 'text'), fontSize: '16px', textAlign: 'center', p: 1 }}>
                No logo
              </Typography>
            )}
          </Box>
          <TooltipWrapper
            text={description[currentLanguage]}
            maxLines={4}
            customStyles={{
              width: isTablet
                ? '700px'
                : isSmallDesktop
                  ? '800px'
                  : '906px',
              height: isTablet
                ? '110px'
                : isSmallDesktop
                  ? '120px'
                  : '131px',
              fontFamily: 'Bebas Neue',
              fontWeight: 400,
              fontSize: isTablet
                ? '18px'
                : isSmallDesktop
                  ? '19px'
                  : '20px',
              lineHeight: isTablet
                ? '26px'
                : isSmallDesktop
                  ? '28px'
                  : '29.9px',
              letterSpacing: '0%',
              maxHeight: isTablet
                ? '100px'
                : isSmallDesktop
                  ? '110px'
                  : '120px',
              display: '-webkit-box',
              WebkitLineClamp: '4',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              color: getColor(theme, 'text')
            }}
          />
        </Box>

        {/* Manufacturing Sections */}
        <Box sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          px: 3,
          mt: 12,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          transform: 'none',
          width: '100%',
          alignItems: 'center'
        }}>
          {product.manufacturingSections && product.manufacturingSections.map((section, index) => {
            const imagePath = product.sectionImages?.[index];
            const fullImageUrl = imagePath?.startsWith('http')
              ? imagePath
              : `${API_URL.replace('/api', '')}${imagePath}`;

            return (
              <Box key={index} sx={{
                width: '100%',
                height: '600px',  // Фиксированная высота
                position: 'relative',
                mb: index < (product.manufacturingSections?.length || 0) - 1 ? '600px' : 0,
                transform: 'none',
                pl: isSmallDesktop ? '100px' : 0  // Добавляем отступ слева для small desktop
              }}>
                {/* Background Circle */}
                {imagePath && (
                  <img
                    src={fullImageUrl}
                    alt="Background shape"
                    style={{
                      position: 'absolute',
                      width: isMobile ? '40vw' : isTablet ? '40vw' : isSmallDesktop ? '30vw' : '50vw',
                      height: isMobile ? '40vw' : isTablet ? '40vw' : isSmallDesktop ? '30vw' : '50vw',

                      maxWidth: '700px',
                      maxHeight: '700px',
                      objectFit: 'contain',
                      userSelect: 'none',
                      pointerEvents: 'none',
                      top: '200px ',
                      zIndex: 2
                    }}
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )}

                {/* Группа: SVG + particle + title + subtitle */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '',
                    right: isSmallDesktop ? '20px' : '-10px',
                    width: '584px',
                    height: '513px',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  }}
                >
                  {/* SVG */}
                  <CircleTopicMobileIcon className='w-[100%] h-[100%] object-contain transform' />
                  {/* Группа: particle, title, subtitle */}
                  <Box sx={{
                    position: 'absolute',
                    top: '',
                    left: '195px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}>
                    <RectangleDecorations />
                    <SectionTitle text={section.title[currentLanguage]} />
                    {(() => {
                      const words = section.description?.[currentLanguage]?.split(' ').filter(word => word.trim()) || [];
                      const displayWords = words.slice(0, 6);
                      const formattedText = displayWords
                        .reduce((acc, word, i) => {
                          if (i % 2 === 0) {
                            acc.push([word]);
                          } else {
                            acc[acc.length - 1].push(word);
                          }
                          return acc;
                        }, [] as string[][])
                        .map(pair => pair.join(' '))
                        .join('\n');

                      const content = (
                        <Typography sx={{
                          margin: 0,
                          fontFamily: 'AdventProRegular',
                          fontWeight: 400,
                          fontSize: '32px',
                          lineHeight: 1.2,
                          letterSpacing: '0.00938em',
                          color: getColor(theme, 'subtitle'),
                          width: '100%',
                          textAlign: 'left',
                          zIndex: 1,
                          wordBreak: 'break-word',
                          whiteSpace: 'pre-line',
                          overflowWrap: 'break-word',
                          hyphens: 'auto',
                          cursor: words.length > 6 ? 'help' : 'default',
                          display: '-webkit-box',
                          WebkitLineClamp: '3',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          opacity: 1,
                          transform: 'none',
                          userSelect: 'none'
                        }}>
                          {formattedText}
                        </Typography>
                      );

                      return words.length > 6 ? (
                        <Tooltip title={section.description?.[currentLanguage]} placement="top" arrow>
                          {content}
                        </Tooltip>
                      ) : content;
                    })()}
                  </Box>
                </Box>

                {/* Section Word */}
                <Typography sx={{
                  margin: 0,
                  fontFamily: 'AdventProRegular',
                  fontWeight: 400,
                  fontSize: '17px',
                  letterSpacing: '0.00938em',
                  lineHeight: 1.2,
                  position: 'absolute',
                  left: isSmallDesktop ? '775px' : '850px',  // Корректируем позицию для small desktop
                  textAlign: 'left',
                  top: '465px',
                  width: '100%',
                  zIndex: 1,
                  transform: 'none',
                  color: getColor(theme, 'svg.fill')
                }}>
                  {currentLanguage === 'ru' && <span style={{ fontFamily: 'Bebas Neue' }}>КАТАЛОГ</span>}
                  {currentLanguage === 'en' && 'CATALOG'}
                  {currentLanguage === 'de' && 'KATALOG'}
                </Typography>

                {/* Section Hint */}
                {section.hint?.[currentLanguage] && (
                  <Typography sx={{
                    margin: 0,
                    fontFamily: 'Bebas Neue',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: 1.2,
                    letterSpacing: '0.00938em',
                    color: getColor(theme, 'textOnSvg'),
                    position: 'absolute',
                    left: isSmallDesktop ? '28px' : '-8px',
                    top: '1030px',
                    maxWidth: '800px',
                    opacity: 1,
                    zIndex: 1,
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-line',
                    hyphens: 'auto',
                    display: '-webkit-box',
                    WebkitLineClamp: '5',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    transform: 'none',
                    paddingLeft: '0'
                  }}>
                    {section.hint[currentLanguage]}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Technical Section */}
        <Box sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          px: 3,
          mt: '-600px',
          position: 'relative',
          height: '1900px',
          transform: 'none',
          transformOrigin: 'top left',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pl: isSmallDesktop ? '100px' : 0  // Добавляем отступ слева для small desktop
        }}>
          {/* Technical Drawings */}
          <Box
            sx={{
              position: 'absolute',
              top: '1366px',
              left: isSmallDesktop ? '-100px' : '-160px',  // Корректируем позицию для small desktop
              width: '584px',
              height: '513px',
              zIndex: 0,
              transform: 'none'
            }}
          >
            <CircleTopicMobileIcon className='w-[100%] h-[100%] object-contain transform' />
          </Box>

          {/* Technical Title */}
          {product.technicalTitle && (
            <Box
              sx={{
                position: 'absolute',
                left: isSmallDesktop ? '96px' : '30px',  // Корректируем позицию для small desktop
                top: '1354px',
                zIndex: 1,
                cursor: 'pointer',
                maxWidth: '400px',
                transform: 'none'
              }}
            >
              <Box sx={{
                width: '24px',
                height: '63px',
                background: getColor(theme, 'particle'),
                position: 'absolute',
                left: '-35px',
                top: '4px',
                zIndex: 2
              }} />
              <Typography
                variant="h2"
                sx={{
                  color: getColor(theme, 'title'),
                  fontFamily: 'Bebas Neue',
                  fontSize: '90px',
                  letterSpacing: '0',
                  fontWeight: 'normal',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  textAlign: 'left',
                  marginLeft: '0'
                }}
              >
                {product.technicalTitle[currentLanguage]?.split(' ')[0]}
              </Typography>
            </Box>
          )}

          {/* Technical Subtitle */}
          {product.technicalSubtitle && product.technicalSubtitle[currentLanguage]?.split(' ')[0] && (
            <Box
              sx={{
                position: 'absolute',
                left: isSmallDesktop ? '96px' : '30px',  // Корректируем позицию для small desktop
                top: '1445px',
                zIndex: 1,
                cursor: 'pointer',
                maxWidth: '400px',
                transform: 'none'
              }}
            >
              <Box sx={{
                width: '24px',
                height: '63px',
                background: getColor(theme, 'particle'),
                position: 'absolute',
                left: '-35px',
                top: '4px',
                zIndex: 2
              }} />
              <Typography
                variant="h2"
                sx={{
                  color: getColor(theme, 'title'),
                  fontFamily: 'Bebas Neue',
                  fontSize: '90px',
                  letterSpacing: '0',
                  fontWeight: 'normal',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  textAlign: 'left',
                  marginLeft: '0'
                }}
              >
                {product.technicalSubtitle[currentLanguage]?.split(' ')[0]}
              </Typography>
            </Box>
          )}

          {/* Technical Description */}
          {(() => {
            const words = product.technicalDescription?.[currentLanguage]?.split(' ').filter(word => word.trim()) || [];
            const displayWords = words.slice(0, 6);
            const formattedText = displayWords
              .reduce((acc, word, i) => {
                if (i % 2 === 0) {
                  acc.push([word]);
                } else {
                  acc[acc.length - 1].push(word);
                }
                return acc;
              }, [] as string[][])
              .map(pair => pair.join(' '))
              .join('\n');

            const content = (
              <Typography sx={{
                margin: 0,
                fontFamily: 'AdventProRegular',
                fontWeight: 400,
                fontSize: '32px',
                lineHeight: 1.2,
                letterSpacing: '0.00938em',
                color: getColor(theme, 'subtitle'),
                position: 'absolute',
                left: isSmallDesktop ? '102px' : '2px',  // Корректируем позицию для small desktop
                top: '1529px',
                width: '100%',
                textAlign: 'left',
                zIndex: 1,
                wordBreak: 'break-word',
                whiteSpace: 'pre-line',
                overflowWrap: 'break-word',
                hyphens: 'auto',
                cursor: words.length > 6 ? 'help' : 'default',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                opacity: 1,
                transform: 'none',
                userSelect: 'none'
              }}>
                {formattedText}
              </Typography>
            );

            return words.length > 6 ? (
              <Tooltip title={product.technicalDescription?.[currentLanguage]} placement="top" arrow>
                {content}
              </Tooltip>
            ) : content;
          })()}

          {/* Technical Word */}
          <Typography
            sx={{
              color: getColor(theme, 'svg.fill'),
              fontFamily: 'AdventProRegular',
              fontSize: '17px',
              fontWeight: 400,
              letterSpacing: '0.00938em',
              lineHeight: 1.2,
              maxWidth: '800px',
              position: 'absolute',
              left: isSmallDesktop ? '167px' : '110px',  // Корректируем позицию для small desktop
              top: '1830px',
              width: '100%',
              zIndex: 1,
              transform: 'none',
              WebkitTransform: 'none',
              MozTransform: 'none',
              msTransform: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none',
              m: 0
            }}
          >
            {currentLanguage === 'ru' && <span style={{ fontFamily: 'Bebas Neue' }}>КАТАЛОГ</span>}
            {currentLanguage === 'en' && 'CATALOG'}
            {currentLanguage === 'de' && 'KATALOG'}
          </Typography>

          {/* Technical Description Hint */}
          {product.technicalHint?.[currentLanguage] && (
            <Typography sx={{
              margin: 0,
              fontFamily: 'Bebas Neue',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: 1.2,
              letterSpacing: '0.00938em',
              color: getColor(theme, 'textOnSvg'),
              position: 'absolute',
              left: isSmallDesktop ? '386px' : '286px',  // Корректируем позицию для small desktop
              top: '1629px',
              maxWidth: '800px',
              opacity: 1,
              zIndex: 1,
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'pre-line',
              hyphens: 'auto',
              display: '-webkit-box',
              WebkitLineClamp: '11',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              transform: 'none',
              userSelect: 'none'
            }}>
              {product.technicalHint[currentLanguage]}
            </Typography>
          )}
        </Box>
      </Container>
      <Modal
        open={isHelpModalOpen}
        handleClose={handleCloseHelpModal}
        productInfo={productInfo || undefined}
      />
    </>
  );
};

export default ProductLanding; 