import { useState, useEffect } from 'react';
import { API_URL } from '../../../config';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Paper,
  CircularProgress,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  FormControl,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
import i18next from 'i18next';

interface Log {
  id: string;
  timestamp: string;
  type: string;
  message: string;
  user: string;
  ip: string;
  metadata?: {
    preferences?: any;
    action?: string;
    device?: {
      type: string;
      os: string;
      browser: string;
    };
    location?: {
      city: string;
      country: string;
    };
    [key: string]: any;
  };
}

const LogsSection = () => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success'
  });
  const limit = 20;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchLogs();
  }, [searchQuery, selectedType, page]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        offset: ((page - 1) * limit).toString()
      });

      if (searchQuery) {
        queryParams.append('search', searchQuery);
      }

      if (selectedType && selectedType !== 'all') {
        queryParams.append('type', selectedType);
      }

      const url = `${API_URL}/logs?${queryParams}`;
      console.log('Fetching logs from:', url);

      const response = await fetch(url);
      if (!response.ok) {
        console.error('Failed to fetch logs:', response.status, response.statusText);
        throw new Error('Не удалось загрузить логи');
      }

      const data = await response.json();
      console.log('Received logs data:', data);
      setLogs(data.logs || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Error in fetchLogs:', error);
      setError(t('admin.logs.error.fetch'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLog = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/logs/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(t('admin.logs.notification.deleteError'));
      }
      
      await fetchLogs();
      setDeleteDialogOpen(false);
      setSelectedLogId(null);
      showNotification(t('admin.logs.notification.deleteSuccess'), 'success');
    } catch (error) {
      console.error(t('admin.logs.error.deleteError'), error);
      showNotification(t('admin.logs.notification.deleteError'), 'error');
    }
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setFilterAnchorEl(null);
  };

  const handleTypeSelect = (type: string | null) => {
    setSelectedType(type || 'all');
    setFilterAnchorEl(null);
    setPage(1);
  };

  const handleShowDetails = (log: Log) => {
    setSelectedLog(log);
  };

  const getChipColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'info':
        return {
          bgcolor: 'rgba(33, 150, 243, 0.1)',
          color: '#2196F3',
        };
      case 'warning':
        return {
          bgcolor: 'rgba(255, 152, 0, 0.1)',
          color: '#FF9800',
        };
      case 'error':
        return {
          bgcolor: 'rgba(244, 67, 54, 0.1)',
          color: '#F44336',
        };
      case 'cookie':
        return {
          bgcolor: 'rgba(76, 175, 80, 0.1)',
          color: '#4CAF50',
        };
      default:
        return {
          bgcolor: 'rgba(158, 158, 158, 0.1)',
          color: '#9E9E9E',
        };
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const currentLanguage = i18next.language || 'en';
    const languageMap = {
      en: 'en-US',
      de: 'de-DE',
      ru: 'ru-RU'
    };
    return new Date(timestamp).toLocaleString(languageMap[currentLanguage as keyof typeof languageMap], options);
  };

  const getTypeLabel = (type: string) => {
    const typeKey = type.toLowerCase();
    return t(`admin.logs.types.${typeKey}`);
  };

  const formatCookiePreferences = (preferences: any) => {
    if (!preferences) return t('admin.logs.details.noData');
    
    const names = {
      necessary: t('cookie.types.necessary'),
      analytics: t('cookie.types.analytics'),
      marketing: t('cookie.types.marketing'),
      functional: t('cookie.types.functional'),
      geolocation: t('cookie.types.geolocation')
    };

    return Object.entries(preferences)
      .map(([key, value]) => `${names[key as keyof typeof names]}: ${value ? t('common.yes') : t('common.no')}`)
      .join('\n');
  };

  const formatCookieMessage = (log: Log) => {
    if (!log.metadata) return '';

    const { action, preferences, device, location } = log.metadata;
    
    const cookieSettingsText = formatCookiePreferences(preferences);
    const deviceInfoText = device ? 
      `${t('admin.logs.details.labels.device.type')}: ${device.type || t('admin.logs.details.noData')}\n` +
      `${t('admin.logs.details.labels.device.os')}: ${device.os || t('admin.logs.details.noData')}\n` +
      `${t('admin.logs.details.labels.device.browser')}: ${device.browser || t('admin.logs.details.noData')}` : 
      t('admin.logs.details.noData');
    const locationText = location ? 
      `${t('admin.logs.details.labels.location.city')}: ${location.city || t('admin.logs.details.noData')}\n` +
      `${t('admin.logs.details.labels.location.country')}: ${location.country || t('admin.logs.details.noData')}` : 
      t('admin.logs.details.noData');

    return `${t('admin.logs.cookieMessage.user')} ${action === 'accept' ? t('admin.logs.details.cookieAction.accept') : t('admin.logs.details.cookieAction.reject')} ${t('cookie.title').toLowerCase()}\n\n` +
      `${t('admin.logs.cookieMessage.cookieSettings')}:\n${cookieSettingsText}\n\n` +
      `${t('admin.logs.cookieMessage.deviceInfo')}:\n${deviceInfoText}\n\n` +
      `${t('admin.logs.cookieMessage.locationInfo')}:\n${locationText}`;
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showNotification = (message: string, severity: 'success' | 'error') => {
    setSnackbar({
      open: true,
      message: message,
      severity: severity
    });
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.user && log.user.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.ip && log.ip.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'all' || log.type === selectedType;

    return matchesSearch && matchesType;
  });

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
          {t('admin.logs.title')}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          alignItems: 'center',
          width: { xs: '100%', sm: 'auto' },
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
        }}>
          <TextField
            fullWidth
            placeholder={t('admin.logs.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flex: 1,
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
              '& .MuiInputBase-input::placeholder': {
                color: '#605C54',
                opacity: 1,
              },
            }}
          />
          <FormControl sx={{ minWidth: { xs: '100%', sm: '200px' } }}>
            <Select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
              displayEmpty
              sx={{
                color: '#D5CDBD',
                bgcolor: 'rgba(26, 26, 26, 0.5)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(213, 205, 189, 0.1)',
                  borderRadius: '8px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(213, 205, 189, 0.2)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D5CDBD',
                },
                '& .MuiSelect-icon': {
                  color: '#D5CDBD',
                },
              }}
              MenuProps={{
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
              }}
            >
              <MenuItem value={10}>10 {t('admin.logs.entries')}</MenuItem>
              <MenuItem value={25}>25 {t('admin.logs.entries')}</MenuItem>
              <MenuItem value={50}>50 {t('admin.logs.entries')}</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: { xs: '100%', sm: '200px' } }}>
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              displayEmpty
              sx={{
                color: '#D5CDBD',
                bgcolor: 'rgba(26, 26, 26, 0.5)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(213, 205, 189, 0.1)',
                  borderRadius: '8px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(213, 205, 189, 0.2)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D5CDBD',
                },
                '& .MuiSelect-icon': {
                  color: '#D5CDBD',
                },
              }}
              MenuProps={{
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
              }}
            >
              <MenuItem value="">{t('admin.logs.filter.all')}</MenuItem>
              <MenuItem value="info">{t('admin.logs.types.info')}</MenuItem>
              <MenuItem value="warning">{t('admin.logs.types.warning')}</MenuItem>
              <MenuItem value="error">{t('admin.logs.types.error')}</MenuItem>
              <MenuItem value="cookie">{t('admin.logs.types.cookie')}</MenuItem>
            </Select>
          </FormControl>
          <IconButton
            onClick={handleFilterClick}
            sx={{ 
              color: '#D5CDBD',
              '&:hover': {
                bgcolor: 'rgba(213, 205, 189, 0.08)',
              },
              '&.MuiIconButton-root': {
                position: 'relative',
                right: '14px'
              }
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>
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
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100%'
          }}>
            <CircularProgress sx={{ color: '#D5CDBD' }} />
          </Box>
        ) : error ? (
          <Typography 
            sx={{ 
              color: '#F44336',
              textAlign: 'center',
              mt: 2
            }}
          >
            {error}
          </Typography>
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
                    {t('admin.logs.fields.timestamp')}
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
                    {t('admin.logs.fields.type')}
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
                    {t('admin.logs.fields.message')}
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
                    {t('admin.logs.fields.user')}
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
                    {t('admin.logs.fields.ip')}
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
                    {t('admin.actions.delete')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow 
                    key={log.id}
                    hover
                    sx={{
                      '&:hover': {
                        bgcolor: 'rgba(213, 205, 189, 0.1)',
                      },
                    }}
                  >
                    <TableCell 
                      sx={{ 
                        color: '#605C54',
                        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                        fontFamily: 'adventpro',
                        p: { xs: 1, sm: 2 },
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      }}
                    >
                      {formatTimestamp(log.timestamp)}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                        p: { xs: 1, sm: 2 },
                      }}
                    >
                      <Chip
                        label={getTypeLabel(log.type)}
                        size="small"
                        sx={{
                          ...getChipColor(log.type),
                          fontWeight: 500,
                          fontFamily: 'adventpro',
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          height: { xs: '20px', sm: '24px' },
                        }}
                      />
                      {/* Show message on mobile */}
                      {isMobile && (
                        <Typography
                          sx={{
                            color: '#605C54',
                            fontSize: '0.75rem',
                            mt: 0.5,
                          }}
                        >
                          {log.type === 'cookie' ? formatCookieMessage(log) : log.message}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: '#605C54',
                        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                        fontFamily: 'adventpro',
                        p: { xs: 1, sm: 2 },
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      }}
                    >
                      {log.type === 'cookie' ? formatCookieMessage(log) : log.message}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: '#605C54',
                        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                        fontFamily: 'adventpro',
                        p: { xs: 1, sm: 2 },
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        display: { xs: 'none', sm: 'table-cell' },
                      }}
                    >
                      {log.user}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: '#605C54',
                        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                        fontFamily: 'adventpro',
                        p: { xs: 1, sm: 2 },
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        display: { xs: 'none', sm: 'table-cell' },
                      }}
                    >
                      {log.ip}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title={t('admin.logs.fields.details')}>
                          <IconButton
                            size="small"
                            onClick={() => handleShowDetails(log)}
                            sx={{ color: '#D5CDBD' }}
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('admin.actions.delete')}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedLogId(log.id);
                              setDeleteDialogOpen(true);
                            }}
                            sx={{ 
                              color: '#F44336',
                              '&:hover': {
                                bgcolor: 'rgba(244, 67, 54, 0.1)'
                              }
                            }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {!loading && !error && (
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            py: 2,
            borderTop: '1px solid rgba(213, 205, 189, 0.1)',
          }}
        >
          <Pagination
            count={Math.ceil(total / limit)}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            size={isMobile ? 'small' : 'medium'}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#605C54',
                '&.Mui-selected': {
                  bgcolor: 'rgba(213, 205, 189, 0.1)',
                  color: '#D5CDBD',
                },
                '&:hover': {
                  bgcolor: 'rgba(213, 205, 189, 0.05)',
                },
              },
            }}
          />
        </Box>
      )}

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            bgcolor: '#242424',
            border: '1px solid rgba(213, 205, 189, 0.1)',
            mt: 1,
            right: '-14px',
            minWidth: '200px',
            '& .MuiMenuItem-root': {
              color: '#D5CDBD',
              py: 1.5,
              px: 2,
              '&:hover': {
                bgcolor: 'rgba(213, 205, 189, 0.08)',
              },
            },
          },
        }}
      >
        <MenuItem onClick={() => handleTypeSelect(null)}>
          {t('admin.logs.filter.all')}
        </MenuItem>
        <MenuItem onClick={() => handleTypeSelect('info')}>
          {t('admin.logs.filter.onlyInfo')}
        </MenuItem>
        <MenuItem onClick={() => handleTypeSelect('warning')}>
          {t('admin.logs.filter.onlyWarning')}
        </MenuItem>
        <MenuItem onClick={() => handleTypeSelect('error')}>
          {t('admin.logs.filter.onlyError')}
        </MenuItem>
        <MenuItem onClick={() => handleTypeSelect('cookie')}>
          {t('admin.logs.filter.onlyCookie')}
        </MenuItem>
      </Menu>

      <Dialog
        open={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        PaperProps={{
          style: {
            backgroundColor: '#202020',
            color: '#D5CDBD',
            maxWidth: '600px',
            width: '100%',
            padding: '16px'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            color: '#D5CDBD', 
            fontFamily: 'AdventProRegular',
            fontSize: '24px',
            borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
            marginBottom: '16px',
            paddingBottom: '8px'
          }}
        >
          {t('admin.logs.details.title')}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Typography color="#A19F9B" sx={{ mb: 1, opacity: 0.7, fontSize: '14px' }}>
              {t('admin.logs.details.labels.timestamp')}:
            </Typography>
            <Typography sx={{ mb: 2, color: '#D5CDBD', fontSize: '16px' }}>
              {selectedLog ? formatTimestamp(selectedLog.timestamp) : ''}
            </Typography>

            <Typography color="#A19F9B" sx={{ mb: 1, opacity: 0.7, fontSize: '14px' }}>
              {t('admin.logs.details.labels.type')}:
            </Typography>
            <Typography sx={{ mb: 2 }}>
              <Chip
                label={selectedLog ? getTypeLabel(selectedLog.type) : ''}
                sx={{
                  ...getChipColor(selectedLog?.type || ''),
                  fontFamily: 'AdventProRegular',
                  fontSize: '14px'
                }}
              />
            </Typography>

            <Typography color="#A19F9B" sx={{ mb: 1, opacity: 0.7, fontSize: '14px' }}>
              {t('admin.logs.details.labels.message')}:
            </Typography>
            <Typography sx={{ mb: 2, color: '#D5CDBD', fontSize: '16px', whiteSpace: 'pre-line' }}>
              {selectedLog ? (selectedLog.type === 'cookie' ? formatCookieMessage(selectedLog) : selectedLog.message) : t('admin.logs.details.noData')}
            </Typography>

            {selectedLog?.metadata?.preferences && (
              <>
                <Typography color="#A19F9B" sx={{ mb: 1, opacity: 0.7, fontSize: '14px' }}>
                  {t('admin.logs.details.labels.cookieSettings')}:
                </Typography>
                <Typography sx={{ mb: 2, color: '#D5CDBD', fontSize: '16px', whiteSpace: 'pre-line' }}>
                  {formatCookiePreferences(selectedLog.metadata.preferences)}
                </Typography>
              </>
            )}

            {selectedLog?.metadata?.device && (
              <>
                <Typography color="#A19F9B" sx={{ mb: 1, opacity: 0.7, fontSize: '14px' }}>
                  {t('admin.logs.details.labels.deviceInfo')}:
                </Typography>
                <Typography sx={{ mb: 2, color: '#D5CDBD', fontSize: '16px' }}>
                  {t('admin.logs.details.labels.device.type')}: {selectedLog.metadata.device.type || t('admin.logs.details.noData')}<br />
                  {t('admin.logs.details.labels.device.os')}: {selectedLog.metadata.device.os || t('admin.logs.details.noData')}<br />
                  {t('admin.logs.details.labels.device.browser')}: {selectedLog.metadata.device.browser || t('admin.logs.details.noData')}
                </Typography>
              </>
            )}

            {selectedLog?.metadata?.location && (
              <>
                <Typography color="#A19F9B" sx={{ mb: 1, opacity: 0.7, fontSize: '14px' }}>
                  {t('admin.logs.details.labels.locationInfo')}:
                </Typography>
                <Typography sx={{ mb: 2, color: '#D5CDBD', fontSize: '16px' }}>
                  {t('admin.logs.details.labels.location.city')}: {selectedLog.metadata.location.city || t('admin.logs.details.noData')}<br />
                  {t('admin.logs.details.labels.location.country')}: {selectedLog.metadata.location.country || t('admin.logs.details.noData')}
                </Typography>
              </>
            )}

            <Typography color="#A19F9B" sx={{ mb: 1, opacity: 0.7, fontSize: '14px' }}>
              {t('admin.logs.details.labels.user')}:
            </Typography>
            <Typography sx={{ mb: 2, color: '#D5CDBD', fontSize: '16px' }}>
              {selectedLog?.user || t('admin.logs.details.noData')}
            </Typography>

            <Typography color="#A19F9B" sx={{ mb: 1, opacity: 0.7, fontSize: '14px' }}>
              {t('admin.logs.details.labels.ip')}:
            </Typography>
            <Typography sx={{ color: '#D5CDBD', fontSize: '16px' }}>
              {selectedLog?.ip || t('admin.logs.details.noData')}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '16px', borderTop: '1px solid rgba(213, 205, 189, 0.1)' }}>
          <Button 
            onClick={() => setSelectedLog(null)}
            sx={{ 
              color: '#D5CDBD',
              '&:hover': {
                backgroundColor: 'rgba(213, 205, 189, 0.1)'
              }
            }}
          >
            {t('admin.logs.details.close')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#202020',
            color: '#D5CDBD',
          },
        }}
      >
        <DialogTitle sx={{ color: '#D5CDBD' }}>
          {t('admin.logs.delete.title')}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#D5CDBD' }}>
            {t('admin.logs.delete.message')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ color: '#A19F9B' }}
          >
            {t('admin.logs.delete.cancel')}
          </Button>
          <Button
            onClick={() => selectedLogId && handleDeleteLog(selectedLogId)}
            sx={{
              color: '#F44336',
              '&:hover': {
                bgcolor: 'rgba(244, 67, 54, 0.1)',
              },
            }}
          >
            {t('admin.logs.delete.confirm')}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            bgcolor: snackbar.severity === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
            color: snackbar.severity === 'success' ? '#4CAF50' : '#F44336',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LogsSection; 