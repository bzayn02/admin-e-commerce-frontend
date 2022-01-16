import axios from 'axios';

const rootUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.ROOT_URL
    : 'http://localhost:8000/api/v1';
const prodAPI = rootUrl + '/products';

export const getProduct = async (slug) => {
  try {
    const urlEndPoint = slug ? `${prodAPI}/${slug}` : prodAPI;
    const { data } = await axios.get(urlEndPoint);
    return data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
export const addProduct = async (prodObj) => {
  try {
    const { data } = await axios.post(prodAPI, prodObj);
    return data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
