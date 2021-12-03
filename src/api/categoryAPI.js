import axios from 'axios';

const rootUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.ROOT_URL
    : 'http://localhost:8000/api/v1';
const catAPI = rootUrl + '/category';

export const createCategory = async (newCat) => {
  try {
    const { data } = await axios.post(catAPI, newCat);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: error.message,
    };
  }
};
export const fetchCategory = async () => {
  try {
    const { data } = await axios.get(catAPI);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: error.message,
    };
  }
};

export const deleteCategory = async (_id) => {
  try {
    const { data } = await axios.delete(`${catAPI}/${_id}`);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: error.message,
    };
  }
};

export const updateCategory = async (catObj) => {
  try {
    const { data } = await axios.patch(catAPI, catObj);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: error.message,
    };
  }
};
