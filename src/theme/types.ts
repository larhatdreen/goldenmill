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
}

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  name: ThemeMode;
  colors: ThemeColors;
}
