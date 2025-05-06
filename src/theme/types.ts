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
    form: {
      title: string;
      secondary: string;
      error: string;
      background: {
        paper: string;
        fill: string;
      };
      text: {
        primary: string;
        input: string;
      };
      border: {
        form: string;
      };
      hover: {
        primary: string;
        secondary: string,
          checkbox: {
            fill: string;
            text: string;
         }
      };
      scrollbar: {
        thumb: string;
        fill: string;
      };
      button: {
        text: string;
        slider: string;
      };
    };  
  }
};

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  name: ThemeMode;
  colors: ThemeColors;
}
