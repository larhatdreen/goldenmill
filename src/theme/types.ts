export interface ThemeColors {
  text: string;
  background: string;
  decorative: string;
  title: string;
  subtitle: string;
  particle: string;
  svg: {
    fill: string;
    darkColor: string;
    lightColor: string;
    crossColor: string;
    arrow: string;
  };
  mui: {
    primary: string;
    secondary: string;
    error: string;
    background: {
      paper: string;
      default: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    border: {
      default: string;
      light: string;
    };
    hover: {
      primary: string;
      secondary: string;
    };
  };
}

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  name: ThemeMode;
  colors: ThemeColors;
}
