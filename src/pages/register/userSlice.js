import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPending: false,
  userRegisterResponse: {},
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isPending = true;
    },

    responseSuccess: (state, { payload }) => {
      state.isPending = false;
      state.userRegisterResponse = payload;
    },
    requestFail: (state, { payload }) => {
      state.isPending = false;
      state.userRegisterResponse = payload;
    },
  },
});

const { reducer, actions } = userSlice;

export const { requestPending, responseSuccess, requestFail } = actions;

export default reducer;
