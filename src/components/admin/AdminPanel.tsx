import { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import TranslateIcon from '@mui/icons-material/Translate';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import ProductsSection from './sections/ProductsSection';
import UsersSection from './sections/UsersSection';
import LogsSection from './sections/LogsSection';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const drawerWidth = { xs: '260px', sm: '280px' };

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  lastLogin: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [currentSection, setCurrentSection] = useState(() => {
    // Восстанавливаем последнюю активную секцию из localStorage
    const savedSection = localStorage.getItem('adminSection');
    return savedSection || 'products';
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [languageMenu, setLanguageMenu] = useState<null | HTMLElement>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success'
  });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Эффект для сохранения текущей секции
  useEffect(() => {
    localStorage.setItem('adminSection', currentSection);
  }, [currentSection]);

  // Эффект для восстановления языка
  useEffect(() => {
    const savedLanguage = localStorage.getItem('adminLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  // Эффект для перенаправления менеджера на products
  useEffect(() => {
    if (currentUser?.role === 'manager') {
      setCurrentSection('products');
    }
  }, [currentUser]);

  // Функция для безопасной смены секции
  const handleSectionChange = (sectionId: string) => {
    if (currentUser?.role === 'manager' && sectionId !== 'products') {
      setCurrentSection('products');
      return;
    }
    setCurrentSection(sectionId);
    if (isMobile) setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        setSnackbar({
          open: true,
          message: t('admin.errors.invalidCredentials'),
          severity: 'error'
        });
        return;
      }

      const user = await response.json();
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminUser', JSON.stringify(user));

      if (rememberMe) {
        localStorage.setItem('adminUsername', username);
        localStorage.setItem('adminPassword', password);
      } else {
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminPassword');
      }
    } catch (error) {
      console.error('Login error:', error);
      setSnackbar({
        open: true,
        message: t('admin.errors.invalidCredentials'),
        severity: 'error'
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    if (!rememberMe) {
      localStorage.removeItem('adminUsername');
      localStorage.removeItem('adminPassword');
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem('adminUsername');
    const savedPassword = localStorage.getItem('adminPassword');
    const savedUser = localStorage.getItem('adminUser');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageMenu(null);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('adminLanguage', lang);
    handleLanguageClose();
  };

  const menuItems = [
    { 
      id: 'products', 
      label: t('admin.sections.products'), 
      icon: <InventoryIcon />,
      roles: ['administrator', 'manager']
    },
    { 
      id: 'users', 
      label: t('admin.sections.users'), 
      icon: <PeopleIcon />,
      roles: ['administrator']
    },
    { 
      id: 'logs', 
      label: t('admin.sections.logs'), 
      icon: <AssessmentIcon />,
      roles: ['administrator']
    },
  ];

  // Фильтруем пункты меню в зависимости от роли пользователя
  const filteredMenuItems = menuItems.filter(item => 
    currentUser && item.roles.includes(currentUser.role)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#D5CDBD', 
            fontFamily: 'bebas',
            letterSpacing: '2px',
            textAlign: 'center'
          }}
        >
          {t('admin.panelTitle')}
        </Typography>
        {currentUser && (
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#605C54',
              textAlign: 'center',
              mt: 1
            }}
          >
            {t(`admin.roles.${currentUser.role}`)}
          </Typography>
        )}
      </Box>
      <List sx={{ flex: 1, p: 2 }}>
        {filteredMenuItems.map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => handleSectionChange(item.id)}
            sx={{
              mb: 1,
              borderRadius: 1,
              color: currentSection === item.id ? '#D5CDBD' : '#605C54',
              bgcolor: currentSection === item.id ? 'rgba(213, 205, 189, 0.05)' : 'transparent',
              '&:hover': {
                color: '#D5CDBD',
                bgcolor: 'rgba(213, 205, 189, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: 'inherit',
              minWidth: '40px'
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={t(`admin.sections.${item.id}`)}
              primaryTypographyProps={{
                fontFamily: 'adventpro',
                fontSize: '1.1rem',
                fontWeight: currentSection === item.id ? 600 : 400
              }}
            />
          </ListItem>
        ))}
      </List>
      <List sx={{ p: 2, borderTop: '1px solid rgba(213, 205, 189, 0.1)' }}>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            color: '#605C54',
            '&:hover': {
              color: '#ff4444',
              bgcolor: 'rgba(255, 68, 68, 0.08)',
            },
          }}
        >
          <ListItemIcon sx={{ 
            color: 'inherit',
            minWidth: '40px'
          }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary={t('admin.actions.logout')}
            primaryTypographyProps={{
              fontFamily: 'adventpro',
              fontSize: '1.1rem'
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Функция для обновления токена
  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await fetch(`${API_URL}/admin/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const newTokens = await response.json();
      setTokens(newTokens);
      localStorage.setItem('adminTokens', JSON.stringify(newTokens));
      return newTokens.accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      setIsAuthenticated(false);
      localStorage.removeItem('adminTokens');
      navigate('/admin/login');
      return null;
    }
  };

  // Функция для выполнения защищенных запросов
  const fetchWithToken = async (url: string, options: RequestInit = {}) => {
    let currentTokens = tokens;

    // Проверяем наличие сохраненных токенов в localStorage
    if (!currentTokens) {
      const savedTokens = localStorage.getItem('adminTokens');
      if (savedTokens) {
        currentTokens = JSON.parse(savedTokens);
        setTokens(currentTokens);
      }
    }

    if (!currentTokens) {
      throw new Error('No authentication tokens');
    }

    // Добавляем токен в заголовки
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${currentTokens.accessToken}`);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Если получаем 401, пробуем обновить токен
      if (response.status === 401) {
        const newAccessToken = await refreshAccessToken(currentTokens.refreshToken);
        if (!newAccessToken) {
          throw new Error('Token refresh failed');
        }

        // Повторяем запрос с новым токеном
        headers.set('Authorization', `Bearer ${newAccessToken}`);
        return fetch(url, {
          ...options,
          headers,
        });
      }

      return response;
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  };

  // Проверка аутентификации при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedTokens = localStorage.getItem('adminTokens');
        if (!savedTokens) {
          navigate('/admin/login');
          return;
        }

        const parsedTokens = JSON.parse(savedTokens);
        setTokens(parsedTokens);

        // Проверяем валидность токена
        const response = await fetchWithToken(`${API_URL}/admin/verify`);
        if (!response.ok) {
          throw new Error('Invalid token');
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
        localStorage.removeItem('adminTokens');
        navigate('/admin/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) {
    return (
      <>
        <Box 
          sx={{
            minHeight: '100vh',
            width: '100vw',
            bgcolor: '#1A1A1A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 1.5, sm: 2, md: 3 },
            backgroundImage: 'linear-gradient(rgba(26, 26, 26, 0.9), rgba(26, 26, 26, 0.9)), url("https://goldendie.de/img/bg-pattern.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at center, rgba(213, 205, 189, 0.1) 0%, rgba(26, 26, 26, 0) 70%)',
              pointerEvents: 'none',
            }
          }}
        >
          <Container 
            maxWidth="sm" 
            sx={{ 
              position: 'relative', 
              zIndex: 1, 
              width: '100%',
              p: { xs: 1, sm: 2 }
            }}
          >
            <Paper 
              elevation={0}
              sx={{
                bgcolor: 'rgba(36, 36, 36, 0.8)',
                backdropFilter: 'blur(10px)',
                p: { xs: 1.5, sm: 2, md: 4 },
                border: '1px solid rgba(213, 205, 189, 0.1)',
                borderRadius: { xs: '8px', sm: '12px', md: '16px' },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, rgba(213, 205, 189, 0) 0%, rgba(213, 205, 189, 0.2) 50%, rgba(213, 205, 189, 0) 100%)',
                }
              }}
            >
              <IconButton
                onClick={handleLanguageClick}
                sx={{ 
                  position: 'absolute',
                  top: { xs: 6, sm: 8, md: 16 },
                  right: { xs: 6, sm: 8, md: 16 },
                  padding: { xs: '6px', sm: '8px' },
                  color: '#D5CDBD',
                  bgcolor: 'rgba(213, 205, 189, 0.05)',
                  '& svg': {
                    fontSize: { xs: '1.2rem', sm: '1.5rem' }
                  },
                  '&:hover': {
                    bgcolor: 'rgba(213, 205, 189, 0.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <TranslateIcon />
              </IconButton>

              <Menu
                anchorEl={languageMenu}
                open={Boolean(languageMenu)}
                onClose={handleLanguageClose}
                PaperProps={{
                  sx: {
                    bgcolor: 'rgba(36, 36, 36, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(213, 205, 189, 0.1)',
                    borderRadius: '8px',
                    mt: 1,
                    minWidth: '180px',
                    '& .MuiMenuItem-root': {
                      color: '#D5CDBD',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(213, 205, 189, 0.08)',
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem 
                  onClick={() => changeLanguage('ru')}
                  selected={i18n.language === 'ru'}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                    px: 3,
                    py: 1.5,
                    '&.Mui-selected': {
                      bgcolor: 'rgba(213, 205, 189, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(213, 205, 189, 0.15)',
                      },
                    },
                  }}
                >
                  Русский
                </MenuItem>
                <MenuItem 
                  onClick={() => changeLanguage('en')}
                  selected={i18n.language === 'en'}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                    px: 3,
                    py: 1.5,
                    '&.Mui-selected': {
                      bgcolor: 'rgba(213, 205, 189, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(213, 205, 189, 0.15)',
                      },
                    },
                  }}
                >
                  English
                </MenuItem>
                <MenuItem 
                  onClick={() => changeLanguage('de')}
                  selected={i18n.language === 'de'}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                    px: 3,
                    py: 1.5,
                    '&.Mui-selected': {
                      bgcolor: 'rgba(213, 205, 189, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(213, 205, 189, 0.15)',
                      },
                    },
                  }}
                >
                  Deutsch
                </MenuItem>
              </Menu>

              <Typography 
                variant="h4" 
                sx={{
                  color: '#D5CDBD',
                  mb: { xs: 2, sm: 3, md: 4 },
                  fontFamily: 'bebas',
                  textAlign: 'center',
                  letterSpacing: '2px',
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -6,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: { xs: '40px', sm: '60px' },
                    height: '2px',
                    bgcolor: 'rgba(213, 205, 189, 0.2)',
                  }
                }}
              >
                {t('admin.loginTitle')}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: { xs: 1.5, sm: 2, md: 3 }
                }}
              >
                <TextField
                  fullWidth
                  label={t('admin.username')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#D5CDBD',
                      bgcolor: 'rgba(26, 26, 26, 0.5)',
                      '& fieldset': {
                        borderColor: 'rgba(213, 205, 189, 0.1)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
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
                    InputProps: {
                      sx: {
                        height: { xs: '40px', sm: '48px' },
                      }
                    }
                  }}
                />
                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  label={t('admin.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ 
                            padding: { xs: '4px', sm: '8px' },
                            '& svg': {
                              fontSize: { xs: '1.2rem', sm: '1.5rem' }
                            },
                            color: '#605C54',
                            '&:hover': {
                              color: '#D5CDBD',
                            },
                          }}
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#D5CDBD',
                      bgcolor: 'rgba(26, 26, 26, 0.5)',
                      '& fieldset': {
                        borderColor: 'rgba(213, 205, 189, 0.1)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
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
                    InputProps: {
                      sx: {
                        height: { xs: '40px', sm: '48px' },
                      }
                    }
                  }}
                />
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  bgcolor: 'rgba(130, 101, 62, 0.1)',
                  p: { xs: 0.75, sm: 1, md: 1.5 },
                  borderRadius: { xs: '6px', sm: '8px' },
                  border: '1px solid rgba(130, 101, 62, 0.2)',
                }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        icon={<LockIcon sx={{ 
                          color: '#82653E',
                          opacity: 0.5,
                          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' }
                        }} />}
                        checkedIcon={<LockIcon sx={{ 
                          color: '#82653E',
                          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' }
                        }} />}
                        sx={{
                          padding: { xs: '4px', sm: '6px' },
                          '&:hover': {
                            bgcolor: 'rgba(130, 101, 62, 0.1)',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ 
                          color: '#82653E',
                          fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                          fontWeight: 500,
                        }}>
                          {t('admin.rememberPassword')}
                        </Typography>
                        <Typography sx={{ 
                          color: '#605C54',
                          fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                          display: { xs: 'none', sm: 'block' }
                        }}>
                          {t('admin.rememberPasswordHint')}
                        </Typography>
                      </Box>
                    }
                    sx={{
                      m: 0,
                      '& .MuiFormControlLabel-label': {
                        fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                      },
                    }}
                  />
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{
                    bgcolor: '#D5CDBD',
                    color: '#1A1A1A',
                    height: { xs: '40px', sm: '48px' },
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    fontFamily: 'adventpro',
                    borderRadius: { xs: '6px', sm: '8px' },
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#b1a89a',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(213, 205, 189, 0.2)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transform: 'translateX(-100%)',
                      transition: 'transform 0.5s ease',
                    },
                    '&:hover::before': {
                      transform: 'translateX(100%)',
                    },
                  }}
                >
                  {t('admin.loginButton')}
                </Button>
              </Box>
            </Paper>
          </Container>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ zIndex: 9999 }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{
              width: '100%',
              bgcolor: snackbar.severity === 'error' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(102, 187, 106, 0.1)',
              color: snackbar.severity === 'error' ? '#F44336' : '#66BB6A',
              '.MuiAlert-icon': {
                color: snackbar.severity === 'error' ? '#F44336' : '#66BB6A'
              }
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      bgcolor: '#1A1A1A',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'linear-gradient(rgba(26, 26, 26, 0.95), rgba(26, 26, 26, 0.95)), url("https://goldendie.de/img/bg-pattern.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      {/* Боковая навигация */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          height: '100%',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            bgcolor: 'rgba(36, 36, 36, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(213, 205, 189, 0.1)',
            position: 'static',
            height: '100%',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '1px',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(213, 205, 189, 0.1), rgba(213, 205, 189, 0.05), rgba(213, 205, 189, 0))',
            }
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            width: { xs: '80%', sm: drawerWidth },
            bgcolor: 'rgba(36, 36, 36, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(213, 205, 189, 0.1)',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Основной контент */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(213, 205, 189, 0.03) 0%, rgba(26, 26, 26, 0) 70%)',
            pointerEvents: 'none',
          }
        }}
      >
        {/* Верхняя панель */}
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            bgcolor: 'rgba(36, 36, 36, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(213, 205, 189, 0), rgba(213, 205, 189, 0.1), rgba(213, 205, 189, 0))',
            }
          }}
        >
          <Toolbar sx={{ 
            justifyContent: 'space-between',
            minHeight: { xs: '48px', sm: '56px', md: '64px' },
            px: { xs: 0.5, sm: 1, md: 2 }
          }}>
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: { xs: 1, sm: 2 },
                display: { md: 'none' }, 
                color: '#D5CDBD',
                bgcolor: 'rgba(213, 205, 189, 0.05)',
                '&:hover': {
                  bgcolor: 'rgba(213, 205, 189, 0.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2 
            }}>
              <Typography 
                sx={{ 
                  color: '#605C54',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                {t('admin.greeting')}, <span style={{ color: '#D5CDBD' }}>{currentUser?.username}</span>
              </Typography>

              <IconButton
                onClick={handleLanguageClick}
                sx={{ 
                  color: '#D5CDBD',
                  bgcolor: 'rgba(213, 205, 189, 0.05)',
                  padding: '8px',
                  '&:hover': {
                    bgcolor: 'rgba(213, 205, 189, 0.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <TranslateIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Menu
          anchorEl={languageMenu}
          open={Boolean(languageMenu)}
          onClose={handleLanguageClose}
          PaperProps={{
            sx: {
              bgcolor: 'rgba(36, 36, 36, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(213, 205, 189, 0.1)',
              borderRadius: '8px',
              mt: 1,
              minWidth: '180px',
              '& .MuiMenuItem-root': {
                color: '#D5CDBD',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(213, 205, 189, 0.08)',
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem 
            onClick={() => changeLanguage('ru')}
            selected={i18n.language === 'ru'}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              px: 3,
              py: 1.5,
              '&.Mui-selected': {
                bgcolor: 'rgba(213, 205, 189, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(213, 205, 189, 0.15)',
                },
              },
            }}
          >
            Русский
          </MenuItem>
          <MenuItem 
            onClick={() => changeLanguage('en')}
            selected={i18n.language === 'en'}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              px: 3,
              py: 1.5,
              '&.Mui-selected': {
                bgcolor: 'rgba(213, 205, 189, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(213, 205, 189, 0.15)',
                },
              },
            }}
          >
            English
          </MenuItem>
          <MenuItem 
            onClick={() => changeLanguage('de')}
            selected={i18n.language === 'de'}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              px: 3,
              py: 1.5,
              '&.Mui-selected': {
                bgcolor: 'rgba(213, 205, 189, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(213, 205, 189, 0.15)',
                },
              },
            }}
          >
            Deutsch
          </MenuItem>
        </Menu>

        {/* Контейнер для секций */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          p: { xs: 0.5, sm: 1, md: 2 },
        }}>
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              bgcolor: 'rgba(36, 36, 36, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: { xs: '8px', sm: '12px', md: '16px' },
              border: '1px solid rgba(213, 205, 189, 0.1)',
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, rgba(213, 205, 189, 0) 0%, rgba(213, 205, 189, 0.2) 50%, rgba(213, 205, 189, 0) 100%)',
              }
            }}
          >
            {currentSection === 'products' && <ProductsSection />}
            {currentSection === 'users' && <UsersSection />}
            {currentSection === 'logs' && <LogsSection />}
          </Paper>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            bgcolor: snackbar.severity === 'error' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(102, 187, 106, 0.1)',
            color: snackbar.severity === 'error' ? '#F44336' : '#66BB6A',
            '.MuiAlert-icon': {
              color: snackbar.severity === 'error' ? '#F44336' : '#66BB6A'
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPanel; 