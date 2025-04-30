import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, CircularProgress, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams, Navigate } from 'react-router-dom';
import button from '../assets/UI/Btn.svg';
import CountButton from './CountButton';
import Modal from './Modal';
import QuestionIcon from './customIcons/QuestionIcon';
import { API_URL } from '../config';
import SEO from './SEO';
import { useSEO } from '../hooks/useSEO';
import circleTopicMobile from '../assets/producs/circle_topic_mobile.svg';

interface ProductInfo {
  id: string;
  title: string;
  category: string;
}

interface MobileProductLandingProps {
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
  sectionImages: string[];
  activeImageUrl?: string;
  technicalTitle?: {
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
  technicalSubtitle?: {
    ru: string;
    en: string;
    de: string;
  };
}

const TooltipWrapper: React.FC<{ text: string; maxLines: number; customStyles?: React.CSSProperties }> = ({ text, maxLines, customStyles }) => {
  const textRef = React.useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

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
        fontSize: '24px',
        lineHeight: 1.2,
        color: '#D5CDBD',
        width: '100%',
        textAlign: 'left',
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        mb: 2,
        opacity: 0.8,
        ...customStyles
      }}
    >
      {text}
      {isOverflowing && ' ...'}
    </Typography>
  );

  if (isOverflowing) {
    return (
      <Tooltip title={text} placement="top" arrow>
        {content}
      </Tooltip>
    );
  }

  return content;
};

const SectionTitle: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(' ')
    .filter(word => word.trim())
    .map(word => word.length > 15 ? word.substring(0, 15) + '...' : word);

  // Always show one word per line for manufacturing sections
  const lines = words.slice(0, 3);

  if (lines.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', position: 'relative', gap: '8px' }}>
      {lines.map((word, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            gap: '16px'
          }}
        >
          <div
            style={{
              width: '15px',
              height: '42px',
              backgroundColor: '#544B3C',
              flexShrink: 0
            }}
          />
          <Typography 
            variant="h2" 
            sx={{
              color: '#969284',
              fontFamily: 'Bebas Neue',
              fontSize: '52px',
              letterSpacing: '0',
              fontWeight: 'normal',
              lineHeight: 1,
              textTransform: 'uppercase',
              whiteSpace: 'normal',
              overflow: 'visible',
              maxWidth: 'none',
              width: 'auto',
              textAlign: 'left',
              userSelect: 'none'
            }}
          >
            {word}
          </Typography>
        </div>
      ))}
    </div>
  );
};

const TechnicalTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  const titleWords = title?.split(' ').filter(word => word.trim()) || [];
  const subtitleWords = subtitle?.split(' ').filter(word => word.trim()) || [];

  // Get first word from each line
  const firstLine = titleWords[0] || '';
  const secondLine = subtitleWords[0] || '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', position: 'relative', gap: '8px' }}>
      {/* First line */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
          gap: '16px'
        }}
      >
        <div
          style={{
            width: '15px',
            height: '42px',
            backgroundColor: '#544B3C',
            flexShrink: 0
          }}
        />
        <Typography 
          variant="h2" 
          sx={{
            color: '#969284',
            fontFamily: 'Bebas Neue',
            fontSize: '52px',
            letterSpacing: '0',
            fontWeight: 'normal',
            lineHeight: 1,
            textTransform: 'uppercase',
            whiteSpace: 'normal',
            overflow: 'visible',
            maxWidth: 'none',
            width: 'auto',
            textAlign: 'left',
            userSelect: 'none'
          }}
        >
          {firstLine}
        </Typography>
      </div>

      {/* Second line */}
      {secondLine && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            gap: '16px'
          }}
        >
          <div
            style={{
              width: '15px',
              height: '42px',
              backgroundColor: '#544B3C',
              flexShrink: 0
            }}
          />
          <Typography 
            variant="h2" 
            sx={{
              color: '#969284',
              fontFamily: 'Bebas Neue',
              fontSize: '52px',
              letterSpacing: '0',
              fontWeight: 'normal',
              lineHeight: 1,
              textTransform: 'uppercase',
              whiteSpace: 'normal',
              overflow: 'visible',
              maxWidth: 'none',
              width: 'auto',
              textAlign: 'left',
              userSelect: 'none'
            }}
          >
            {secondLine}
          </Typography>
        </div>
      )}
    </div>
  );
};

const MobileProductLanding: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const currentLanguage = i18n.language as 'ru' | 'en' | 'de';
  const [product, setProduct] = useState<MobileProductLandingProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [productInfo, setProductInfo] = useState<ProductInfo | undefined>(undefined);

  const seoData = useSEO('product', product ? {
    productName: product.title[currentLanguage],
    productDescription: product.description[currentLanguage],
    category: t(`products.categories.${product.category || 'default'}`),
  } : undefined);

  const formatPrice = (price: string): string => {
    const cleanPrice = price.replace(/[^\d.]/g, '');
    const number = parseFloat(cleanPrice);
    
    if (isNaN(number)) return price;

    if (number >= 1000000) {
      return `${Math.floor(number / 1000000)}M €`;
    }

    if (number >= 1000) {
      return `${Math.floor(number / 1000)}K €`;
    }
    
    if (number % 1 === 0) {
      return `${Math.floor(number)} €`;
    }

    return `${number.toFixed(1)} €`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (location.state) {
          setProduct(location.state as MobileProductLandingProps);
          const response = await fetch(`${API_URL}/products/${id}`);
          if (!response.ok) {
            return;
          }
          const apiData = await response.json();
          if (apiData.activeImageUrl !== (location.state as MobileProductLandingProps).activeImageUrl) {
            setProduct(apiData);
          }
          return;
        }

        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();

        if (!data.title || !data.description) {
          throw new Error('Invalid product data');
        }

        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, location.state]);

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

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={product.imageUrl}
        article={true}
      />
      <Container 
        maxWidth={false} 
        component="main"
        sx={{ 
          minHeight: '100vh',
          color: '#fff',
          pt: 2,
          pb: 8,
          px: 2,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Box 
            component="figure"
            sx={{ 
              width: '100%',
              aspectRatio: '1/1',
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              mb: 2
            }}
          >
            <img
              src={product.imageUrl}
              alt={`Product ${product.title[currentLanguage]}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </Box>

          {/* Help button */}
          <Box
            component="nav"
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: '100%',
              mb: 2
            }}
          >
            <button
              className='font-labgrotesque text-[16px] text-navSelect flex flex-row items-center hover:text-blue_'
              onClick={handleOpenHelpModal}
            >
              <QuestionIcon className='w-[24px] h-[24px] mr-1' />
              <span>{t('titleBlock.needHelp')}</span>
            </button>
          </Box>

          {/* Main product section */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            mb: 6
          }}>
            {/* Product Info */}
            <Box sx={{ width: '100%' }}>
              {/* Title */}
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                mb: 2,
                maxWidth: '100%'
              }}>
                {(() => {
                  const words = product.title[currentLanguage].split(' ');
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
                        lines.push(word.substring(0, 14));
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
                        color: '#554F45',
                        fontFamily: 'Bebas Neue',
                        fontSize: { xs: '42px', sm: '48px' },
                        letterSpacing: '0',
                        lineHeight: 0.9,
                        textTransform: 'uppercase',
                        fontWeight: 'normal',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
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

              {/* Subtitle */}
              {product.subtitle && (
                <TooltipWrapper
                  text={product.subtitle[currentLanguage]}
                  maxLines={2}
                />
              )}

              {/* Price Button */}
              <CountButton
                className="w-[282px] max-w-full aspect-[282/58] font-bebas text-white text-[24px] flex items-center justify-center bg-contain bg-no-repeat mt-4"
                src={button}
                defaultValue={product.price ? formatPrice(product.price) : t('products.onRequest')}
                onClick={handleOpenHelpModal}
              />
            </Box>
          </Box>

          {/* Description */}
          <Box sx={{ 
            display: 'flex',
            gap: 2,
            mb: 8,
            position: 'relative',
            alignItems: 'center'
          }}>
            <Box sx={{ 
              width: '60px', 
              height: '60px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderRadius: '50%',
              overflow: 'visible',
              alignSelf: 'center'
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
                <Typography sx={{ color: '#605C54', fontSize: '12px', textAlign: 'center', p: 1 }}>
                  No logo
                </Typography>
              )}
            </Box>
            <TooltipWrapper
              text={product.description[currentLanguage]}
              maxLines={4}
              customStyles={{
                width: '100%',
                height: 'auto',
                minHeight: '80px',
                fontFamily: 'Bebas Neue',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '26px',
                letterSpacing: '0%',
                display: '-webkit-box',
                WebkitLineClamp: '4',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                color: '#969284'
              }}
            />
          </Box>

          {/* Manufacturing Sections */}
          <Box sx={{ 
            maxWidth: '100%',
            margin: '0 auto',
            mt: -0,
            position: 'relative',
            height: `${600 + (product.manufacturingSections?.length || 0) * (600)}px`,
            transform: 'none',
            overflow: 'visible'
          }}>
            {product.manufacturingSections?.map((section, index) => {
              const imagePath = product.sectionImages?.[index];
              const fullImageUrl = imagePath?.startsWith('http') 
                ? imagePath 
                : `${API_URL.replace('/api', '')}${imagePath}`;
              
              return (
                <Box key={index} sx={{
                  width: 'calc(100% + 40px)',
                  height: '600px',
                  position: 'relative',
                  mt: index > 0 ? 10 : 0,
                  transform: 'none',
                  ml: '-20px',
                  mr: '-20px',
                  overflow: 'visible'
                }}>
                  {/* Background Circle */}
                  {imagePath && (
                    <Box sx={{
                      position: 'absolute',
                      width: '276px',
                      height: '350px',
                      left: '49px',
                      top: '311px',
                      zIndex: 2,
                      transform: 'none',
                      opacity: 0.7,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'visible'
                    }}>
                      <img
                        src={fullImageUrl}
                        alt="Background shape"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          transform: 'scale(1.2)',
                          opacity: 0.7,
                          position: 'relative',
                          userSelect: 'none',
                          pointerEvents: 'none'
                        }}
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                        onError={(e) => {
                          console.error('Error loading section image:', fullImageUrl);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </Box>
                  )}

                  {/* Technical Drawings */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '38px',
                      left: '-20px',
                      width: '292px',
                      height: '256px',
                      zIndex: 0,
                      transform: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={circleTopicMobile}
                      alt="Technical precision scheme"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transform: 'scale(1.2)',
                        opacity: 0.7,
                        userSelect: 'none',
                        pointerEvents: 'none'
                      }}
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </Box>

                  {/* Content Container */}
                  <Box sx={{
                    position: 'relative',
                    height: '100%',
                    pt: '-12px',
                    pl: '20px',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    {/* Top Content */}
                    <Box>
                      {/* Section Title */}
                      <Box sx={{
                        maxWidth: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                        alignItems: 'flex-start',
                        transform: 'none',
                        mb: 3
                      }}>
                        <SectionTitle text={section.title[currentLanguage]} />
                      </Box>

                      {/* Section Description */}
                      <Typography sx={{
                        margin: 0,
                        fontFamily: 'AdventProRegular',
                        fontWeight: 400,
                        fontSize: '32px',
                        lineHeight: 1.2,
                        letterSpacing: '0.00938em',
                        color: '#D5CDBD',
                        maxWidth: '280px',
                        width: '100%',
                        textAlign: 'left',
                        mt: '20px',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-line',
                        overflowWrap: 'break-word',
                        hyphens: 'auto',
                        display: '-webkit-box',
                        WebkitLineClamp: '3',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        opacity: 1,
                        transform: 'none',
                        userSelect: 'none'
                      }}>
                        {section.description[currentLanguage]}
                      </Typography>
                    </Box>

                    {/* Bottom Content */}
                    <Box sx={{ 
                      position: 'absolute',
                      bottom: 0,
                      left: '20px',
                      width: '100%',
                      pb: 3
                    }}>
                      {/* Section Word */}
                      <Typography sx={{
                        position: 'absolute',
                        bottom: '295px',
                        left: '70px',
                        color: '#2C2D2F',
                        fontFamily: 'AdventProRegular',
                        fontSize: '24px',
                        fontWeight: 400,
                        letterSpacing: '0.00938em',
                        lineHeight: 1.2,
                        margin: '0px',
                        maxWidth: '200px',
                        opacity: 0.26,
                        width: '100%',
                        transform: 'none',
                        userSelect: 'none'
                      }}>
                        {currentLanguage === 'ru' && <span style={{ fontFamily: 'Bebas Neue' }}>КАТАЛОГ</span>}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Technical Section */}
          {product.technicalTitle && (
            <Box sx={{ 
              width: 'calc(100% + 40px)',
              margin: '0 auto',
              mt: -40,
              position: 'relative',
              height: '600px',
              transform: 'none',
              ml: '-20px',
              mr: '-20px',
              overflow: 'visible'
            }}>
              {/* Technical Drawings */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '38px',
                  left: '-20px',
                  width: '292px',
                  height: '256px',
                  zIndex: 0,
                  transform: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={circleTopicMobile}
                  alt="Technical precision scheme"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transform: 'scale(1.2)',
                    opacity: 0.7,
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Box>

              {/* Content Container */}
              <Box sx={{
                position: 'relative',
                height: '100%',
                pt: '-11px',
                pl: '20px',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {/* Top Content */}
                <Box>
                  {/* Technical Title */}
                  <Box sx={{
                    maxWidth: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                    alignItems: 'flex-start',
                    transform: 'none',
                    mb: 3
                  }}>
                    <TechnicalTitle title={product.technicalTitle[currentLanguage]} subtitle={product.technicalSubtitle?.[currentLanguage]} />
                  </Box>

                  {/* Technical Description */}
                  <Typography sx={{
                    margin: 0,
                    fontFamily: 'AdventProRegular',
                    fontWeight: 400,
                    fontSize: '32px',
                    lineHeight: 1.2,
                    letterSpacing: '0.00938em',
                    color: '#D5CDBD',
                    maxWidth: '280px',
                    width: '100%',
                    textAlign: 'left',
                    mt: '20px',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-line',
                    overflowWrap: 'break-word',
                    hyphens: 'auto',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    opacity: 1,
                    transform: 'none',
                    userSelect: 'none'
                  }}>
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

                      return formattedText;
                    })()}
                  </Typography>
                </Box>

                {/* Bottom Content */}
                <Box sx={{ 
                  position: 'absolute',
                  bottom: 0,
                  left: '20px',
                  width: '100%',
                  pb: 3
                }}>
                  {/* Technical Hint */}
                  {product.technicalHint && (
                    <Typography sx={{
                      margin: 0,
                      fontFamily: 'Bebas Neue',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: 1.2,
                      letterSpacing: '0.00938em',
                      color: '#969284',
                      maxWidth: '280px',
                      opacity: 0.4,
                      mb: 2,
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-line',
                      overflowWrap: 'break-word',
                      hyphens: 'auto',
                      display: '-webkit-box',
                      WebkitLineClamp: '3',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      transform: 'none',
                      position: 'absolute',
                      bottom: '198px',
                      left: '0',
                      userSelect: 'none'
                    }}>
                      {product.technicalHint[currentLanguage]}
                    </Typography>
                  )}

                  {/* Technical Word */}
                  <Typography sx={{
                    position: 'absolute',
                    bottom: '295px',
                    left: '70px',
                    transform: 'none',
                    color: '#2C2D2F',
                    fontFamily: 'AdventProRegular',
                    fontSize: '24px',
                    fontWeight: 400,
                    letterSpacing: '0.00938em',
                    lineHeight: 1.2,
                    margin: '0px',
                    maxWidth: '200px',
                    opacity: 0.26,
                    width: '100%',
                    textAlign: 'left',
                    userSelect: 'none'
                  }}>
                    {currentLanguage === 'ru' && <span style={{ fontFamily: 'Bebas Neue' }}>КАТАЛОГ</span>}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Container>

      <Modal
        open={isHelpModalOpen}
        handleClose={handleCloseHelpModal}
        productInfo={productInfo}
      />
    </>
  );
};

export default MobileProductLanding; 