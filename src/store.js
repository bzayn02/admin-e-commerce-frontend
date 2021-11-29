import { configureStore } from '@reduxjs/toolkit';
import userReducer from './pages/register/userSlice';
import categoryReducer from './pages/category/CategorySlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
  },
});

export default store;
