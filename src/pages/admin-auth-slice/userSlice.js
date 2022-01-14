import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  isLoggedIn: false,
  isPending: false,
  userRegisterResponse: {},
  userLoginResp: {},
  userUpdateResp: {},
  isAutoLoginPending: false,
  showResetPasswordForm: false,
  resetPasswordResponse: {},
  passwordResettingEmail: '',
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
    profileUpdateSuccess: (state, { payload }) => {
      state.userUpdateResp = payload;
      state.isPending = false;
    },
    passwordUpdateSuccess: (state, { payload }) => {
      state.passwordUpdateResp = payload;
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

    switchLoginResetPassForm: (state) => {
      state.showResetPasswordForm = !state.showResetPasswordForm;
    },
    resetPassResponse: (state, { payload }) => {
      state.isPending = false;
      state.resetPasswordResponse = payload.data;
      state.passwordResettingEmail = payload.email;
      state.showResetPasswordForm = payload.data.status === 'success';
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
  profileUpdateSuccess,
  passwordUpdateSuccess,
  switchLoginResetPassForm,
  resetPassResponse,
} = actions;

export default reducer;
