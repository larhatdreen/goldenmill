import { createSlice } from '@reduxjs/toolkit';

// Безопасное получение данных из localStorage
const getStoredData = (key: string): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage.getItem(key)
  }
  return null
}

// Безопасное сохранение данных в localStorage
const setStoredData = (key: string, value: string): void => {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(key, value)
  }
}

// Безопасная проверка предпочтений темы
const getSystemTheme = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const getInitialTheme = () => {
  const savedTheme = getStoredData('theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  return getSystemTheme();
};

const initialState = {
  shadowTheme: getInitialTheme(), // true = dark, false = light
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.shadowTheme = !state.shadowTheme;
      setStoredData('theme', state.shadowTheme ? 'dark' : 'light');
    },
    setTheme: (state, action) => {
      state.shadowTheme = action.payload;
      setStoredData('theme', action.payload ? 'dark' : 'light');
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
