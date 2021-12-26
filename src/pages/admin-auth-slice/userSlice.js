import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  isLoggedIn: false,
  isPending: false,
  userRegisterResponse: {},
  userLoginResp: {},
  isAutoLoginPending: false,
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
      state.userRegisterResponse = payload || {};
    },
    loginSuccess: (state, { payload }) => {
      state.userInfo = payload;
      state.userLoginResp = {};
      state.isLoggedIn = true;
      state.isPending = false;
    },
    userLogoutSuccess: (state) => {
      state.userInfo = {};
      state.isLoggedIn = false;
      state.isAutoLoginPending = false;
    },
    loginFail: (state, { payload }) => {
      state.isPending = false;
      state.userLoginResp = payload || {};
    },
    loginAuto: (state) => {
      state.isLoggedIn = true;
      state.isAutoLoginPending = false;
    },
    autoLoginPending: (state, { payload }) => {
      state.isAutoLoginPending = payload;
    },
    requestFail: (state, { payload }) => {
      state.isPending = false;
      state.userRegisterResponse = payload || {};
    },
  },
});

const { reducer, actions } = userSlice;

export const {
  requestPending,
  responseSuccess,
  loginSuccess,
  loginAuto,
  loginFail,
  requestFail,
  autoLoginPending,
  userLogoutSuccess,
} = actions;

export default reducer;
