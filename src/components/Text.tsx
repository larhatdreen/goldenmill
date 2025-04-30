import { createTheme } from '@mui/material/styles';

const newTheme = createTheme({
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
              color: '#82653E',
              transition: 'color 1s ease',
            },
            '& .MuiInput-underline:before': {
              borderColor: '#82653E',
              transition: 'color 1s ease',
            },
            '&:hover:not(.Mui-error)': {
              '& .MuiSvgIcon-root:not(.MuiCheckbox-root svg)': {
                color: '#82653E',
                transition: 'color 1s ease',
              },
            },
          },
          '&.Mui-error': {
            '& .MuiInputLabel-root': {
              color: '#d32f2f !important',
            },
            '& .MuiInput-underline:before': {
              borderColor: '#d32f2f !important',
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
              backgroundColor: '#666666',
            },
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: 'white',
          fontFamily: 'AdventProRegular',
        },
        underline: {
          '&:before': {
            borderColor: '#666666',
          },
          '&:after': {
            borderColor: '#82653E',
          },
          '&.Mui-error:before': {
            borderColor: '#d32f2f',
          },
          '&:hover:not(.Mui-error):before': {
            borderColor: '#82653E',
          },
          '&.Mui-error:hover:before': {
            borderColor: '#d32f2f !important',
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#18191B',
          border: '1px solid #434343',
          '&::-webkit-scrollbar': { width: '10px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#82653E', borderRadius: '10px' },
          '&::-webkit-scrollbar-track': {
            width: '1px',
            backgroundColor: '#82653E',
            border: '4px solid #18191B',
          },
          '& .MuiButtonBase-root': {
            borderBottom: '1px solid #434343',
            height: 'auto',
            backgroundColor: '#666666',
          },
          '& .MuiListItemText-root': { width: '100px' },
          '& .MuiTypography-body1': { fontSize: '18px', color: '#666666' },
          '& .MuiTypography-body2': { color: '#82653E' },
          '& .MuiList-root': { color: '#666666' },
          '& .MuiMenuItem-root': { fontFamily: 'AdventProRegular' },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        clearIndicator: { color: '#82653E' },
        popupIndicator: { color: '#666666' },
        paper: {
          backgroundColor: '#18191B',
          color: 'white',
          border: '1px solid #434343',
          fontSize: '10px',
          '@media (min-width:768px)': {
            fontSize: '16px',
          },
          '@media (min-width:1024px)': {
            fontSize: '20px',
          },
        },
        option: {
          borderBottom: '1px solid #434343',
          '&:hover': { backgroundColor: 'rgba(130,101,62,0.Section3)' },
        },
        listbox: {
          '&::-webkit-scrollbar': { width: '10px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#666666', borderRadius: '10px' },
          '&::-webkit-scrollbar-track': {
            width: '1px',
            backgroundColor: '#82653E',
            border: '4px solid #18191B',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#666666',
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
            color: '#d32f2f !important',
          },
          '&.Mui-focused:not(.Mui-error)': {
            color: '#82653E',
            fontWeight: 'bold',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#666666',
          transition: 'all 0.5s ease',
          '&.Mui-checked': {
            color: '#82653E',
            '&:hover': {
              color: '#FFFFFF',
            },
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: '#666666',
          '&:hover': {
            '& .MuiTypography-root': {
              color: '#FFFFFF',
            },
            '& .MuiCheckbox-root': {
              color: '#FFFFFF',
            },
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
          color: '#666666',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#82653E',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '9px',
          color: '#666666',
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

export default newTheme;
