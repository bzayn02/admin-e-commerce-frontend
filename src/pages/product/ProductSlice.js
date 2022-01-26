import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPending: false,
  productResponse: {},
  productList: [],
};
const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    responsePending: (state) => {
      state.isPending = true;
    },
    getProductsSuccess: (state, { payload = [] }) => {
      state.isPending = false;
      state.productList = payload.products;
    },
    addProductSuccess: (state, { payload }) => {
      state.isPending = false;
      state.productResponse = payload;
    },
    deleteProductSuccess: (state, { payload }) => {
      state.isPending = false;
      state.productResponse = payload;
    },
    responseFail: (state, { payload }) => {
      state.isPending = false;
      state.productResponse = payload;
    },
  },
});

const { reducer, actions } = productSlice;
export const {
  responsePending,
  getProductsSuccess,
  addProductSuccess,
  deleteProductSuccess,
  responseFail,
} = actions;

export default reducer;
