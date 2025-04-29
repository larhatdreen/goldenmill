import { createTheme } from '@mui/material/styles'

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
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: 'white',
          fontFamily: 'AdventProRegular',
        },
        underline: {
          '&:before': {
            borderColor: '#3A3A3A',
          },
          '&:after': {
            borderColor: '#82653E',
          },
          '&:hover:before': {
            borderBottom: '2px solid #3A3A3A !important',
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
          '& .MuiButtonBase-root': { borderBottom: '1px solid #434343', height: 'auto' },
          '& .MuiListItemText-root': { width: '100px' },
          '& .MuiTypography-body1': { fontSize: '18px', color: 'white' },
          '& .MuiTypography-body2': { color: '#82653E' },
          '& .MuiList-root': { color: 'white' },
          '& .MuiMenuItem-root': { fontFamily: 'AdventProRegular' },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        clearIndicator: { color: '#82653E' },
        popupIndicator: { color: '#82653E' },
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
        option: { borderBottom: '1px solid #434343', '&:hover': { backgroundColor: 'rgba(130,101,62,0.Section3)' } },
        listbox: {
          '&::-webkit-scrollbar': { width: '10px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#82653E', borderRadius: '10px' },
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
          color: '#434343',
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
          '&.Mui-focused': {
            color: '#82653E',
            fontWeight: 'bold',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#4A4A4A',
          '&.Mui-checked': {
            color: '#82653E',
          },
          // paddingTop: 5
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        // asterisk: {display: "none"},
        root: {
          fontSize: '18px',
          fontFamily: 'AdventProRegular',
          color: '#4A4A4A',
          // alignItems: "flex-start"
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          '@media (min-width:768px)': {
            fontSize: '18px',
          },
          '@media (min-width:1024px)': {
            fontSize: '20px',
          },
          fontFamily: 'AdventProRegular',
          color: '#4A4A4A',
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
})

export default newTheme
