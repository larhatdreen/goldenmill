import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  // По умолчанию светлая тема
  return false;
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
      localStorage.setItem('theme', state.shadowTheme ? 'dark' : 'light');
    },
    setTheme: (state, action) => {
      state.shadowTheme = action.payload;
      localStorage.setItem('theme', action.payload ? 'dark' : 'light');
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
