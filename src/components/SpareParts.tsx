import { useState, useEffect, useRef } from 'react';
import { Container, Typography, CircularProgress, Alert, useMediaQuery } from '@mui/material';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterListIcon from '@mui/icons-material/FilterList';
import pellets from '../assets/UI/Group 508.svg';
import sugar from '../assets/UI/Group 509.svg';
import feed from '../assets/UI/Group 510.svg';
import oil from '../assets/UI/Group 511.svg';
import waste from '../assets/UI/Group 512.svg';
import meat from '../assets/UI/Group 513.svg';
import { API_URL } from '../config';
import { useTranslation, Trans } from 'react-i18next';
import SEO from './SEO';
import { useSEO } from '../hooks/useSEO';

interface LocalizedText {
  ru: string;
  en: string;
  de: string;
}

interface ManufacturingSection {
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  hint: LocalizedText;
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

const SpareParts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [selectedGranulations, setSelectedGranulations] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [isGranulationOpen, setIsGranulationOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { t } = useTranslation();
  
  const isXSmallScreen = useMediaQuery('(max-width:800px)');
  const isSmallScreen = useMediaQuery('(max-width:1024px)');
  const isMediumScreen = useMediaQuery('(max-width:1366px)');
  const isLargeScreen = useMediaQuery('(max-width:1920px)');

  const granulationRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);

  const seoData = useSEO('spare-parts');
  
  const productSchemaData = {
    name: t('seo.spare-parts.title').replace(' | LKE Group GmbH', ''),
    description: seoData.description,
    image: `${window.location.origin}/images/spare-parts.jpg`,
    brand: 'LKE Group GmbH',
    category: 'Industrial Equipment > Pellet Mill Parts',
    availability: 'https://schema.org/InStock'
  };

  const applications = [
    { icon: pellets, label: t('products.applications.pellets') },
    { icon: sugar, label: t('products.applications.sugar') },
    { icon: feed, label: t('products.applications.feed') },
    { icon: oil, label: t('products.applications.oil') },
    { icon: waste, label: t('products.applications.waste') },
    { icon: meat, label: t('products.applications.meat') }
  ];

  const granulationTypes = [
    t('products.granulationTypes.granulation'),
    t('products.granulationTypes.extrusion'),
    t('products.granulationTypes.grinding'),
    t('products.granulationTypes.transport'),
    t('products.granulationTypes.cooling'),
    t('products.granulationTypes.storage'),
    t('products.granulationTypes.electrical')
  ];

  const productTypes = [
    t('products.types.flat'),
    t('products.types.ring'),
    t('products.types.clamp')
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedTypes, selectedApplications, selectedGranulations, selectedProductTypes]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (granulationRef.current && !granulationRef.current.contains(event.target as Node)) {
        setIsGranulationOpen(false);
      }
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setIsTypeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(false);
      
      const url = new URL(`${API_URL}/products`);
      
      if (selectedTypes.length > 0) {
        url.searchParams.append('category', selectedTypes.join(','));
      }
      
      if (selectedApplications.length > 0) {
        const applicationValues = selectedApplications.map(app => {
          const value = app === t('products.applications.pellets') ? 'pellets' :
            app === t('products.applications.sugar') ? 'sugar' :
            app === t('products.applications.feed') ? 'feed' :
            app === t('products.applications.oil') ? 'oil' :
            app === t('products.applications.waste') ? 'waste' :
            app === t('products.applications.meat') ? 'meat' : '';
          console.log(`Mapping application: ${app} -> ${value}`);
          return value;
        }).filter(Boolean);

        if (applicationValues.length > 0) {
          console.log('Final application values:', applicationValues);
          url.searchParams.append('application', applicationValues.join(','));
        }
      }

      if (selectedGranulations.length > 0) {
        const granulationValues = selectedGranulations.map(gran => {
          const value = gran === t('products.granulationTypes.granulation') ? 'granulation' :
            gran === t('products.granulationTypes.extrusion') ? 'extrusion' :
            gran === t('products.granulationTypes.grinding') ? 'grinding' :
            gran === t('products.granulationTypes.transport') ? 'transport' :
            gran === t('products.granulationTypes.cooling') ? 'cooling' :
            gran === t('products.granulationTypes.storage') ? 'storage' :
            gran === t('products.granulationTypes.electrical') ? 'electrical' : '';
          console.log(`Mapping granulation: ${gran} -> ${value}`);
          return value;
        }).filter(Boolean);
        
        if (granulationValues.length > 0) {
          console.log('Final granulation values:', granulationValues);
          url.searchParams.append('granulation', granulationValues.join(','));
        }
      }

      if (selectedProductTypes.length > 0) {
        const typeValues = selectedProductTypes.map(type => {
          const value = type === t('products.types.flat') ? 'flat' :
            type === t('products.types.ring') ? 'ring' :
            type === t('products.types.clamp') ? 'clamp' : '';
          console.log(`Mapping type: ${type} -> ${value}`);
          return value;
        }).filter(Boolean);
        
        if (typeValues.length > 0) {
          console.log('Final type values:', typeValues);
          url.searchParams.append('type', typeValues.join(','));
        }
      }

      console.log('Fetching products with URL:', url.toString());
      console.log('Selected filters:', {
        types: selectedTypes,
        applications: selectedApplications,
        granulations: selectedGranulations,
        productTypes: selectedProductTypes
      });
      
      const response = await fetch(url.toString());
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error response:', errorData);
        throw new Error(errorData.message || errorData.error || 'Failed to fetch products');
      }
      
      const data = await response.json();
      console.log('Received products:', data);
      setProducts(data.products || []);
      
      if (data.products.length === 0) {
        console.log('No products found with current filters');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGranulationSelect = (type: string | null) => {
    if (!type) {
      setSelectedGranulations([]);
    } else {
      setSelectedGranulations(prev => {
        if (prev.includes(type)) {
          return prev.filter(t => t !== type);
        }
        return [...prev, type];
      });
    }
  };

  const handleTypeSelect = (type: string | null) => {
    if (!type) {
      setSelectedProductTypes([]);
    } else {
      setSelectedProductTypes(prev => {
        if (prev.includes(type)) {
          return prev.filter(t => t !== type);
        }
        return [...prev, type];
      });
    }
  };

  const handleApplicationSelect = (app: string) => {
    setSelectedApplications(prev => {
      const isSelected = prev.includes(app);
      if (isSelected) {
        return prev.filter(a => a !== app);
      } else {
        return [...prev, app];
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center overflow-x-hidden w-full" style={{ userSelect: 'none' }}>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        article={false}
        product={productSchemaData}
        image={`${window.location.origin}/images/spare-parts-og.jpg`}
      />
      <div className="w-full max-w-[2560px] mx-auto flex flex-col items-center relative">
        <div className="w-full flex flex-col items-center justify-center py-8">
          <Container 
            maxWidth={false} 
            className="relative"
            sx={{
              maxWidth: '100% !important',
              width: '100%',
              margin: '0 auto',
              padding: isXSmallScreen 
                ? '12px 12px 48px 12px'
                : isSmallScreen 
                ? '16px 16px 64px 16px'
                : isMediumScreen 
                ? '24px 40px 80px 40px'
                : isLargeScreen
                ? '24px 74px 98px 74px'
                : '32px 120px 120px 120px',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflowX: 'hidden',
              '& *': {
                fontFamily: 'AdventProRegular',
                fontSize: isXSmallScreen 
                  ? '14px'
                  : isSmallScreen 
                  ? '16px'
                  : isMediumScreen 
                  ? '18px'
                  : '20px',
                userSelect: 'none'
              }
            }}
          >
            {/* Breadcrumbs */}
            <div className="w-full max-w-[1440px] flex items-center gap-2 mb-6" style={{ 
              userSelect: 'none', 
              cursor: 'default',
              paddingLeft: isXSmallScreen 
                ? '24px'
                : isSmallScreen 
                ? '40px'
                : isMediumScreen 
                ? '68px'
                : '70px'
            }}>
              <Link 
                to="/"
                className="text-[#A19F9B] hover:text-[#D5CDBD] font-[LabGrotesque] text-[14px] opacity-50 hover:opacity-100 transition-all duration-300"
                style={{
                  cursor: 'default',
                  userSelect: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  pointerEvents: 'none'
                }}
              >
                {t('common.home')}
              </Link>
              <span className="text-[#A19F9B] font-[LabGrotesque] text-[14px] opacity-50" style={{ cursor: 'default', userSelect: 'none' }}>›</span>
              <span className="text-[#D5CDBD] font-[LabGrotesque] text-[14px] opacity-100" style={{ cursor: 'default', userSelect: 'none' }}>{t('products.title')}</span>
            </div>

            {/* Title */}
            <div className="w-full max-w-[1440px] flex flex-col items-center">
              <h1 
                className="text-[#82653E] opacity-100 transition-opacity duration-300 w-full" 
                style={{ 
                  marginTop: '189px',
                  fontFamily: 'Bebas Neue',
                  fontSize: '77px',
                  lineHeight: '68px',
                  letterSpacing: '4.5px',
                  position: 'relative',
                  userSelect: 'none',
                  marginBottom: '40px',
                  whiteSpace: 'nowrap',
                  paddingLeft: isXSmallScreen 
                    ? '24px'
                    : isSmallScreen 
                    ? '40px'
                    : isMediumScreen 
                    ? '68px'
                    : '70px'
                }}
              >
                {t('products.pageTitle')}
                <div 
                  style={{
                    position: 'absolute',
                    left: '450px',
                    top: '34px',
                    width: isXSmallScreen 
                      ? '308px'
                      : isSmallScreen 
                      ? '308px'
                      : isMediumScreen 
                      ? '676px'
                      : '1044px',
                    height: '1px',
                    backgroundColor: '#554F45',
                    opacity: 0.5,
                    userSelect: 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
              </h1>

              <div className={`${isSmallScreen ? 'flex-col' : 'flex-row'} flex gap-8 w-full max-w-[1440px] justify-center`} style={{
                marginLeft: isXSmallScreen 
                  ? '12px'
                  : isSmallScreen 
                  ? '16px'
                  : isMediumScreen 
                  ? '60px'
                  : '104px'
              }}>
                {/* Mobile filters button */}
                {isSmallScreen && (
                  <button
                    onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                    className="flex items-center justify-center gap-2 w-full bg-[#202020] text-[#D5CDBD] py-3 mt-4 rounded"
                  >
                    <FilterListIcon />
                    {t('products.filters.showFilters')}
                  </button>
                )}

                {/* Left column with filters */}
                <div className={`
                  ${isSmallScreen ? 'w-full' : 'w-[351px]'} 
                  shrink-0 flex flex-col gap-6
                  ${isSmallScreen ? (isMobileFiltersOpen ? 'block' : 'hidden') : 'block'}
                `}>
                  {/* Гранулирование */}
                  <div className="relative" ref={granulationRef}>
                    <button
                      onClick={() => {
                        setIsTypeOpen(false);
                        setIsGranulationOpen(!isGranulationOpen);
                      }}
                      className="flex items-center justify-between text-[#A19F9B] hover:text-[#D5CDBD] px-4 transition-colors font-[AdventProRegular] bg-[rgb(32_32_32_/_var(--tw-bg-opacity,1))] rounded"
                      style={{ 
                        width: '351px',
                        height: '55px',
                        opacity: selectedGranulations.length > 0 ? 1 : 0.5,
                      }}
                    >
                      <span className="text-[20px]">{t('products.filters.select')}</span>
                      <KeyboardArrowDownIcon
                        className={`transform transition-transform ${isGranulationOpen ? 'rotate-180' : ''}`}
                        sx={{ color: 'currentColor' }}
                      />
                    </button>
                    {isGranulationOpen && (
                      <div 
                        className="absolute left-0 mt-1 bg-[rgb(32_32_32_/_var(--tw-bg-opacity,1))] rounded overflow-hidden p-1"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          marginTop: '4px',
                          width: '351px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                      >
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                          <button
                            onClick={() => {
                              setSelectedGranulations([]);
                              setIsGranulationOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 hover:bg-[#2A2A2A] transition-colors text-[#A19F9B] rounded mb-1`}
                          >
                            {t('products.filters.reset')}
                          </button>
                          {granulationTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => handleGranulationSelect(type)}
                              className={`w-full text-left px-4 py-3 hover:bg-[#2A2A2A] transition-colors rounded mb-1 ${
                                selectedGranulations.includes(type) ? 'text-[#D5CDBD] bg-[#2A2A2A]' : 'text-[#A19F9B]'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Тип */}
                  <div className="relative" ref={typeRef} style={{ marginTop: isGranulationOpen ? '320px' : '24px' }}>
                    <button
                      onClick={() => {
                        setIsGranulationOpen(false);
                        setIsTypeOpen(!isTypeOpen);
                      }}
                      className="flex items-center justify-between text-[#A19F9B] hover:text-[#D5CDBD] px-4 transition-colors font-[AdventProRegular] bg-[rgb(32_32_32_/_var(--tw-bg-opacity,1))] rounded"
                      style={{ 
                        width: '351px',
                        height: '55px',
                        opacity: selectedProductTypes.length > 0 ? 1 : 0.5,
                      }}
                    >
                      <span className="text-[20px]">{t('products.filters.select')}</span>
                      <KeyboardArrowDownIcon
                        className={`transform transition-transform ${isTypeOpen ? 'rotate-180' : ''}`}
                        sx={{ color: 'currentColor' }}
                      />
                    </button>
                    {isTypeOpen && (
                      <div 
                        className="absolute left-0 mt-1 bg-[rgb(32_32_32_/_var(--tw-bg-opacity,1))] rounded overflow-hidden p-1"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          marginTop: '4px',
                          width: '351px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                      >
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                          <button
                            onClick={() => {
                              setSelectedProductTypes([]);
                              setIsTypeOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 hover:bg-[#2A2A2A] transition-colors text-[#A19F9B] rounded mb-1`}
                          >
                            {t('products.filters.reset')}
                          </button>
                          {productTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => handleTypeSelect(type)}
                              className={`w-full text-left px-4 py-3 hover:bg-[#2A2A2A] transition-colors rounded mb-1 ${
                                selectedProductTypes.includes(type) ? 'text-[#D5CDBD] bg-[#2A2A2A]' : 'text-[#A19F9B]'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Тип продукта */}
                  <div style={{ marginTop: isTypeOpen ? '320px' : '24px' }}>
                    <Typography 
                      variant="h6" 
                      className="text-[#D5CDBD] mb-4 font-[AdventProRegular]"
                      sx={{
                        fontSize: '29px',
                        fontFamily: 'AdventProRegular',
                        opacity: 1,
                        lineHeight: '29px',
                        letterSpacing: '0%',
                        marginBottom: '24px'
                      }}
                    >
                      {t('products.filters.productType')}
                    </Typography>
                    <div className="flex flex-col gap-4">
                      {[
                        { value: 'matrices', label: t('products.filters.matrices') },
                        { value: 'shells', label: t('products.filters.shells') },
                        { value: 'spare-parts', label: t('products.filters.spareParts') }
                      ].map((type) => (
                        <button
                          key={type.value}
                          onClick={() => {
                            setSelectedTypes(prev => {
                              const isSelected = prev.includes(type.value);
                              return isSelected 
                                ? prev.filter(t => t !== type.value)
                                : [...prev, type.value];
                            });
                          }}
                          className="flex items-center gap-3 text-left transition-all duration-300 pl-[2px]"
                        >
                          <div 
                            className={`w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center
                              ${selectedTypes.includes(type.value) 
                                ? 'border-[#82653E] bg-[#82653E]' 
                                : 'border-[#A19F9B] opacity-50'
                              }
                              hover:border-[#82653E]
                            `}
                          >
                            {selectedTypes.includes(type.value) && (
                              <div className="w-[8px] h-[8px] rounded-full bg-white" />
                            )}
                          </div>
                          <span 
                            className="font-[AdventProRegular] text-[20px]"
                            style={{
                              color: selectedTypes.includes(type.value) ? '#82653E' : '#A19F9B',
                              opacity: selectedTypes.includes(type.value) ? 1 : 0.5
                            }}
                          >
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Области применения */}
                  <div>
                    <Typography 
                      variant="h6" 
                      className="text-[#D5CDBD] mb-4 font-[AdventProRegular]"
                      sx={{
                        fontSize: '29px',
                        fontFamily: 'AdventProRegular',
                        opacity: 1,
                        lineHeight: '29px',
                        letterSpacing: '0%',
                        marginBottom: '24px'
                      }}
                    >
                      {t('products.filters.applicationsTitle')}
                    </Typography>
                    <div className="flex flex-col gap-[16px]">
                      {applications.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleApplicationSelect(item.label)}
                          className={`flex items-center gap-3 text-left transition-all duration-300 font-[AdventProRegular] text-[20px] ${
                            selectedApplications.includes(item.label)
                              ? 'text-[#82653E]' 
                              : 'text-[#A19F9B] hover:text-[#D5CDBD]'
                          }`}
                        >
                          <div className={`w-[48px] h-[48px] rounded-full flex items-center justify-center ${
                            selectedApplications.includes(item.label)
                              ? 'relative after:content-[""] after:absolute after:inset-[-4px] after:border-2 after:border-[#D5CDBD] after:rounded-full' 
                              : ''
                          }`}>
                            <img 
                              src={item.icon} 
                              alt="" 
                              className="w-[46px] h-[46px]"
                              style={{
                                filter: 'brightness(0) saturate(100%) invert(42%) sepia(14%) saturate(1013%) hue-rotate(353deg) brightness(91%) contrast(89%)',
                                opacity: selectedApplications.includes(item.label) ? 1 : 0.5,
                                userSelect: 'none',
                                pointerEvents: 'none'
                              }}
                              draggable="false"
                              onContextMenu={(e) => e.preventDefault()}
                            />
                          </div>
                          <span 
                            className="font-[AdventProRegular] text-[20px]"
                            style={{
                              opacity: selectedApplications.includes(item.label) ? 1 : 0.5,
                              color: selectedApplications.includes(item.label) ? '#82653E' : '#A19F9B',
                              lineHeight: 'normal',
                              letterSpacing: '0%'
                            }}
                          >
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right column with products */}
                <div className={`flex-1 ${isSmallScreen ? 'mt-6' : 'mt-0'} flex flex-col items-center`} style={{ 
                  position: 'relative',
                  marginBottom: '40px',
                  minHeight: '600px',
                  maxWidth: '1028px'
                }}>
                  <div 
                    style={{ 
                      width: '100%',
                      marginRight: 'auto',
                      marginLeft: 'auto',
                      maxWidth: '1028px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      alignItems: 'center'
                    }}
                  >
                    {loading ? (
                      <div className="flex-1 flex justify-center items-center min-h-[600px]">
                        <CircularProgress sx={{ color: '#D5CDBD' }} />
                      </div>
                    ) : error ? (
                      <div className="flex-1 flex justify-center items-center min-h-[600px]">
                        <Alert severity="error">
                          <Trans i18nKey="products.error">
                            Failed to load products. Please try again later.
                          </Trans>
                        </Alert>
                      </div>
                    ) : products.length > 0 ? (
                      <div 
                        className={`grid ${isSmallScreen ? 'grid-cols-1' : isMediumScreen ? 'grid-cols-2' : 'grid-cols-3'}`}
                        style={{ 
                          padding: 0,
                          display: 'grid',
                          gridTemplateColumns: isXSmallScreen 
                            ? 'repeat(1, 308px)'
                            : isSmallScreen 
                            ? 'repeat(1, 308px)'
                            : isMediumScreen 
                            ? 'repeat(2, 308px)'
                            : 'repeat(3, 308px)',
                          gap: '60px',
                          alignItems: 'start',
                          marginBottom: '40px',
                          justifyContent: 'center',
                          width: '100%',
                          margin: '0 auto'
                        }}
                      >
                        {products
                          .map((product, index) => (
                            <div 
                              key={product.id} 
                              style={{ 
                                width: '308px',
                                margin: '0 auto',
                                opacity: 0,
                                animation: `fadeInCard 0.3s ease-in-out ${index * 0.05}s forwards`
                              }}
                            >
                              <ProductCard 
                                product={product}
                              />
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="flex-1 flex justify-center items-center min-h-[600px] w-full">
                        <Typography 
                          variant="h6" 
                          className="text-[#A19F9B] text-center font-[AdventProRegular] text-[20px]"
                          sx={{
                            opacity: 0.5,
                            maxWidth: '100%',
                            userSelect: 'none'
                          }}
                        >
                          {t('products.noProducts')}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default SpareParts; 