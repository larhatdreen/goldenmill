import { useState, useEffect } from 'react';
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
  Box,
  IconButton,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Snackbar,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  lastLogin: string;
}

const UsersSection = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<User & { password?: string }>({
    id: '',
    username: '',
    email: '',
    role: '',
    lastLogin: '',
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError('Не удалось загрузить пользователей');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setCurrentUser({
      id: '',
      username: '',
      email: '',
      role: '',
      lastLogin: '',
      password: ''
    });
    setOpenDialog(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser({ ...user, password: '' });
    setOpenDialog(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedUserId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/users/${selectedUserId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete user');
      }
      
      await fetchUsers();
      setDeleteDialogOpen(false);
      setSelectedUserId(null);
      showNotification(t('admin.users.notification.deleteSuccess'), 'success');
    } catch (error: any) {
      setError(error.message || t('admin.users.notification.deleteError'));
      showNotification(t('admin.users.notification.deleteError'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors: {
      username?: string;
      email?: string;
      password?: string;
    } = {};

    if (!currentUser.username.trim()) {
      errors.username = t('admin.users.validation.usernameRequired');
    }

    if (!currentUser.email.trim()) {
      errors.email = t('admin.users.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(currentUser.email)) {
      errors.email = t('admin.users.validation.emailInvalid');
    }

    if (!currentUser.id && !currentUser.password) {
      errors.password = t('admin.users.validation.passwordRequired');
    } else if (currentUser.password && currentUser.password.length < 6) {
      errors.password = t('admin.users.validation.passwordLength');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveUser = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { id, ...userData } = currentUser;
      
      if (!userData.password) {
        delete userData.password;
      }

      const response = await fetch(
        id ? `${API_URL}/users/${id}` : `${API_URL}/users`,
        {
          method: id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save user');
      }

      await fetchUsers();
      setOpenDialog(false);
      showNotification(
        id ? t('admin.users.notification.updateSuccess') : t('admin.users.notification.createSuccess'), 
        'success'
      );
    } catch (error: any) {
      setError(error.message || t('admin.users.notification.saveError'));
      showNotification(t('admin.users.notification.saveError'), 'error');
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
          {t('admin.users.title')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />}
          onClick={handleAddUser}
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
          {t('admin.users.addUser')}
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
                      display: { xs: 'none', sm: 'table-cell' },
                    }}
                  >
                    {t('admin.users.fields.id')}
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
                    {t('admin.users.fields.username')}
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
                    {t('admin.users.fields.email')}
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
                    {t('admin.users.fields.role')}
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
                      minWidth: { xs: '80px', sm: 'auto' },
                    }}
                  >
                    {t('admin.users.fields.actions')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow 
                    key={user.id}
                    sx={{
                      bgcolor: '#1A1A1A',
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
                        display: { xs: 'none', sm: 'table-cell' },
                      }}
                    >
                      {user.id}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: '#D5CDBD',
                        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                        fontFamily: 'adventpro',
                        p: { xs: 1, sm: 2 },
                        maxWidth: '200px',
                      }}
                    >
                      <Typography
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          lineHeight: 1.2,
                        }}
                      >
                        {user.username}
                      </Typography>
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: '#D5CDBD',
                        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                        fontFamily: 'adventpro',
                        p: { xs: 1, sm: 2 },
                        maxWidth: '250px',
                        display: { xs: 'none', sm: 'table-cell' },
                      }}
                    >
                      <Typography
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          lineHeight: 1.2,
                        }}
                      >
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: '#D5CDBD',
                        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                        fontFamily: 'adventpro',
                        p: { xs: 1, sm: 2 },
                      }}
                    >
                      <Chip
                        label={t(`admin.roles.${user.role.toLowerCase()}`)}
                        sx={{
                          bgcolor: user.role === 'administrator' ? 'rgba(130, 101, 62, 0.1)' : 'rgba(213, 205, 189, 0.1)',
                          color: user.role === 'administrator' ? '#82653E' : '#D5CDBD',
                          borderRadius: '4px',
                          fontFamily: 'adventpro',
                          fontSize: '0.875rem',
                        }}
                      />
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: '#D5CDBD',
                        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                        fontFamily: 'adventpro',
                        p: { xs: 1, sm: 2 },
                      }}
                    >
                      {new Date(user.lastLogin).toLocaleString()}
                    </TableCell>
                    <TableCell 
                      align="right"
                      sx={{ 
                        borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
                        p: { xs: 0.5, sm: 1 },
                      }}
                    >
                      <IconButton
                        onClick={() => handleEditUser(user)}
                        sx={{ 
                          color: '#D5CDBD',
                          p: { xs: 0.5, sm: 1 },
                          '&:hover': {
                            bgcolor: 'rgba(213, 205, 189, 0.08)',
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(user.id)}
                        sx={{ 
                          color: '#ff4444',
                          p: { xs: 0.5, sm: 1 },
                          '&:hover': {
                            bgcolor: 'rgba(255, 68, 68, 0.08)',
                          },
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
      </Box>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#242424',
            backgroundImage: 'none',
            borderRadius: '12px',
            '& .MuiDialogTitle-root': {
              borderBottom: '1px solid rgba(213, 205, 189, 0.1)',
              padding: '24px',
            },
            '& .MuiDialogContent-root': {
              padding: '24px',
              bgcolor: '#242424',
            },
            '& .MuiDialogActions-root': {
              padding: '16px 24px',
              borderTop: '1px solid rgba(213, 205, 189, 0.1)',
            },
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            color: '#D5CDBD',
            fontFamily: 'bebas',
            letterSpacing: '1px',
            fontSize: '1.5rem',
          }}
        >
          {currentUser.id ? t('admin.users.editUser') : t('admin.users.addUser')}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: '8px !important' }}>
            <TextField
              fullWidth
              label={t('admin.users.fields.username')}
              value={currentUser.username}
              onChange={(e) => {
                setCurrentUser({ ...currentUser, username: e.target.value });
                setFormErrors({ ...formErrors, username: undefined });
              }}
              error={!!formErrors.username}
              helperText={formErrors.username}
              disabled={currentUser.username === 'admin'}
              required
              sx={{
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
                  '&.Mui-error fieldset': {
                    borderColor: '#f44336',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#605C54',
                  '&.Mui-focused': {
                    color: '#D5CDBD',
                  },
                  '&.Mui-error': {
                    color: '#f44336',
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#f44336',
                  marginLeft: 0,
                  marginTop: '8px',
                },
              }}
            />
            <TextField
              fullWidth
              type="password"
              label={t('admin.users.fields.password')}
              value={currentUser.password || ''}
              onChange={(e) => {
                setCurrentUser({ ...currentUser, password: e.target.value });
                setFormErrors({ ...formErrors, password: undefined });
              }}
              error={!!formErrors.password}
              helperText={formErrors.password}
              disabled={currentUser.username === 'admin'}
              required={!currentUser.id}
              sx={{
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
                  '&.Mui-error fieldset': {
                    borderColor: '#f44336',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#605C54',
                  '&.Mui-focused': {
                    color: '#D5CDBD',
                  },
                  '&.Mui-error': {
                    color: '#f44336',
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#f44336',
                  marginLeft: 0,
                  marginTop: '8px',
                },
              }}
            />
            <TextField
              fullWidth
              label={t('admin.users.fields.email')}
              value={currentUser.email}
              onChange={(e) => {
                setCurrentUser({ ...currentUser, email: e.target.value });
                setFormErrors({ ...formErrors, email: undefined });
              }}
              error={!!formErrors.email}
              helperText={formErrors.email}
              disabled={currentUser.username === 'admin'}
              required
              sx={{
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
                  '&.Mui-error fieldset': {
                    borderColor: '#f44336',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#605C54',
                  '&.Mui-focused': {
                    color: '#D5CDBD',
                  },
                  '&.Mui-error': {
                    color: '#f44336',
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#f44336',
                  marginLeft: 0,
                  marginTop: '8px',
                },
              }}
            />
            <FormControl 
              fullWidth 
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: '#605C54',
                  '&.Mui-focused': {
                    color: '#D5CDBD',
                  },
                },
                '& .MuiInputLabel-shrink': {
                  backgroundColor: '#242424',
                  padding: '0 8px',
                  marginLeft: '-4px',
                },
                '& .MuiOutlinedInput-root': {
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
                    borderWidth: '1px',
                  },
                },
              }}
            >
              <InputLabel id="role-label">{t('admin.users.fields.role')}</InputLabel>
              <Select
                labelId="role-label"
                value={currentUser.role}
                onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                disabled={currentUser.username === 'admin'}
                label="Роль"
                displayEmpty
                sx={{
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
                      mt: 1,
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
                <MenuItem 
                  value="manager"
                  sx={{
                    color: '#D5CDBD',
                    '&:hover': {
                      bgcolor: 'rgba(213, 205, 189, 0.08)',
                    },
                    '&.Mui-selected': {
                      bgcolor: 'rgba(213, 205, 189, 0.15)',
                      '&:hover': {
                        bgcolor: 'rgba(213, 205, 189, 0.23)',
                      },
                    },
                  }}
                >
                  {t('admin.roles.manager')}
                </MenuItem>
                <MenuItem 
                  value="administrator"
                  sx={{
                    color: '#D5CDBD',
                    '&:hover': {
                      bgcolor: 'rgba(213, 205, 189, 0.08)',
                    },
                    '&.Mui-selected': {
                      bgcolor: 'rgba(213, 205, 189, 0.15)',
                      '&:hover': {
                        bgcolor: 'rgba(213, 205, 189, 0.23)',
                      },
                    },
                  }}
                >
                  {t('admin.roles.administrator')}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              color: '#605C54',
              '&:hover': {
                bgcolor: 'rgba(213, 205, 189, 0.08)',
                color: '#D5CDBD',
              },
            }}
          >
            {t('admin.actions.cancel')}
          </Button>
          <Button
            onClick={handleSaveUser}
            disabled={loading || currentUser.username === 'admin'}
            sx={{
              bgcolor: '#D5CDBD',
              color: '#1A1A1A',
              px: 3,
              '&:hover': {
                bgcolor: '#b1a89a',
              },
              '&:disabled': {
                bgcolor: 'rgba(213, 205, 189, 0.1)',
                color: '#605C54',
              },
            }}
          >
            {currentUser.id ? t('admin.actions.save') : t('admin.actions.add')}
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
              '&:hover': {
                bgcolor: 'rgba(213, 205, 189, 0.08)',
                color: '#D5CDBD',
              },
            }}
          >
            {t('admin.actions.cancel')}
          </Button>
          <Button
            onClick={handleDeleteUser}
            sx={{
              color: '#ff4444',
              '&:hover': {
                bgcolor: 'rgba(255, 68, 68, 0.08)',
              },
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

export default UsersSection; 