import { configureStore } from '@reduxjs/toolkit';
import userReducer from './pages/admin-auth-slice/userSlice';
import categoryReducer from './pages/category/CategorySlice';
import productReducer from './pages/product/ProductSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
  },
});

export default store;
