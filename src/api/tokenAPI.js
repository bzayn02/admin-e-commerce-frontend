import axios from 'axios';

const rootUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.ROOT_URL
    : 'http://localhost:8000/api/v1';
const tokenAPI = rootUrl + '/token';

export const getNewAccessJWT = async () => {
  try {
    const { data } = await axios.get(tokenAPI, {
      headers: { Authorization: window.localStorage.getItem('refreshJWT') },
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateNewAccessJWT = async () => {
  try {
    window.sessionStorage.removeItem('accessJWT');
    const { accessJWT } = await getNewAccessJWT();
    if (accessJWT) {
      window.sessionStorage.setItem('accessJWT', accessJWT);
    }
    return window.sessionStorage.getItem('accessJWT');
  } catch (error) {
    return false;
  }
};

export const requestOTP = async (email) => {
  try {
    if (!email) {
      return false;
    }
    const { data } = await axios.post(tokenAPI + '/request-otp', { email });
    return data;
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }
};
