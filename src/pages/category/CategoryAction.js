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
  updateCategory,
} from '../../api/categoryAPI';

export const createCat = (newCat) => async (dispatch) => {
  dispatch(catRequestPending());
  const data = await createCategory(newCat);
  if (data?.status === 'success') {
    dispatch(fetchCat());
    return dispatch(catRespSuccess(data));
  }
  dispatch(catRequestFail(data));
};
export const fetchCat = () => async (dispatch) => {
  dispatch(catRequestPending());
  const { status, message, categories } = await fetchCategory();
  if (status === 'success') {
    return dispatch(fetchCatRespSuccess(categories));
  }
  dispatch(catRequestFail({ status, message }));
};

export const deleteCat = (_id) => async (dispatch) => {
  dispatch(catRequestPending());
  const data = await deleteCategory(_id);
  if (data?.status === 'success') {
    dispatch(fetchCat());
    return dispatch(catRespSuccess(data));
  }
  dispatch(catRequestFail(data));
};
export const updateCat = (catObj) => async (dispatch) => {
  dispatch(catRequestPending());
  const data = await updateCategory(catObj);
  if (data?.status === 'success') {
    dispatch(fetchCat());
    return dispatch(catRespSuccess(data));
  }
  dispatch(catRequestFail(data));
};
