import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shadowTheme: true, // true = dark, false = light
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.shadowTheme = !state.shadowTheme;
    },
    setTheme: (state, action) => {
      state.shadowTheme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
