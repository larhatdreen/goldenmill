export const darkTheme = {
  name: 'dark',
  colors: {
    text: '#ACACAC',
    background: '#292A2C',
    decorative: '#2E3032',
    title: '#D5CDBD',
    subtitle: '#D5CDBD',
    particle: '#82643F',

    _svg : {
      fill : '#3F4042',
      arrow : '#3F4042',
      darkColor: '#2D2D2D',
      lightColor: '#343637',
      crossColor: '#343637'
    }
  },
};

export const lightTheme = {
  name: 'light',
  colors: {
    text: '#535353',
    background: '#F8F8F9',
    decorative: '#F2F2F2',
    title: '#82653F',
    subtitle: '#2A3242',
    particle: '#ABB4C3',
    _svg : {
      fill : '#C0BFBD',
      arrow : '#C0BFBD',
      darkColor: '#E8E8E8',
      lightColor: '#F6F6F6',
      crossColor: '#E8E8E8'

    }
  },
};



const themeConfig = {
  light: lightTheme,
  dark: darkTheme,
};

export default themeConfig;








