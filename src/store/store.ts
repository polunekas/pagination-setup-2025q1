import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './slices/selectedItemsSlice';
import paginationReducer from './slices/paginationSlice';
import { pokemonApi } from './api/pokemonApi';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    pagination: paginationReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
