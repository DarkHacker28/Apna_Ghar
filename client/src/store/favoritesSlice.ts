import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  ids: string[];
}

const getSaved = () => {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem('ag_favorites') || '[]'); } catch { return []; }
};

const initialState: FavoritesState = { ids: getSaved() };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter(i => i !== id);
      } else {
        state.ids.push(id);
      }
      if (typeof window !== 'undefined') localStorage.setItem('ag_favorites', JSON.stringify(state.ids));
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.ids = action.payload;
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
