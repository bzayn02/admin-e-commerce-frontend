import axios from 'axios';

const rootUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.ROOT_URL
    : 'http://localhost:8000/api/v1';
const catAPI = rootUrl + '/category';

export const createCategory = async (newCat) => {
  try {
    const { data } = await axios.post(catAPI, newCat, {
      headers: {
        authorization: window.sessionStorage.getItem('accessJWT'),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
export const fetchCategory = async () => {
  try {
    const { data } = await axios.get(catAPI, {
      headers: {
        authorization: window.sessionStorage.getItem('accessJWT'),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};

export const deleteCategory = async (_id) => {
  try {
    const { data } = await axios.delete(`${catAPI}/${_id}`, {
      headers: {
        authorization: window.sessionStorage.getItem('accessJWT'),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};

export const updateCategory = async (catObj) => {
  try {
    const { data } = await axios.patch(catAPI, catObj, {
      headers: {
        authorization: window.sessionStorage.getItem('accessJWT'),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
