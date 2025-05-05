import { Theme, ThemeMode } from './types';

const baseColors = {
  light: {
    text: '#535353',
    background: '#F8F8F9',
    decorative: '#F2F2F2',
    title: '#82653F',
    subtitle: '#2A3242',
    particle: '#ABB4C3',
    // MUI specific colors
    mui: {
      primary: '#82653E',
      secondary: '#666666',
      error: '#d32f2f',
      background: {
        paper: '#F8F8F9',
        default: '#FFFFFF'
      },
      text: {
        primary: '#535353',
        secondary: '#666666'
      },
      border: {
        default: '#434343',
        light: '#E8E8E8'
      },
      hover: {
        primary: '#82653E',
        secondary: '#666666'
      }
    }
  },
  dark: {
    text: '#ACACAC',
    background: '#292A2C',
    decorative: '#2E3032',
    title: '#D5CDBD',
    subtitle: '#D5CDBD',
    particle: '#82643F',
    // MUI specific colors
    mui: {
      primary: '#82653E',
      secondary: '#666666',
      error: '#d32f2f',
      background: {
        paper: '#18191B',
        default: '#292A2C'
      },
      text: {
        primary: '#D5CDBD',
        secondary: '#666666'
      },
      border: {
        default: '#434343',
        light: '#2E3032'
      },
      hover: {
        primary: '#82653E',
        secondary: '#666666'
      }
    }
  },
};

const svgColors = {
  light: {
    fill: '#C0BFBD',
    arrow: '#C0BFBD',
    darkColor: '#E8E8E8',
    lightColor: '#F6F6F6',
    crossColor: '#E8E8E8',
  },
  dark: {
    fill: '#3F4042',
    arrow: '#3F4042',
    darkColor: '#2D2D2D',
    lightColor: '#343637',
    crossColor: '#343637',
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
