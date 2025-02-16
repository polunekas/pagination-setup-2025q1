import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './slices/selectedItemsSlice';
import paginationReducer from './slices/paginationSlice';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    pagination: paginationReducer,
  },
});
