import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPending: false,
  paymentResponse: {},
  paymentOptions: [],
};
const paymentSlice = createSlice({
  name: 'paymentSlice',
  initialState,
  reducers: {
    paymentResponsePending: (state) => {
      state.isPending = true;
    },
    paymentResponseSuccess: (state, { payload = {} }) => {
      state.isPending = false;
      state.paymentResponse = payload;
    },
    deletePaymentResponseSuccess: (state, { payload = {} }) => {
      state.isPending = false;
      state.paymentResponse = payload;
    },
    getPaymentResponseSuccess: (state, { payload = [] }) => {
      state.isPending = false;
      state.paymentOptions = payload;
    },
    resetResponseMessage: (state) => {
      state.isPending = false;
      state.paymentResponse = state.paymentResponse.status && {};
    },
    paymentResponseError: (state, { payload }) => {
      state.isPending = false;
      state.paymentResponse = payload;
    },
  },
});

const { reducer, actions } = paymentSlice;

export const {
  paymentResponsePending,
  paymentResponseSuccess,
  getPaymentResponseSuccess,
  paymentResponseError,
  resetResponseMessage,
  deletePaymentResponseSuccess,
} = actions;

export default reducer;
