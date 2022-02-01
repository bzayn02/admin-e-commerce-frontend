import {
  paymentResponsePending,
  paymentResponseSuccess,
  getPaymentResponseSuccess,
  paymentResponseError,
} from './paymentSlice';

import { addPaymentOptions, fetchPaymentOptions } from '../../api/paymentAPI';
import { updateNewAccessJWT } from '../../api/tokenAPI';
import { userLogout } from '../admin-auth-slice/userAction';

export const addNewPaymentOption = (obj) => async (dispatch) => {
  dispatch(paymentResponsePending());

  // call api to send data
  const data = await addPaymentOptions(obj);

  // re-auth
  if (data?.message === 'jwt expired') {
    const token = await updateNewAccessJWT();
    // then re-call the funciton to refetch teh data
    if (token) {
      return dispatch(addNewPaymentOption(obj));
    } else {
      dispatch(userLogout());
    }
  }
  // end of re-auth

  if (data?.status === 'success') {
    dispatch(paymentResponseSuccess(data));
    return;
  }
  dispatch(paymentResponseError(data));
};
export const getPaymentOptions = () => async (dispatch) => {
  dispatch(paymentResponsePending());

  // call api to send data
  const data = await fetchPaymentOptions();

  // re-auth
  if (data?.message === 'jwt expired') {
    const token = await updateNewAccessJWT();
    // then re-call the funciton to refetch teh data
    if (token) {
      return dispatch(getPaymentOptions());
    } else {
      dispatch(userLogout());
    }
  }
  // end of re-auth

  if (data?.status === 'success') {
    dispatch(getPaymentResponseSuccess(data.options));
    return;
  }
  dispatch(paymentResponseError(data));
};
