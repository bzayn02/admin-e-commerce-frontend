import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPending: false,
  productResponse: {},
  productList: [],
  selectedProduct: {},
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
    getSingleProductSuccess: (state, { payload = {} }) => {
      state.isPending = false;
      state.selectedProduct = payload.products;
    },
    resetSingleProductSuccess: (state) => {
      state.isPending = false;
      state.selectedProduct = {};
    },
    addProductSuccess: (state, { payload }) => {
      state.isPending = false;
      state.productResponse = payload;
    },
    updateProductSuccess: (state, { payload }) => {
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
  updateProductSuccess,
  deleteProductSuccess,
  getSingleProductSuccess,
  responseFail,
  resetSingleProductSuccess,
} = actions;

export default reducer;
