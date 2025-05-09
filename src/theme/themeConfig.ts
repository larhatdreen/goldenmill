import { Theme, ThemeMode } from './types';

const baseColors = {
  light: {
    text: '#535353', // Основной цвет текста
    background: '#F8F8F9', // Цвет фона
    decorative: '#F2F2F2', // Декоративный цвет
    title: '#82653F', // Цвет заголовков
    subtitle: '#2A3242', // Цвет подзаголовков
    particle: '#ABB4C3', // Цвет частиц

  textOnSvg: '#696D7B', // Цвет текста на svg

    mainSection: {
      title: '#82653F', // Цвет заголовков 
      subtitle: '#767676', // Цвет подзаголовков
      description: '#2A3242', // Цвет описания
      needHelp: '#7D9AC1', // Цвет текста кнопки "Нужна помощь"
      hover: '#2A3242', // Цвет при наведении
      focus: '#2A3242', // Цвет при фокусе
      models: '#2A3242', // Цвет текста моделей
      numbers: '#000000', // Цвет цифр
    },
    // MUI specific colors
    mui: {
      // Form specific colors
      form: {
        title: '#82653E', // Цвет заголовка формы если он есть
        secondary: '#999999', // Цвет декоративных элементов
        error: '#D32F2F', // Цвет ошибок
        background: {
          paper: '#F8F8F9',
          fill: '#F8F8F9', // Цвет фона формы
        },
        text: {
          primary: '#999999',
          input: '#000000',
        },
        border: {
          form: '#9FA3AC', // Цвет границы формы на светлой в mainSection
        },
        hover: {
          primary: '#82653E', // Ховер на полях
          secondary: '#FFFFFF', // Ховер на чекбоксе с текстом
          checkbox: {
            fill: '#000000',
            text: '#000000',
          },
        },
        scrollbar: {
          thumb: '#999999', // Цвет ползунка скроллбара
          fill: '#F2F1F0', // Цвет фона cписка...
        },
        button: { 
          text: '#000000', // Цвет текста кнопки
          slider: '#ABB4C3', // Цвет слайдера кнопки
        },
      },
    },
  },
  dark: {
    text: '#ACACAC', // Основной цвет текста
    background: '#292A2C', // Цвет фона
    decorative: '#2E3032', // Декоративный цвет
    title: '#D5CDBD', // Цвет заголовков
    subtitle: '#D5CDBD', // Цвет подзаголовков
    particle: '#82643F', // Цвет частиц

    textOnSvg: '#969284', // Цвет текста на svg

    mainSection: {
      title: '#82653F', // Цвет заголовков 
      subtitle: '#767676', // Цвет подзаголовков
      description: '#D5CDBD', // Цвет описания
      needHelp: '#D5CDBD', // Цвет текста кнопки "Нужна помощь"
      hover: '#82653E', // Цвет при наведении
      focus: '#82653E', // Цвет при фокусе
      models: '#D5CDBD', // Цвет текста моделей
      numbers: '#FFFFFF', // Цвет цифр
    },
    // MUI specific colors
    mui: {
      // Form specific colors
      form: {
        title: '#82653E', // Цвет заголовка формы
        secondary: '#666666', // Цвет декоративных элементов (темная тема)
        error: '#D32F2F', // Цвет ошибок
        background: {
          paper: '#ffffff08', // Цвет фона формы
          fill: '#27282B', // Цвет фона формы (темная тема)
        },
        text: {
          primary: '#666666',
          input: '#FFFFFF',
        },
        border: {
          form: 'transparent', // границы формы на темной нет
        },
        hover: {
          primary: '#82653E', // Ховер на полях
          secondary: '#FFFFFF', // Ховер на чекбоксе с текстом
          checkbox: {
            fill: '#FFFFFF',
            text: '#FFFFFF',
          },
        },
        scrollbar: {
          thumb: '#666666', // Цвет ползунка скроллбара
          fill: '#18191B', // Цвет фона cписка...
        },
        button: { 
          text: '#FFFFFF', // Цвет текста кнопки
          slider: '#82653E', // Цвет слайдера кнопки
        },
      },
    },
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
