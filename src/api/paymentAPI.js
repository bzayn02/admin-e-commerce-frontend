import axios from 'axios';

const rootUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.ROOT_URL
    : 'http://localhost:8000/api/v1';
const paymentAPI = rootUrl + '/payment-options';

export const fetchPaymentOptions = async () => {
  try {
    const { data } = await axios.get(paymentAPI, {
      headers: { Authorization: window.sessionStorage.getItem('accessJWT') },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const addPaymentOptions = async (obj) => {
  try {
    const { data } = await axios.post(paymentAPI, obj, {
      headers: { Authorization: window.sessionStorage.getItem('accessJWT') },
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const updatePaymentOptions = async (obj) => {
  try {
    const { data } = await axios.patch(paymentAPI, obj, {
      headers: { Authorization: window.sessionStorage.getItem('accessJWT') },
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const deletePaymentOption = async (_id) => {
  try {
    const { data } = await axios.delete(paymentAPI + '/' + _id, {
      headers: { Authorization: window.sessionStorage.getItem('accessJWT') },
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};
