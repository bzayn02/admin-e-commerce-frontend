import { createUser, verifyNewUser, loginUser } from '../../api/userAPI';
import {
  requestPending,
  responseSuccess,
  loginSuccess,
  requestFail,
  loginAuto,
  loginFail,
  userLogoutSuccess,
  autoLoginPending,
} from './userSlice';
import { getNewAccessJWT } from '../../api/tokenAPI';

export const userRegister = (newUser) => async (dispatch) => {
  console.log(newUser);
  dispatch(requestPending());

  //call api

  const result = await createUser(newUser);
  result.status === 'success'
    ? dispatch(responseSuccess(result))
    : dispatch(requestFail(result));

  //dispatch response
};

export const userEmailVerification = (userObj) => async (dispatch) => {
  dispatch(requestPending());

  const result = await verifyNewUser(userObj);
  result?.status === 'success'
    ? dispatch(responseSuccess(result))
    : dispatch(requestFail(result));
};

const setJWTinBrowserMemory = ({ accessJWT, refreshJWT }) => {
  window.sessionStorage.setItem('accessJWT', accessJWT);
  window.localStorage.setItem('refreshJWT', refreshJWT);
};

export const adminLogin = (loginInfo) => async (dispatch) => {
  dispatch(requestPending());

  //call api to login

  const result = await loginUser(loginInfo);
  if (result?.status === 'success') {
    setJWTinBrowserMemory(result.JWTs);
    return dispatch(loginSuccess(result.user));
  }
  dispatch(loginFail(result));
};

export const autoLogin = () => async (dispatch) => {
  dispatch(autoLoginPending(true));
  const accessJWT = window.sessionStorage.getItem('accessJWT');
  const refreshJWT = window.localStorage.getItem('refreshJWT');
  // 1. accessJWT exist?
  if (accessJWT) {
    return dispatch(loginAuto());
  }
  //2. accessJWT doesnot exit? but refreshJWT does
  if (!accessJWT && refreshJWT) {
    //call api to get refreshJWT
    const result = await getNewAccessJWT();
    if (result?.accessJWT) {
      window.sessionStorage.setItem('accessJWT', result.accessJWT);
      return dispatch(loginAuto());
    }
    dispatch(userLogout());
  }
};
export const userLogout = () => (dispatch) => {
  window.sessionStorage.removeItem('accessJWT');
  window.localStorage.removeItem('refreshJWT');
  dispatch(userLogoutSuccess());
};
