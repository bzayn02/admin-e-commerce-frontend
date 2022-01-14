import {
  createUser,
  verifyNewUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  getUser,
  updateUserPassword,
  resetForgetPassword,
} from '../../api/userAPI';
import {
  requestPending,
  responseSuccess,
  loginSuccess,
  requestFail,
  loginAuto,
  loginFail,
  profileUpdateSuccess,
  userLogoutSuccess,
  autoLoginPending,
  passwordUpdateSuccess,
  resetPassResponse,
} from './userSlice';
import {
  getNewAccessJWT,
  updateNewAccessJWT,
  requestOTP,
} from '../../api/tokenAPI';

export const userRegister = (newUser) => async (dispatch) => {
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
export const userLogout = () => async (dispatch) => {
  const accessJWT = window.sessionStorage.getItem('accessJWT');
  const refreshJWT = window.localStorage.getItem('refreshJWT');
  await logoutUser({ accessJWT, refreshJWT });
  window.sessionStorage.removeItem('accessJWT');
  window.localStorage.removeItem('refreshJWT');
  dispatch(userLogoutSuccess());
};

export const fetchUser = () => async (dispatch) => {
  dispatch(requestPending());
  const data = await getUser();

  if (data?.message === 'jwt expired') {
    // request for new accessjWT

    const token = await updateNewAccessJWT();
    // then re-call the funciton to refetch teh data
    if (token) {
      return dispatch(fetchUser());
    } else {
      dispatch(userLogout());
    }
  }
  if (data?.user) {
    return dispatch(loginSuccess(data?.user));
  }
  dispatch(requestFail(data));
};

export const updateProfileUser = (userInfo) => async (dispatch) => {
  dispatch(requestPending());
  const data = await updateUserProfile(userInfo);

  if (data?.message === 'jwt expired') {
    // request for new accessjWT

    const token = await updateNewAccessJWT();
    // then re-call the funciton to refetch teh data
    if (token) {
      return dispatch(updateProfileUser(userInfo));
    } else {
      dispatch(userLogout());
    }
  }
  dispatch(profileUpdateSuccess(data));
};
export const updatePasswordUser = (passInfo) => async (dispatch) => {
  dispatch(requestPending());
  const data = await updateUserPassword(passInfo);

  if (data?.message === 'jwt expired') {
    // request for new accessjWT

    const token = await updateNewAccessJWT();
    // then re-call the funciton to refetch teh data
    if (token) {
      return dispatch(updatePasswordUser(passInfo));
    } else {
      dispatch(userLogout());
    }
  }
  dispatch(passwordUpdateSuccess(data));
};
export const requestPassResetOTP = (email) => async (dispatch) => {
  dispatch(requestPending());
  const data = await requestOTP(email);

  dispatch(resetPassResponse({ data, email }));
};
export const resetPasswordAction = (passObj) => async (dispatch) => {
  dispatch(requestPending());
  const data = await resetForgetPassword(passObj);

  dispatch(resetPassResponse({ data }));
};
