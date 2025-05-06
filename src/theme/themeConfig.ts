import { Theme, ThemeMode } from './types';

const baseColors = {
  light: {
    text: '#535353', // Основной цвет текста
    background: '#F8F8F9', // Цвет фона
    decorative: '#F2F2F2', // Декоративный цвет
    title: '#82653F', // Цвет заголовков
    subtitle: '#2A3242', // Цвет подзаголовков
    particle: '#ABB4C3', // Цвет частиц
    // MUI specific colors
    mui: {
      // Form specific colors
      form: {
        primary: '#82653E', // Основной цвет форм (акцентный)
        secondary: '#434343', // Вторичный цвет форм
        error: '#d32f2f', // Цвет ошибок
        background: {
          paper: '#F8F8F9', // Цвет фона бумаги
          default: '#FFFFFF' // Цвет фона по умолчанию
        },
        text: {
          primary: '#434343', // Основной цвет текста
          secondary: '#666666' // Вторичный цвет текста
        },
        border: {
          default: '#9FA3AC', // Цвет границ по умолчанию
        },
        hover: {
          primary: '#82653E', // Цвет при наведении (основной)
          secondary: '#666666' // Цвет при наведении (вторичный)
        },
        button: {
          text: '#000000', // Цвет текста кнопки
          slider: '#ABB4C3' // Цвет слайдера кнопки
        }
      }
    }
  },
  dark: {
    text: '#ACACAC', // Основной цвет текста
    background: '#292A2C', // Цвет фона
    decorative: '#2E3032', // Декоративный цвет
    title: '#D5CDBD', // Цвет заголовков
    subtitle: '#D5CDBD', // Цвет подзаголовков
    particle: '#82643F', // Цвет частиц
    // MUI specific colors
    mui: {
      // Form specific colors
      form: {
        primary: '#82653E', // Основной цвет форм (акцентный)
        secondary: '#666666', // Вторичный цвет форм
        error: '#d32f2f', // Цвет ошибок
        background: {
          paper: '#ffffff08', // Цвет фона бумаги
          default: '#292A2C' // Цвет фона по умолчанию
        },
        text: {
          primary: '#D5CDBD', // Основной цвет текста
          secondary: '#666666' // Вторичный цвет текста
        },
        border: {
          default: '#292A2C', // Цвет границ по умолчанию
        },
        hover: {
          primary: '#82653E', // Цвет при наведении (основной)
          secondary: '#666666' // Цвет при наведении (вторичный)
        },
        button: {
          text: '#FFFFFF',  // Цвет текста кнопки
          slider: '#82653E' // Цвет слайдера кнопки
        }
      }
    }
  },
};

const svgColors = {
  light: {
    fill: '#C0BFBD', // Цвет заливки
    arrow: '#C0BFBD', // Цвет стрелок
    darkColor: '#E8E8E8', // Темный цвет
    lightColor: '#F6F6F6', // Светлый цвет
    crossColor: '#E8E8E8', // Цвет крестиков
  },
  dark: {
    fill: '#3F4042', // Цвет заливки
    arrow: '#3F4042', // Цвет стрелок
    darkColor: '#2D2D2D', // Темный цвет
    lightColor: '#343637', // Светлый цвет
    crossColor: '#343637', // Цвет крестиков
  },
};

export const createTheme = (mode: ThemeMode): Theme => ({
  name: mode,
  colors: {
    ...baseColors[mode],
    svg: svgColors[mode],
  },
});

export const themeConfig = {
  light: createTheme('light'),
  dark: createTheme('dark'),
} as const;
