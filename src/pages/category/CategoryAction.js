import {
  catRequestPending,
  catRespSuccess,
  fetchCatRespSuccess,
  catRequestFail,
} from './CategorySlice';
import {
  createCategory,
  fetchCategory,
  deleteCategory,
} from '../../api/categoryAPI';

export const createCat = (newCat) => async (dispatch) => {
  dispatch(catRequestPending());

  // call the api
  const data = await createCategory(newCat);
  if (data?.status === 'success') {
    dispatch(fetchCat());
    return dispatch(catRespSuccess(data));
  }
  dispatch(catRequestFail(data));

  // dispatch success or fail
};
export const fetchCat = () => async (dispatch) => {
  dispatch(catRequestPending());

  // call the api
  const { status, message, categories } = await fetchCategory();
  if (status === 'success') {
    return dispatch(fetchCatRespSuccess(categories));
  }
  dispatch(catRequestFail({ status, message }));

  // dispatch success or fail
};
export const deleteCat = (_id) => async (dispatch) => {
  dispatch(catRequestPending());

  // call the api
  const data = await deleteCategory(_id);
  if (data?.status === 'success') {
    dispatch(fetchCat());
    return dispatch(catRespSuccess(data));
  }
  dispatch(catRequestFail(data));

  // dispatch success or fail
};
