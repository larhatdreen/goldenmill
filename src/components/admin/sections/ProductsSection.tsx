import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../config';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Box,
  Paper,
  IconButton,
  MenuItem,
  Alert,
  Snackbar,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface ManufacturingSection {
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  hint: LocalizedText;
  backgroundImage?: string;
}

interface LocalizedText {
  ru: string;
  en: string;
  de: string;
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

interface ApiError {
  message: string;
}

function isApiError(error: unknown): error is ApiError {
  return error !== null && typeof error === 'object' && 'message' in error;
}

const ProductsSection = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: '',
    title: { de: '', en: '', ru: '' },
    description: { de: '', en: '', ru: '' },
    imageUrl: '',
    category: '',
    application: [],
    granulation: [],
    type: [],
    price: '',
    manufacturingSections: [{
      title: { de: '', en: '', ru: '' },
      subtitle: { de: '', en: '', ru: '' },
      description: { de: '', en: '', ru: '' },
      hint: { de: '', en: '', ru: '' }
    }],
    sectionImages: [],
    technicalTitle: {
      de: '',
      en: '',
      ru: ''
    },
    technicalSubtitle: {
      de: '',
      en: '',
      ru: ''
    },
    technicalDescription: {
      de: '',
      en: '',
      ru: ''
    },
    technicalHint: {
      de: '',
      en: '',
      ru: ''
    }
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedActiveFile, setSelectedActiveFile] = useState<File | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [activePreviewUrl, setActivePreviewUrl] = useState<string>('');
  const [mainImageError, setMainImageError] = useState<string | null>(null);
  const [logoImageError, setLogoImageError] = useState<string | null>(null);
  const [selectedBackgroundCircleFiles, setSelectedBackgroundCircleFiles] = useState<(File | null)[]>([null]);
  const [backgroundCircleErrors, setBackgroundCircleErrors] = useState<(string | null)[]>([null]);
  const [activeTab, setActiveTab] = useState('catalog');

  const categories = [
    { value: 'granulators', label: t('products.granulators') },
    { value: 'mixers', label: t('products.mixers') },
    { value: 'spare-parts', label: t('products.spare-parts') }
  ];

  const applications = [
    { value: 'pellets', label: t('products.applications.pellets') },
    { value: 'sugar', label: t('products.applications.sugar') },
    { value: 'feed', label: t('products.applications.feed') },
    { value: 'oil', label: t('products.applications.oil') },
    { value: 'waste', label: t('products.applications.waste') },
    { value: 'meat', label: t('products.applications.meat') }
  ];

  const granulationTypes = [
    { value: 'granulation', label: t('products.granulationTypes.granulation') },
    { value: 'extrusion', label: t('products.granulationTypes.extrusion') },
    { value: 'grinding', label: t('products.granulationTypes.grinding') },
    { value: 'transport', label: t('products.granulationTypes.transport') },
    { value: 'cooling', label: t('products.granulationTypes.cooling') },
    { value: 'storage', label: t('products.granulationTypes.storage') },
    { value: 'electrical', label: t('products.granulationTypes.electrical') }
  ];

  const productTypes = [
    { value: 'flat', label: t('products.types.flat') },
    { value: 'ring', label: t('products.types.ring') },
    { value: 'clamp', label: t('products.types.clamp') }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('Не удалось загрузить продукты');
      showNotification(t('admin.products.error'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct({
      id: '',
      title: {
        de: '',
        en: '',
        ru: ''
      },
      subtitle: {
        de: '',
        en: '',
        ru: ''
      },
      description: {
        de: '',
        en: '',
        ru: ''
      },
      imageUrl: '',
      category: 'spare-parts',
      application: [],
      granulation: [],
      type: [],
      price: '',
      manufacturingSections: [{
        title: { de: '', en: '', ru: '' },
        subtitle: { de: '', en: '', ru: '' },
        description: { de: '', en: '', ru: '' },
        hint: { de: '', en: '', ru: '' }
      }],
      sectionImages: [],
      technicalTitle: {
        de: '',
        en: '',
        ru: ''
      },
      technicalSubtitle: {
        de: '',
        en: '',
        ru: ''
      },
      technicalDescription: {
        de: '',
        en: '',
        ru: ''
      },
      technicalHint: {
        de: '',
        en: '',
        ru: ''
      }
    });
    setPreviewUrl('');
    setActivePreviewUrl('');
    setSelectedFile(null);
    setSelectedActiveFile(null);
    setSelectedBackgroundCircleFiles([null]);
    setBackgroundCircleErrors([null]);
    setOpenDialog(true);
  };

  const handleEditProduct = (product: Product) => {
    // Инициализируем состояния для существующих секций
    const initialBackgroundCircleFiles = (product.manufacturingSections || []).map(() => null);
    const initialBackgroundCircleErrors = (product.manufacturingSections || []).map(() => null);

    setCurrentProduct({
      ...product,
      manufacturingSections: (product.manufacturingSections || []).map((section, index) => ({
        ...section,
        backgroundImage: product.sectionImages[index] || ''
      }))
    });
    setPreviewUrl(product.imageUrl);
    setActivePreviewUrl(product.activeImageUrl || '');
    setSelectedBackgroundCircleFiles(initialBackgroundCircleFiles);
    setBackgroundCircleErrors(initialBackgroundCircleErrors);
    setOpenDialog(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedProductId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      
      await fetchProducts();
      setDeleteDialogOpen(false);
      setSelectedProductId(null);
      showNotification(t('admin.products.notification.delete'), 'success');
    } catch (error) {
      console.error('Failed to delete product:', error);
      showNotification(t('admin.products.notification.deleteError'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        event.target.value = '';
        setMainImageError(t('admin.products.notification.fileSizeError'));
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        event.target.value = '';
        setMainImageError(t('admin.products.notification.fileTypeError'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        if (img.width !== 700 || img.height !== 700) {
          event.target.value = '';
          setMainImageError(t('admin.products.notification.imageDimensionsError'));
          return;
        }
        
        setMainImageError(null);
        setSelectedFile(file);
        setPreviewUrl(img.src);
      };

      img.onerror = () => {
        event.target.value = '';
        setMainImageError(t('admin.products.notification.imageLoadError'));
      };

      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const validateLogoImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (img.width !== 132 || img.height !== 132) {
            reject(new Error(t('admin.products.notification.logoDimensionsError')));
          } else if (file.size > 2 * 1024 * 1024) {
            reject(new Error(t('admin.products.notification.logoFileSizeError')));
          } else {
            resolve(img.src);
          }
        };
        img.onerror = () => {
          reject(new Error(t('admin.products.notification.imageLoadError')));
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        reject(new Error(t('admin.products.notification.imageLoadError')));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleActiveFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await validateLogoImage(file);
        setLogoImageError(null);
        setSelectedActiveFile(file);
        setActivePreviewUrl(dataUrl);
      } catch (error) {
        console.error('Failed to validate logo image:', error);
        setLogoImageError(error instanceof Error ? error.message : t('admin.products.notification.imageLoadError'));
        event.target.value = '';
      }
    }
  };

  const handleBackgroundCircleSelect = (event: React.ChangeEvent<HTMLInputElement>, sectionIndex: number) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        event.target.value = '';
        const newErrors = [...backgroundCircleErrors];
        newErrors[sectionIndex] = t('admin.products.notification.fileSizeError');
        setBackgroundCircleErrors(newErrors);
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        event.target.value = '';
        const newErrors = [...backgroundCircleErrors];
        newErrors[sectionIndex] = t('admin.products.notification.fileTypeError');
        setBackgroundCircleErrors(newErrors);
        return;
      }

      const img = new Image();
      img.onload = () => {
        if (img.width !== 700 || img.height !== 700) {
          event.target.value = '';
          const newErrors = [...backgroundCircleErrors];
          newErrors[sectionIndex] = t('admin.products.notification.imageDimensionsError');
          setBackgroundCircleErrors(newErrors);
          return;
        }
        
        const newErrors = [...backgroundCircleErrors];
        newErrors[sectionIndex] = null;
        setBackgroundCircleErrors(newErrors);

        const newFiles = [...selectedBackgroundCircleFiles];
        newFiles[sectionIndex] = file;
        setSelectedBackgroundCircleFiles(newFiles);

        // Create a new object URL and store it
        const objectUrl = URL.createObjectURL(file);
        
        setCurrentProduct((prevProduct) => {
          const sections = [...(prevProduct.manufacturingSections || [])];
          if (sections[sectionIndex]) {
            sections[sectionIndex] = {
              ...sections[sectionIndex],
              backgroundImage: objectUrl
            };
          }
          return {
            ...prevProduct,
            manufacturingSections: sections
          };
        });
      };

      img.onerror = () => {
        event.target.value = '';
        const newErrors = [...backgroundCircleErrors];
        newErrors[sectionIndex] = t('admin.products.notification.imageLoadError');
        setBackgroundCircleErrors(newErrors);
      };

      // Read the file as a data URL instead of creating a blob URL
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const formData = new FormData();
      
      // Add all the text fields first
      formData.append('title', JSON.stringify(currentProduct.title || { ru: '', en: '', de: '' } as LocalizedText));
      formData.append('subtitle', JSON.stringify(currentProduct.subtitle || { ru: '', en: '', de: '' } as LocalizedText));
      formData.append('description', JSON.stringify(currentProduct.description || { ru: '', en: '', de: '' } as LocalizedText));
      formData.append('category', currentProduct.category || '');
      
      formData.append('application', JSON.stringify(currentProduct.application || []));
      formData.append('granulation', JSON.stringify(currentProduct.granulation || []));
      formData.append('type', JSON.stringify(currentProduct.type || []));
      
      // Prepare manufacturing sections without background images
      const sectionsToSave = (currentProduct.manufacturingSections || []).map((section) => ({
        title: section.title || { ru: '', en: '', de: '' } as LocalizedText,
        subtitle: section.subtitle || { ru: '', en: '', de: '' } as LocalizedText,
        description: section.description || { ru: '', en: '', de: '' } as LocalizedText,
        hint: section.hint || { ru: '', en: '', de: '' } as LocalizedText
      }));
      
      formData.append('manufacturingSections', JSON.stringify(sectionsToSave));
      
      formData.append('technicalTitle', JSON.stringify(currentProduct.technicalTitle || { ru: '', en: '', de: '' } as LocalizedText));
      formData.append('technicalSubtitle', JSON.stringify(currentProduct.technicalSubtitle || { ru: '', en: '', de: '' } as LocalizedText));
      formData.append('technicalDescription', JSON.stringify(currentProduct.technicalDescription || { ru: '', en: '', de: '' } as LocalizedText));
      formData.append('technicalHint', JSON.stringify(currentProduct.technicalHint || { ru: '', en: '', de: '' } as LocalizedText));
      
      if (currentProduct.price) {
        formData.append('price', currentProduct.price);
      }

      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      if (selectedActiveFile) {
        formData.append('activeImage', selectedActiveFile);
      }
      
      // Add background circle files with proper indexing
      selectedBackgroundCircleFiles.forEach((file, index) => {
        if (file) {
          formData.append(`backgroundCircle_${index}`, file);
        }
      });

      const url = currentProduct.id 
        ? `${API_URL}/products/${currentProduct.id}`
        : `${API_URL}/products`;

      const response = await fetch(url, {
        method: currentProduct.id ? 'PUT' : 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save product');
      }

      const result = await response.json();
      console.log('Save result:', result);

      // Cleanup blob URLs
      (currentProduct.manufacturingSections || []).forEach(section => {
        if (section.backgroundImage && section.backgroundImage.startsWith('blob:')) {
          URL.revokeObjectURL(section.backgroundImage);
        }
      });

      await fetchProducts();
      setOpenDialog(false);
      setSelectedFile(null);
      setSelectedActiveFile(null);
      setSelectedBackgroundCircleFiles([null]);
      setBackgroundCircleErrors([null]);
      showNotification(t('admin.products.notification.save'), 'success');
    } catch (error) {
      console.error('Failed to save product:', error);
      showNotification(
        isApiError(error) ? error.message : t('admin.products.notification.saveError'),
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showNotification = (message: string, severity: 'success' | 'error') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleLocaleChange = (field: keyof Product, locale: 'ru' | 'en' | 'de', value: string) => {
    setCurrentProduct((prevProduct) => {
      const prevField = prevProduct[field];
      if (typeof prevField !== 'object' || Array.isArray(prevField) || !('ru' in prevField)) {
        return {
          ...prevProduct,
          [field]: { ru: '', en: '', de: '', [locale]: value }
        };
      }
      
      return {
        ...prevProduct,
        [field]: {
          ...prevField,
          [locale]: value
        }
      };
    });
  };

  const handleAddManufacturingSection = () => {
    setCurrentProduct(prev => {
      const sections = prev.manufacturingSections || [];
      return {
        ...prev,
        manufacturingSections: [
          ...sections,
          {
            title: { ru: '', en: '', de: '' },
            subtitle: { ru: '', en: '', de: '' },
            description: { ru: '', en: '', de: '' },
            hint: { ru: '', en: '', de: '' }
          }
        ]
      };
    });
    setSelectedBackgroundCircleFiles(prev => [...prev, null]);
    setBackgroundCircleErrors(prev => [...prev, null]);
  };

  const handleRemoveManufacturingSection = (index: number) => {
    setCurrentProduct(prev => {
      const sections = prev.manufacturingSections || [];
      return {
        ...prev,
        manufacturingSections: sections.filter((_, i) => i !== index)
      };
    });
  };

  const handleManufacturingSectionChange = (index: number, field: keyof ManufacturingSection, locale: 'ru' | 'en' | 'de', value: string) => {
    setCurrentProduct((prevProduct) => {
      const sections = [...(prevProduct.manufacturingSections || [])];
      const currentSection = sections[index] || {};
      const prevField = currentSection[field];

      if (typeof prevField !== 'object' || Array.isArray(prevField) || !('ru' in prevField)) {
        sections[index] = {
          ...currentSection,
          [field]: { ru: '', en: '', de: '', [locale]: value }
        };
      } else {
        sections[index] = {
          ...currentSection,
          [field]: {
            ...prevField,
            [locale]: value
          }
        };
      }

      return {
        ...prevProduct,
        manufacturingSections: sections
      };
    });
  };

  const textFieldStyle = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      color: '#D5CDBD',
      bgcolor: 'rgba(26, 26, 26, 0.5)',
      '& fieldset': {
        borderColor: 'rgba(213, 205, 189, 0.1)',
        borderRadius: '8px',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(213, 205, 189, 0.2)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#D5CDBD',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#605C54',
      '&.Mui-focused': {
        color: '#D5CDBD',
      },
    },
    '& .MuiSelect-icon': {
      color: '#D5CDBD',
    },
    '& .MuiFormHelperText-root': {
      color: '#605C54',
      marginLeft: 0
    },
    '& .MuiInputAdornment-root': {
      color: '#D5CDBD',
    },
  };

  const selectMenuProps = {
    PaperProps: {
      sx: {
        bgcolor: '#242424',
        backgroundImage: 'none',
        border: '1px solid rgba(213, 205, 189, 0.1)',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        '& .MuiMenuItem-root': {
          color: '#D5CDBD',
          padding: '12px 16px',
          '&:hover': {
            bgcolor: 'rgba(213, 205, 189, 0.08)',
          },
          '&.Mui-selected': {
            bgcolor: 'rgba(213, 205, 189, 0.15)',
            '&:hover': {
              bgcolor: 'rgba(213, 205, 189, 0.23)',
            },
          },
        },
      },
    },
  };

  // Add cleanup for preview URLs when dialog closes
  useEffect(() => {
    return () => {
      // Cleanup preview URLs when component unmounts or dialog closes
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      if (activePreviewUrl && activePreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(activePreviewUrl);
      }
      (currentProduct.manufacturingSections || []).forEach(section => {
        if (section.backgroundImage && section.backgroundImage.startsWith('blob:')) {
          URL.revokeObjectURL(section.backgroundImage);
        }
      });
    };
  }, [previewUrl, activePreviewUrl]);

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
      }}
    >
      <Box 
        sx={{ 
          px: { xs: 1.5, sm: 2, md: 3 },
          py: { xs: 1, sm: 1.5, md: 2 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
          bgcolor: '#1A1A1A',
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: { xs: 1, sm: 0 },
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#D5CDBD',
            fontFamily: 'bebas',
            letterSpacing: '1px',
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
          }}
        >
          {t('admin.products.title')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />}
          onClick={handleAddProduct}
          disabled={loading}
          sx={{
            bgcolor: '#D5CDBD',
            color: '#1A1A1A',
            px: { xs: 2, sm: 3 },
            py: { xs: 0.75, sm: 1 },
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontFamily: 'adventpro',
            borderRadius: '8px',
            minWidth: { xs: '100%', sm: 'auto' },
            '&:hover': {
              bgcolor: '#b1a89a',
            },
          }}
        >
          {t('admin.products.addProduct')}
        </Button>
      </Box>

      <Box 
        sx={{ 
          flex: 1,
          overflow: 'auto',
          px: { xs: 1, sm: 2, md: 3 },
          py: { xs: 1, sm: 1.5, md: 2 },
          bgcolor: '#1A1A1A',
          position: 'relative',
        }}
      >
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              bgcolor: 'rgba(244, 67, 54, 0.1)',
              color: '#F44336',
              '.MuiAlert-icon': {
                color: '#F44336'
              }
            }}
          >
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100%'
          }}>
            <CircularProgress sx={{ color: '#D5CDBD' }} />
          </Box>
        ) : (
          <TableContainer 
            component={Paper} 
            sx={{ 
              bgcolor: 'transparent',
              backgroundImage: 'none',
              boxShadow: 'none',
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell 
                    sx={{ 
                      bgcolor: '#1A1A1A',
                      color: '#D5CDBD',
                      borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                      fontFamily: 'adventpro',
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      fontWeight: 600,
                      p: { xs: 1, sm: 2 },
                    }}
                  >
                    {t('admin.products.tableHeaders.title')}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      bgcolor: '#1A1A1A',
                      color: '#D5CDBD',
                      borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                      fontFamily: 'adventpro',
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      fontWeight: 600,
                      p: { xs: 1, sm: 2 },
                      display: { xs: 'none', sm: 'table-cell' },
                    }}
                  >
                    {t('admin.products.tableHeaders.description')}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      bgcolor: '#1A1A1A',
                      color: '#D5CDBD',
                      borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                      fontFamily: 'adventpro',
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      fontWeight: 600,
                      p: { xs: 1, sm: 2 },
                    }}
                  >
                    {t('admin.products.tableHeaders.image')}
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      bgcolor: '#1A1A1A',
                      color: '#D5CDBD',
                      borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                      fontFamily: 'adventpro',
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      fontWeight: 600,
                      p: { xs: 1, sm: 2 },
                    }}
                  >
                    {t('admin.products.tableHeaders.actions')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                  .map((product) => (
                  <TableRow 
                    key={product.id}
                    sx={{
                      '&:hover': {
                        bgcolor: 'rgba(213, 205, 189, 0.03)',
                      },
                    }}
                  >
                    <TableCell 
                      sx={{ 
                        color: '#D5CDBD',
                        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                        fontFamily: 'adventpro',
                        p: { xs: 1, sm: 2 },
                        maxWidth: '300px',
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#D5CDBD',
                          fontSize: '1rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          lineHeight: 1.2,
                        }}
                      >
                        {product.title.ru}
                      </Typography>
                      {product.subtitle?.ru && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#605C54',
                            fontSize: '0.875rem',
                            mt: 0.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: 1.2,
                          }}
                        >
                          {product.subtitle.ru}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: '#605C54',
                        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                        fontFamily: 'adventpro',
                        p: { xs: 1, sm: 2 },
                        display: { xs: 'none', sm: 'table-cell' },
                        maxWidth: '400px',
                      }}
                    >
                      <Typography
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          lineHeight: 1.2,
                        }}
                      >
                        {product.description.ru}
                      </Typography>
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                        p: { xs: 1, sm: 2 },
                      }}
                    >
                      <Box
                        component="img"
                        src={product.imageUrl}
                        alt={t('admin.products.fields.mainImageAlt')}
                        sx={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                      />
                    </TableCell>
                    <TableCell 
                      align="right"
                      sx={{ 
                        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                        p: { xs: 0.5, sm: 1 },
                      }}
                    >
                      <IconButton
                        onClick={() => handleEditProduct(product)}
                        sx={{ 
                          color: '#D5CDBD',
                          p: { xs: 0.5, sm: 1 },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(product.id)}
                        sx={{ 
                          color: '#ff4444',
                          p: { xs: 0.5, sm: 1 },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Пагинация */}
        {products.length > productsPerPage && (
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              mt: 4,
              mb: 2
            }}
          >
            {Array.from({ length: Math.ceil(products.length / 9) }).map((_, index) => (
              <Button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                variant={currentPage === index + 1 ? 'contained' : 'outlined'}
                sx={{
                  minWidth: '40px',
                  height: '40px',
                  borderRadius: '4px'
                }}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        )}
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#242424',
            backgroundImage: 'none',
            borderRadius: { xs: '0px', sm: '12px' },
            height: { xs: '100%', sm: '80vh' },
            margin: { xs: 0, sm: 2 },
            maxHeight: { xs: '100%', sm: '90vh' }
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            color: '#D5CDBD',
            fontFamily: 'bebas',
            letterSpacing: '1px',
            borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
            p: { xs: 2, sm: 3 },
            fontSize: { xs: '20px', sm: '24px' },
            position: 'sticky',
            top: 0,
            bgcolor: '#242424',
            zIndex: 1
          }}
        >
          {currentProduct.id ? t('admin.products.editProduct') : t('admin.products.addProduct')}
        </DialogTitle>
        <DialogContent 
          sx={{ 
            p: 0, 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            height: { xs: 'calc(100% - 130px)', sm: 'auto' },
            overflow: 'auto'
          }}
        >
          {/* Боковые вкладки */}
          <Box sx={{ 
            width: { xs: '100%', sm: '200px' },
            bgcolor: '#202020',
            borderRadius: { xs: 0, sm: '10px' },
            p: { xs: 1.5, sm: 2 },
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'column' },
            gap: { xs: 1, sm: 1 },
            borderBottom: { xs: '1px solid rgba(213, 205, 189, 0.1)', sm: 'none' },
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Мобильная навигация */}
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              <IconButton
                onClick={() => {
                  const tabs = ['catalog', 'manufacturing', 'technical'];
                  const currentIndex = tabs.indexOf(activeTab);
                  const newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                  setActiveTab(tabs[newIndex]);
                }}
                sx={{
                  color: '#605C54',
                  width: '32px',
                  height: '32px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconButton>

              <Typography sx={{ 
                color: '#D5CDBD',
                fontFamily: 'bebas',
                fontSize: '18px',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                {t(`admin.products.tabs.${activeTab}`)}
              </Typography>

              <IconButton
                onClick={() => {
                  const tabs = ['catalog', 'manufacturing', 'technical'];
                  const currentIndex = tabs.indexOf(activeTab);
                  const newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                  setActiveTab(tabs[newIndex]);
                }}
                sx={{
                  color: '#605C54',
                  width: '32px',
                  height: '32px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconButton>
            </Box>

            {/* Десктопная навигация */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', width: '100%', gap: 1 }}>
              {['catalog', 'manufacturing', 'technical'].map((tab) => (
                <Button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  sx={{
                    width: '100%',
                    minHeight: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    px: 2,
                    py: 1,
                    color: activeTab === tab ? '#D5CDBD' : 'rgba(213, 205, 189, 0.6)',
                    fontFamily: 'bebas',
                    fontSize: '18px',
                    textTransform: 'uppercase',
                    position: 'relative',
                    textAlign: 'left',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '2px',
                      backgroundColor: '#D5CDBD',
                      opacity: activeTab === tab ? 1 : 0
                    }
                  }}
                >
                  {t(`admin.products.tabs.${tab}`)}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Контент вкладки */}
          <Box sx={{ 
            flex: 1, 
            p: { xs: 2, sm: 3 }, 
            overflowY: 'auto',
            height: { xs: 'auto', sm: 'auto' }
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {activeTab === 'catalog' ? (
                <>
                  {/* Основные поля для каталога */}
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        select
                        fullWidth
                        label={t('admin.products.fields.categoryLabel')}
                        value={currentProduct.category || ''}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                        sx={textFieldStyle}
                        SelectProps={{
                          multiple: false,
                          MenuProps: selectMenuProps
                        }}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.value} value={category.value}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={t('admin.products.fields.priceLabel')}
                        placeholder={t('admin.products.fields.priceHint')}
                        value={currentProduct.price || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Проверяем, что введенное значение является числом и не превышает лимит
                          if (!value || (Number(value) <= 999999999 && /^\d*$/.test(value))) {
                            setCurrentProduct({ ...currentProduct, price: value });
                          }
                        }}
                        helperText={t('admin.products.fields.priceLimit')}
                        sx={textFieldStyle}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        select
                        fullWidth
                        label={t('admin.products.fields.applicationsLabel')}
                        value={currentProduct.application || []}
                        onChange={(e) => setCurrentProduct({ 
                          ...currentProduct, 
                          application: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value 
                        })}
                        sx={textFieldStyle}
                        SelectProps={{
                          multiple: true,
                          MenuProps: selectMenuProps
                        }}
                      >
                        {applications.map((app) => (
                          <MenuItem key={app.value} value={app.value}>
                            {app.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        select
                        fullWidth
                        label={t('admin.products.fields.granulationLabel')}
                        value={currentProduct.granulation || []}
                        onChange={(e) => setCurrentProduct({
                          ...currentProduct,
                          granulation: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value 
                        })}
                        sx={textFieldStyle}
                        SelectProps={{
                          multiple: true,
                          MenuProps: selectMenuProps
                        }}
                      >
                        {granulationTypes.map((type) => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        select
                        fullWidth
                        label={t('admin.products.fields.typeLabel')}
                        value={currentProduct.type || []}
                        onChange={(e) => setCurrentProduct({
                          ...currentProduct,
                          type: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value 
                        })}
                        sx={textFieldStyle}
                        SelectProps={{
                          multiple: true,
                          MenuProps: selectMenuProps
                        }}
                      >
                        {productTypes.map((type) => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>

                  {/* Локализованные поля */}
                  {['ru', 'en', 'de'].map((lang) => (
                    <Box key={lang} sx={{ mt: 3, mb: 4 }}>
                      <Typography sx={{ color: '#D5CDBD', mb: 2, fontWeight: 'bold' }}>
                        {lang.toUpperCase()}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label={t('admin.products.fields.titleLabel')}
                            value={currentProduct.title[lang as keyof typeof currentProduct.title] || ''}
                            onChange={(e) => handleLocaleChange('title', lang as 'ru' | 'en' | 'de', e.target.value)}
                            inputProps={{ maxLength: 100 }}
                            sx={textFieldStyle}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label={t('admin.products.fields.subtitleLabel')}
                            value={currentProduct.subtitle?.[lang as keyof typeof currentProduct.subtitle] || ''}
                            onChange={(e) => handleLocaleChange('subtitle', lang as 'ru' | 'en' | 'de', e.target.value)}
                            inputProps={{ maxLength: 200 }}
                            sx={textFieldStyle}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label={t('admin.products.fields.descriptionLabel')}
                            value={currentProduct.description[lang as keyof typeof currentProduct.description] || ''}
                            onChange={(e) => handleLocaleChange('description', lang as 'ru' | 'en' | 'de', e.target.value)}
                            inputProps={{ maxLength: 1000 }}
                            multiline
                            rows={3}
                            sx={textFieldStyle}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  ))}

                  {/* Изображения для каталога */}
                  <Typography variant="h6" sx={{ color: '#D5CDBD', mt: 2 }}>
                    {t('admin.products.sections.images')}
                  </Typography>

                  <Box sx={{ mt: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                    {/* Main Image Upload */}
                    <Box
                      sx={{
                        flex: 1,
                        p: 3,
                        border: '1px dashed rgba(213, 205, 189, 0.2)',
                        borderRadius: '12px',
                        bgcolor: 'rgba(26, 26, 26, 0.3)',
                      }}
                    >
                      <Typography sx={{ color: '#D5CDBD', mb: 2, textAlign: 'center' }}>
                        {t('admin.products.fields.mainImage')}
                      </Typography>
                      <Typography sx={{ color: '#605C54', mb: 2, textAlign: 'center', fontSize: '0.875rem' }}>
                        {t('admin.products.fields.fileInfo.mainImageDimensions')}
                      </Typography>
                      <Typography sx={{ color: '#605C54', mb: 2, textAlign: 'center', fontSize: '0.875rem' }}>
                        {t('admin.products.fields.fileInfo.mainImageMaxSize')}
                      </Typography>
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                          color: '#D5CDBD',
                          borderColor: 'rgba(213, 205, 189, 0.1)',
                          width: '100%',
                        }}
                      >
                        {previewUrl ? t('admin.products.fields.changeImage') : t('admin.products.fields.uploadImage')}
                        <input
                          type="file"
                          hidden
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFileSelect}
                        />
                      </Button>
                      {previewUrl && (
                        <Box sx={{ mt: 2, width: '100%', height: '200px', position: 'relative' }}>
                          <img
                            src={previewUrl}
                            alt={t('admin.products.fields.mainImageAlt')}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        </Box>
                      )}
                      {mainImageError && (
                        <Typography color="error" variant="caption">
                          {mainImageError}
                        </Typography>
                      )}
                    </Box>

                    {/* Active Image Upload */}
                    <Box
                      sx={{
                        flex: 1,
                        p: 3,
                        border: '1px dashed rgba(213, 205, 189, 0.2)',
                        borderRadius: '12px',
                        bgcolor: 'rgba(26, 26, 26, 0.3)',
                      }}
                    >
                      <Typography sx={{ color: '#D5CDBD', mb: 2, textAlign: 'center' }}>
                        {t('admin.products.fields.activeImage')}
                      </Typography>
                      <Typography sx={{ color: '#605C54', mb: 2, textAlign: 'center', fontSize: '0.875rem' }}>
                        {t('admin.products.fields.fileInfo.logoDimensions')}
                      </Typography>
                      <Typography sx={{ color: '#605C54', mb: 2, textAlign: 'center', fontSize: '0.875rem' }}>
                        {t('admin.products.fields.fileInfo.logoMaxSize')}
                      </Typography>
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                          color: '#D5CDBD',
                          borderColor: 'rgba(213, 205, 189, 0.1)',
                          width: '100%',
                        }}
                      >
                        {activePreviewUrl ? t('admin.products.fields.changeImage') : t('admin.products.fields.uploadImage')}
                        <input
                          type="file"
                          hidden
                          accept=".jpg,.jpeg,.png"
                          onChange={handleActiveFileSelect}
                        />
                      </Button>
                      {activePreviewUrl && (
                        <Box sx={{ mt: 2, width: '100%', height: '200px', position: 'relative' }}>
                          <img
                            src={activePreviewUrl}
                            alt={t('admin.products.fields.activeImageAlt')}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        </Box>
                      )}
                      {logoImageError && (
                        <Typography color="error" variant="caption">
                          {logoImageError}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </>
              ) : activeTab === 'manufacturing' ? (
                <>
                  <Typography variant="h6" sx={{ color: '#D5CDBD', mb: 2 }}>
                    {t('admin.products.sections.manufacturing')}
                  </Typography>

                  {(currentProduct.manufacturingSections || []).map((section, sectionIndex) => (
                    <Box key={sectionIndex} sx={{ mb: 4, position: 'relative' }}>
                      <Typography sx={{ color: '#D5CDBD', mb: 2 }}>
                        {t('products.sections.manufacturingSection')} {sectionIndex + 1}
                      </Typography>

                      {sectionIndex > 0 && (
                        <IconButton
                          onClick={() => handleRemoveManufacturingSection(sectionIndex)}
                          sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            color: '#ff4444'
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}

                      {/* Background Circle Upload для каждой секции */}
                      <Box sx={{ mt: 3, mb: 4 }}>
                        <Box
                          sx={{
                            p: 3,
                            border: '1px dashed rgba(213, 205, 189, 0.2)',
                            borderRadius: '12px',
                            bgcolor: 'rgba(26, 26, 26, 0.3)',
                          }}
                        >
                          <Typography sx={{ color: '#D5CDBD', mb: 2, textAlign: 'center' }}>
                            {t('products.fields.backgroundCircle')}
                          </Typography>
                          <Typography sx={{ color: '#605C54', mb: 2, textAlign: 'center', fontSize: '0.875rem' }}>
                            {t('products.fields.fileInfo.dimensions')}
                          </Typography>
                          <Typography sx={{ color: '#605C54', mb: 2, textAlign: 'center', fontSize: '0.875rem' }}>
                            {t('products.fields.fileInfo.backgroundCircleMaxSize')}
                          </Typography>
                          <Button
                            component="label"
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                            sx={{
                              color: '#D5CDBD',
                              borderColor: 'rgba(213, 205, 189, 0.1)',
                              width: '100%',
                            }}
                          >
                            {section.backgroundImage ? t('admin.products.fields.changeImage') : t('admin.products.fields.uploadImage')}
                            <input
                              type="file"
                              hidden
                              accept=".jpg,.jpeg,.png"
                              onChange={(e) => handleBackgroundCircleSelect(e, sectionIndex)}
                            />
                          </Button>
                          {section.backgroundImage && (
                            <Box sx={{ mt: 2, width: '100%', height: '200px', position: 'relative' }}>
                              <img
                                src={section.backgroundImage}
                                alt={t('admin.products.fields.backgroundCircleAlt')}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                              />
                            </Box>
                          )}
                          {backgroundCircleErrors[sectionIndex] && (
                            <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
                              {backgroundCircleErrors[sectionIndex]}
                            </Typography>
                          )}
                        </Box>
                      </Box>

                      {/* Локализованные поля для каждой секции */}
                      {['ru', 'en', 'de'].map((lang) => (
                        <Box key={lang} sx={{ mb: 4 }}>
                          <Typography sx={{ color: '#D5CDBD', mb: 2, fontWeight: 'bold' }}>
                            {lang.toUpperCase()}
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label={t('admin.products.fields.manufacturingTitle')}
                                placeholder={t('admin.products.fields.placeholders.manufacturingTitle')}
                                value={section.title[lang as keyof typeof section.title] || ''}
                                onChange={(e) => handleManufacturingSectionChange(sectionIndex, 'title', lang as 'ru' | 'en' | 'de', e.target.value)}
                                inputProps={{ maxLength: 100 }}
                                sx={textFieldStyle}
                              />
                            </Grid>
                            {/* <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label={t('admin.products.fields.manufacturingSubtitle')}
                                placeholder={t('admin.products.fields.placeholders.manufacturingSubtitle')}
                                value={section.subtitle[lang as keyof typeof section.subtitle] || ''}
                                onChange={(e) => handleManufacturingSectionChange(sectionIndex, 'subtitle', lang as 'ru' | 'en' | 'de', e.target.value)}
                                inputProps={{ maxLength: 200 }}
                                sx={textFieldStyle}
                              />
                            </Grid> */}
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label={t('admin.products.fields.manufacturingDescription')}
                                placeholder={t('admin.products.fields.placeholders.manufacturingDescription')}
                                value={section.description[lang as keyof typeof section.description] || ''}
                                onChange={(e) => handleManufacturingSectionChange(sectionIndex, 'description', lang as 'ru' | 'en' | 'de', e.target.value)}
                                inputProps={{ maxLength: 1000 }}
                                multiline
                                rows={3}
                                sx={textFieldStyle}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label={t('admin.products.fields.manufacturingHint')}
                                placeholder={t('admin.products.fields.placeholders.manufacturingHint')}
                                value={section.hint[lang as keyof typeof section.hint] || ''}
                                onChange={(e) => handleManufacturingSectionChange(sectionIndex, 'hint', lang as 'ru' | 'en' | 'de', e.target.value)}
                                inputProps={{ maxLength: 500 }}
                                multiline
                                rows={2}
                                sx={textFieldStyle}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                    </Box>
                  ))}

                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddManufacturingSection}
                    sx={{
                      color: '#D5CDBD',
                      borderColor: 'rgba(213, 205, 189, 0.1)',
                      mb: 4,
                    }}
                  >
                    {t('products.addManufacturingSection')}
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6" sx={{ color: '#D5CDBD', mb: 2 }}>
                    {t('admin.products.sections.technical')}
                  </Typography>

                  {['ru', 'en', 'de'].map((lang) => (
                    <Box key={lang} sx={{ mb: 4 }}>
                      <Typography sx={{ color: '#D5CDBD', mb: 2, fontWeight: 'bold' }}>
                        {lang.toUpperCase()}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label={t('admin.products.fields.technicalTitle')}
                            placeholder={t('admin.products.fields.placeholders.technicalTitle')}
                            value={currentProduct.technicalTitle?.[lang as keyof typeof currentProduct.technicalTitle] || ''}
                            onChange={(e) => handleLocaleChange('technicalTitle', lang as 'ru' | 'en' | 'de', e.target.value)}
                            inputProps={{ maxLength: 100 }}
                            sx={textFieldStyle}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label={t('admin.products.fields.technicalSubtitle')}
                            placeholder={t('admin.products.fields.placeholders.technicalSubtitle')}
                            value={currentProduct.technicalSubtitle?.[lang as keyof typeof currentProduct.technicalSubtitle] || ''}
                            onChange={(e) => handleLocaleChange('technicalSubtitle', lang as 'ru' | 'en' | 'de', e.target.value)}
                            inputProps={{ maxLength: 200 }}
                            sx={textFieldStyle}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label={t('admin.products.fields.technicalDescription')}
                            placeholder={t('admin.products.fields.placeholders.technicalDescription')}
                            value={currentProduct.technicalDescription?.[lang as keyof typeof currentProduct.technicalDescription] || ''}
                            onChange={(e) => handleLocaleChange('technicalDescription', lang as 'ru' | 'en' | 'de', e.target.value)}
                            inputProps={{ maxLength: 1000 }}
                            multiline
                            rows={3}
                            sx={textFieldStyle}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label={t('admin.products.fields.technicalHint')}
                            placeholder={t('admin.products.fields.placeholders.technicalHint')}
                            value={currentProduct.technicalHint?.[lang as keyof typeof currentProduct.technicalHint] || ''}
                            onChange={(e) => handleLocaleChange('technicalHint', lang as 'ru' | 'en' | 'de', e.target.value)}
                            inputProps={{ maxLength: 500 }}
                            multiline
                            rows={2}
                            sx={textFieldStyle}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: { xs: 2, sm: 3 }, 
          borderTop: '1px solid rgba(213, 205, 189, 0.1)', 
          gap: { xs: 1, sm: 2 },
          flexDirection: { xs: 'column', sm: 'row' },
          position: { xs: 'sticky', sm: 'static' },
          bottom: 0,
          bgcolor: '#242424',
          zIndex: 1
        }}>
          <Button
            onClick={() => setOpenDialog(false)}
            fullWidth={true}
            sx={{
              color: '#D5CDBD',
              px: 3,
            }}
          >
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleSaveProduct}
            variant="contained"
            disabled={loading}
            fullWidth={true}
            sx={{
              bgcolor: '#D5CDBD',
              color: '#1A1A1A',
              px: 3,
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: '#1A1A1A' }} />
            ) : (
              t('common.save')
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#242424',
            backgroundImage: 'none',
            borderRadius: '12px',
          }
        }}
      >
        <DialogTitle sx={{ color: '#D5CDBD', fontFamily: 'bebas', letterSpacing: '1px' }}>
          {t('admin.confirmDelete.title')}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#605C54', mt: 2 }}>
            {t('admin.confirmDelete.message')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{
              color: '#605C54',
            }}
          >
            {t('admin.actions.cancel')}
          </Button>
          <Button
            onClick={() => selectedProductId && handleDeleteProduct(selectedProductId)}
            sx={{
              color: '#ff4444',
            }}
          >
            {t('admin.actions.delete')}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            bgcolor: snackbar.severity === 'success' 
              ? 'rgba(76, 175, 80, 0.1)' 
              : 'rgba(244, 67, 54, 0.1)',
            color: snackbar.severity === 'success' ? '#4CAF50' : '#F44336',
            '.MuiAlert-icon': {
              color: snackbar.severity === 'success' ? '#4CAF50' : '#F44336'
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductsSection; 