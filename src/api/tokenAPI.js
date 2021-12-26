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
  }
};
