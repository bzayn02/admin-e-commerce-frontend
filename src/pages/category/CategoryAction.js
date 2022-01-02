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
import { updateNewAccessJWT } from '../../api/tokenAPI';
import { userLogout } from '../admin-auth-slice/userAction';

export const createCat = (newCat) => async (dispatch) => {
  dispatch(catRequestPending());
  const data = await createCategory(newCat);
  if (data?.message === 'jwt expired') {
    // request for new accessjWT

    const token = await updateNewAccessJWT();
    // then re-call the funciton to refetch teh data
    if (token) {
      return dispatch(createCat(newCat));
    } else {
      dispatch(userLogout());
    }
  }
  if (data?.status === 'success') {
    dispatch(fetchCat());
    return dispatch(catRespSuccess(data));
  }
  dispatch(catRequestFail(data));
};

export const fetchCat = () => async (dispatch) => {
  dispatch(catRequestPending());
  const { status, message, categories } = await fetchCategory();

  if (message === 'jwt expired') {
    // request for new accessjWT

    const token = await updateNewAccessJWT();
    // then re-call the funciton to refetch teh data
    if (token) {
      return dispatch(fetchCat());
    } else {
      dispatch(userLogout());
    }
  }
  if (status === 'success') {
    return dispatch(fetchCatRespSuccess(categories));
  }
  dispatch(catRequestFail({ status, message }));
};

export const deleteCat = (_id) => async (dispatch) => {
  dispatch(catRequestPending());
  const data = await deleteCategory(_id);
  if (data?.message === 'jwt expired') {
    // request for new accessjWT

    const token = await updateNewAccessJWT();
    // then re-call the funciton to refetch teh data
    if (token) {
      return dispatch(deleteCat(_id));
    } else {
      dispatch(userLogout());
    }
  }
  if (data?.status === 'success') {
    dispatch(fetchCat());
    return dispatch(catRespSuccess(data));
  }
  dispatch(catRequestFail(data));
};

export const updateCat = (catObj) => async (dispatch) => {
  dispatch(catRequestPending());
  const data = await updateCategory(catObj);

  if (data?.message === 'jwt expired') {
    // request for new accessjWT

    const token = await updateNewAccessJWT();
    // then re-call the funciton to refetch teh data
    if (token) {
      return dispatch(updateCat(catObj));
    } else {
      dispatch(userLogout());
    }
  }
  if (data?.status === 'success') {
    dispatch(fetchCat());
    return dispatch(catRespSuccess(data));
  }
  dispatch(catRequestFail(data));
};
