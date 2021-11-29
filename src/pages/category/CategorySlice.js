import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  categoryResponse: {},
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true;
    },
    catRespSuccess: (state, { payload }) => {
      state.isLoading = true;
      state.categoryResponse = payload;
    },

    requestFail: (state, { payload }) => {
      state.isLoading = true;
      state.categoryResponse = payload;
    },
  },
});

const { reducer, actions } = categorySlice;

export default reducer;
export const { requestPending, catRespSuccess, requestFail } = actions;
