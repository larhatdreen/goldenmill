import { createTheme } from '@mui/material/styles';
import { Theme } from './types';

export const createMuiTheme = (theme: Theme) => {
  return createTheme({
    palette: {
      mode: theme.name,
      primary: {
        main: theme.colors.mui.form.primary,
      },
      secondary: {
        main: theme.colors.mui.form.secondary,
      },
      error: {
        main: theme.colors.mui.form.error,
      },
      background: {
        paper: theme.colors.mui.form.background.paper,
        default: theme.colors.mui.form.background.default,
      },
      text: {
        primary: theme.colors.mui.form.text.primary,
        secondary: theme.colors.mui.form.text.secondary,
      },
    },
    components: {
      MuiTextField: {
        defaultProps: {
          variant: 'standard',
        },
      },
      MuiFormControl: {
        defaultProps: {
          variant: 'standard',
        },
        styleOverrides: {
          root: {
            '&:hover:not(.Mui-error)': {
              '& .MuiInputLabel-root': {
                color: theme.colors.mui.form.primary,
                transition: 'color 0.3s ease 0.2s, transform 0.2s ease',
              },
              '& .MuiInput-underline:before': {
                borderColor: theme.colors.mui.form.primary,
                transition: 'color 0.3s ease',
              },
              '&:hover:not(.Mui-error)': {
                '& .MuiSvgIcon-root:not(.MuiCheckbox-root svg)': {
                  color: theme.colors.mui.form.primary,
                  transition: 'color 0.3s ease 0.2s',
                },
              },
            },
            '&.Mui-error': {
              '& .MuiInputLabel-root': {
                color: `${theme.colors.mui.form.error} !important`,
                transition: 'color 0.3s ease 0.2s, transform 0.2s ease',
              },
              '& .MuiInput-underline:before': {
                borderColor: `${theme.colors.mui.form.error} !important`,
                transition: 'color 0.3s ease',
              },
            },
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '& .MuiTouchRipple-root': {
              '& .MuiTouchRipple-child': {
                backgroundColor: theme.colors.mui.form.secondary,
              },
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            color: theme.colors.mui.form.text.primary,
            fontFamily: 'AdventProRegular',
          },
          underline: {
            '&:before': {
              borderColor: theme.colors.mui.form.secondary,
            },
            '&:after': {
              borderColor: theme.colors.mui.form.primary,
            },
            '&.Mui-error:before, &.Mui-error:hover:before': {
              borderColor: `${theme.colors.mui.form.error} !important`,
            },
            '&.Mui-error:after': {
              borderColor: `${theme.colors.mui.form.error} !important`,
            },
            '&:hover:not(.Mui-error):before': {
              borderColor: theme.colors.mui.form.primary,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: theme.colors.mui.form.background.paper,
            border: `1px solid ${theme.colors.mui.form.border.default}`,
            '&::-webkit-scrollbar': { width: '10px' },
            '&::-webkit-scrollbar-thumb': { 
              backgroundColor: theme.colors.mui.form.primary, 
              borderRadius: '10px' 
            },
            '&::-webkit-scrollbar-track': {
              width: '1px',
              backgroundColor: theme.colors.mui.form.primary,
              border: `4px solid ${theme.colors.mui.form.background.paper}`,
            },
            '& .MuiButtonBase-root': {
              borderBottom: `1px solid ${theme.colors.mui.form.border.default}`,
              height: 'auto',
              backgroundColor: theme.colors.mui.form.secondary,
            },
            '& .MuiListItemText-root': { width: '100px' },
            '& .MuiTypography-body1': { 
              fontSize: '18px', 
              color: theme.colors.mui.form.secondary 
            },
            '& .MuiTypography-body2': { 
              color: theme.colors.mui.form.primary 
            },
            '& .MuiList-root': { 
              color: theme.colors.mui.form.secondary 
            },
            '& .MuiMenuItem-root': { 
              fontFamily: 'AdventProRegular' 
            },
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          clearIndicator: { 
            color: theme.colors.mui.form.primary 
          },
          popupIndicator: {
            color: theme.colors.mui.form.secondary,
            transition: 'color 0.3s',
            '&.Mui-error': {
              color: `${theme.colors.mui.form.error} !important`,
            },
            '&:hover': {
              color: theme.colors.mui.form.primary,
              '&.Mui-error': {
                color: `${theme.colors.mui.form.error} !important`,
              },
            },
          },
          paper: {
            backgroundColor: theme.colors.mui.form.background.paper,
            color: theme.colors.mui.form.text.primary,
            border: `1px solid ${theme.colors.mui.form.border.default}`,
            fontSize: '10px',
            '@media (min-width:768px)': {
              fontSize: '16px',
            },
            '@media (min-width:1024px)': {
              fontSize: '20px',
            },
          },
          option: {
            borderBottom: `1px solid ${theme.colors.mui.form.border.default}`,
            '&:hover': { 
              backgroundColor: theme.colors.mui.form.background.paper,
            },
          },
          listbox: {
            '&::-webkit-scrollbar': { width: '10px' },
            '&::-webkit-scrollbar-thumb': { 
              backgroundColor: theme.colors.mui.form.secondary, 
              borderRadius: '10px' 
            },
            '&::-webkit-scrollbar-track': {
              width: '1px',
              backgroundColor: theme.colors.mui.form.primary,
              border: `4px solid ${theme.colors.mui.form.background.paper}`,
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: theme.colors.mui.form.secondary,
            fontSize: '13px',
            '@media (min-width:480px)': {
              fontSize: '16px',
            },
            '@media (min-width:768px)': {
              fontSize: '18px',
            },
            '@media (min-width:1024px)': {
              fontSize: '20px',
            },
            fontFamily: 'AdventProRegular',
            top: '-10px',
            '&.Mui-error': {
              color: `${theme.colors.mui.form.error} !important`,
            },
            '&.Mui-focused:not(.Mui-error)': {
              color: theme.colors.mui.form.primary,
              fontWeight: 'bold',
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: theme.colors.mui.form.secondary,
            transition: 'all 0.5s ease',
            '&.Mui-checked': {
              color: theme.colors.mui.form.primary,
              '&:hover': {
                color: theme.colors.mui.form.text.primary,
              },
            },
            '&.Mui-error': {
              color: theme.colors.mui.form.error,
              '&:hover': {
                color: theme.colors.mui.form.text.primary,
              },
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            '& .MuiTypography-root': {
              color: theme.colors.mui.form.secondary,
              transition: 'color 0.2s',
            },
            '&:hover .MuiTypography-root.Mui-error': {
              color: `${theme.colors.mui.form.error} !important`,
            },
            '&:hover .MuiTypography-root:not(.Mui-error)': {
              color: theme.colors.mui.form.text.primary,
            },
            '& .MuiTypography-root.Mui-error': {
              color: `${theme.colors.mui.form.error} !important`,
            },
            '&:hover .MuiCheckbox-root': {
              color: theme.colors.mui.form.text.primary,
            },
            '& .MuiFormControlLabel-asterisk': { 
              display: 'none' 
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            whiteSpace: 'nowrap',
            fontSize: '12px',
            '@media (min-width:768px)': {
              fontSize: '18px',
            },
            '@media (min-width:1024px)': {
              fontSize: '20px',
            },
            fontFamily: 'AdventProRegular',
            color: theme.colors.mui.form.secondary,
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: theme.colors.mui.form.primary,
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontSize: '9px',
            color: theme.colors.mui.form.secondary,
            '@media (min-width:768px)': {
              fontSize: '10px',
            },
            '@media (min-width:1024px)': {
              fontSize: '12px',
            },
          },
        },
      },
    },
  });
};