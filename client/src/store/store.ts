import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './propertySlice';
import authReducer from './authSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    properties: propertyReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
