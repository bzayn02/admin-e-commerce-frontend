import { configureStore } from '@reduxjs/toolkit';
import userReducer from './pages/admin-auth-slice/userSlice';
import categoryReducer from './pages/category/CategorySlice';
import productReducer from './pages/product/ProductSlice';
import paymentReducer from './pages/payment/paymentSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    payment: paymentReducer,
  },
});

export default store;
