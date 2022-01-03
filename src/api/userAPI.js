import axios from 'axios';

const rootUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.ROOT_URL
    : 'http://localhost:8000/api/v1';
const userAPI = rootUrl + '/user';

export const createUser = async (newUser) => {
  try {
    const { data } = await axios.post(userAPI, newUser);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: error.message,
    };
  }
};

export const verifyNewUser = async (info) => {
  try {
    const { data } = await axios.patch(userAPI + '/email-verification', info);
    return data;
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }
};

export const getUser = async () => {
  try {
    const { data } = await axios.get(userAPI, {
      headers: {
        authorization: window.sessionStorage.getItem('accessJWT'),
      },
    });
    return data;
  } catch (error) {
    return error?.response?.data;
  }
};
export const updateUserProfile = async (userInfo) => {
  try {
    const { data } = await axios.patch(userAPI, userInfo, {
      headers: {
        authorization: window.sessionStorage.getItem('accessJWT'),
      },
    });
    return data;
  } catch (error) {
    return error?.response?.data;
  }
};
export const loginUser = async (info) => {
  try {
    const { data } = await axios.post(userAPI + '/login', info);
    return data;
  } catch (error) {
    return {
      status: 'error',
      message: 'Invalid login details!',
    };
  }
};
export const logoutUser = async (tokens) => {
  try {
    const { data } = await axios.post(userAPI + '/logout', tokens);
    return data;
  } catch (error) {
    return {
      status: 'error',
      message: 'Error, there is problem logging out. Please try again later!',
    };
  }
};
