import { createTheme } from '@mui/material/styles';
import { Theme } from './types';

export const createMuiTheme = (theme: Theme) => {
  return createTheme({
    components: {
      // Настройки для текстовых полей
      MuiTextField: {
        defaultProps: {
          variant: 'standard', // Стандартный вариант отображения
        },
      },
      // Настройки для контейнера формы
      MuiFormControl: {
        defaultProps: {
          variant: 'standard', // Стандартный вариант отображения
        },
        styleOverrides: {
          root: {
            // Стили при наведении (если нет ошибки)
            '&:hover:not(.Mui-error)': {
              // Стили для метки поля
              '& .MuiInputLabel-root': {
                color: theme.colors.mui.form.hover.primary,
                transition: 'color 0.3s ease 0.2s, transform 0.2s ease',
              },
              // Стили для подчеркивания поля
              '& .MuiInput-underline:before': {
                borderColor: theme.colors.mui.form.hover.primary,
                transition: 'color 0.3s ease',
              },
              // Стили для иконок при наведении
              '&:hover:not(.Mui-error)': {
                '& .MuiSvgIcon-root:not(.MuiCheckbox-root svg)': {
                  color: theme.colors.mui.form.hover.secondary,
                  transition: 'color 0.3s ease 0.2s',
                },
              },
            },
            // Стили при наличии ошибки
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
      // Настройки для базовой кнопки
      MuiButtonBase: {
        styleOverrides: {
          root: {
            // Стили для эффекта нажатия
            '& .MuiTouchRipple-root': {
              '& .MuiTouchRipple-child': {
                backgroundColor: theme.colors.mui.form.secondary,
              },
            },
          },
        },
      },
      // Настройки для поля ввода
      MuiInput: {
        styleOverrides: {
          root: {
            color: theme.colors.mui.form.text.input,
            fontFamily: 'AdventProRegular',
          },
          underline: {
            // Стили для подчеркивания в обычном состоянии
            '&:before': {
              borderColor: theme.colors.mui.form.secondary,
            },
            // Стили для подчеркивания в фокусе
            '&:after': {
              borderColor: theme.colors.mui.form.title,
            },
            // Стили для подчеркивания при ошибке
            '&.Mui-error:before, &.Mui-error:hover:before': {
              borderColor: `${theme.colors.mui.form.error} !important`,
            },
            '&.Mui-error:after': {
              borderColor: `${theme.colors.mui.form.error} !important`,
            },
            // Стили для подчеркивания при наведении
            // '&:hover:not(.Mui-error):before': {
            //   borderColor: theme.colors.mui.form.title,
            // },
          },
        },
      },
      // Настройки для бумажного контейнера
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: theme.colors.mui.form.background.fill,
            border: `1px solid ${theme.colors.mui.form.border.form}`,
            // Стили для скроллбара
            '&::-webkit-scrollbar': { width: '10px' },
            '&::-webkit-scrollbar-thumb': { 
              backgroundColor: theme.colors.mui.form.title, 
              borderRadius: '10px' 
            },
            '&::-webkit-scrollbar-track': {
              width: '1px',
              backgroundColor: theme.colors.mui.form.title,
              border: `4px solid ${theme.colors.mui.form.background.fill}`,
            },
            // Стили для кнопок внутри контейнера
            '& .MuiButtonBase-root': {
              borderBottom: `1px solid ${theme.colors.mui.form.border.form}`,
              height: 'auto', 
            },
            // Стили для текста в списке
            '& .MuiListItemText-root': { width: '100px' },
            '& .MuiTypography-body1': { 
              fontSize: '18px', 
              color: theme.colors.mui.form.secondary 
            },
            '& .MuiTypography-body2': { 
              color: theme.colors.mui.form.title 
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
      // Настройки для автодополнения
      MuiAutocomplete: {
        styleOverrides: {
          // Стили для кнопки очистки
          clearIndicator: { 
            color: theme.colors.mui.form.text.input
          },
          // Стили для кнопки выпадающего списка
          popupIndicator: {
            color: theme.colors.mui.form.secondary,
            transition: 'color 0.3s',
            '&.Mui-error': {
              color: `${theme.colors.mui.form.error} !important`,
            },
            '&:hover': {
              color: theme.colors.mui.form.title,
              '&.Mui-error': {
                color: `${theme.colors.mui.form.error} !important`,
              },
            },
          },
          // Стили для выпадающего списка
          paper: {
            backgroundColor: theme.colors.mui.form.scrollbar.fill,
            color: theme.colors.mui.form.text.primary,
            border: `1px solid ${theme.colors.mui.form.border.form}`,
            fontSize: '10px',
            '@media (min-width:768px)': {
              fontSize: '16px',
            },
            '@media (min-width:1024px)': {
              fontSize: '20px',
            },
          },
          // Стили для опций в списке
          option: {
            borderBottom: `1px solid ${theme.colors.mui.form.border.form}`,
            '&:hover': { 
              backgroundColor: theme.colors.mui.form.background.fill,
            },
          },
          // Стили для контейнера списка
          listbox: {
            // Стили для скроллбара в списке
            '&::-webkit-scrollbar': { width: '10px' },
            '&::-webkit-scrollbar-thumb': { 
              backgroundColor: theme.colors.mui.form.secondary, 
              borderRadius: '10px' 
            },
            '&::-webkit-scrollbar-track': {
              width: '1px',
              backgroundColor: theme.colors.mui.form.title,
              border: `4px solid ${theme.colors.mui.form.background.fill}`,
            },
          },
          // --- ДОБАВЛЕНО: стрелка при наведении на контейнер ---
          root: {
            '&:hover .MuiAutocomplete-popupIndicator, &:hover .MuiAutocomplete-popupIndicator svg': {
              color: theme.colors.mui.form.title,
              fill: theme.colors.mui.form.title,
            },
            '&.Mui-error:hover .MuiAutocomplete-popupIndicator, &.Mui-error:hover .MuiAutocomplete-popupIndicator svg': {
              color: `${theme.colors.mui.form.error} !important`,
              fill: `${theme.colors.mui.form.error} !important`,
            },
          },
        },
      },
      // Настройки для метки поля
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
            // Стили при ошибке
            '&.Mui-error': {
              color: `${theme.colors.mui.form.error} !important`,
            },
            // Стили при фокусе
            '&.Mui-focused:not(.Mui-error)': {
              color: theme.colors.mui.form.title,
              fontWeight: 'bold',
            },
          },
        },
      },
      // Настройки для чекбокса
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: theme.colors.mui.form.secondary,
            transition: 'all 0.5s ease',
            // Стили для отмеченного состояния
            '&.Mui-checked': {
              color: theme.colors.mui.form.title,
              '&:hover': {
                color: theme.colors.mui.form.text.primary,
              },
            },
            // Стили при ошибке
            '&.Mui-error': {
              color: theme.colors.mui.form.error,
              '&:hover': {
                color: theme.colors.mui.form.text.primary,
              },
            },
          },
        },
      },
      // Настройки для метки чекбокса
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            // Стили для текста метки
            '& .MuiTypography-root': {
              color: theme.colors.mui.form.secondary,
              transition: 'color 0.2s',
            },
            // Стили при наведении с ошибкой
            '&:hover .MuiTypography-root.Mui-error': {
              color: `${theme.colors.mui.form.error} !important`,
            },
            // Стили при наведении без ошибки
            '&:hover .MuiTypography-root:not(.Mui-error)': {
              color: theme.colors.mui.form.text.primary,
            },
            // Стили при ошибке
            '& .MuiTypography-root.Mui-error': {
              color: `${theme.colors.mui.form.error} !important`,
            },
            // Стили для чекбокса при наведении
            '&:hover .MuiCheckbox-root': {
              color: theme.colors.mui.form.text.primary,
            },
            // Скрытие звездочки обязательного поля
            '& .MuiFormControlLabel-asterisk': { 
              display: 'none' 
            },
          },
        },
      },
      // Настройки для типографики
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
      // Настройки для селекта
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: theme.colors.mui.form.title,
          },
        },
      },
      // Настройки для текста подсказки
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