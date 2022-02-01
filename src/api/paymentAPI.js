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

// export const updateNewAccessJWT = async () => {
//   try {
//     window.sessionStorage.removeItem('accessJWT');
//     const { accessJWT } = await getNewAccessJWT();
//     if (accessJWT) {
//       window.sessionStorage.setItem('accessJWT', accessJWT);
//     }
//     return window.sessionStorage.getItem('accessJWT');
//   } catch (error) {
//     return false;
//   }
// };

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
