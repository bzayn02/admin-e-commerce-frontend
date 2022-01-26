import {
  getProduct,
  addProduct,
  deleteAProduct,
} from '../../api/productAPI.js';
import { updateNewAccessJWT } from '../../api/tokenAPI.js';
import { userLogout } from '../admin-auth-slice/userAction.js';

import {
  responseFail,
  responsePending,
  getProductsSuccess,
  addProductSuccess,
  deleteProductSuccess,
} from './ProductSlice.js';

export const fetchProducts = () => async (dispatch) => {
  dispatch(responsePending());
  const data = await getProduct();

  // auto re-auth

  if (data.message === 'jwt expired') {
    //request for new accessJWT
    const token = await updateNewAccessJWT();
    if (token) {
      return dispatch(fetchProducts());
    } else {
      dispatch(userLogout());
    }
  }

  if (data.status === 'success') {
    data.products && dispatch(getProductsSuccess(data));
    return;
  }
  dispatch(responseFail(data));
};
export const addProductAction = (prodObj) => async (dispatch) => {
  dispatch(responsePending());
  const data = await addProduct(prodObj);
  // auto re-auth

  if (data.message === 'jwt expired') {
    //request for new accessJWT
    const token = await updateNewAccessJWT();
    if (token) {
      return dispatch(addProductAction());
    } else {
      dispatch(userLogout());
    }
  }

  if (data?.status === 'success') {
    dispatch(addProductSuccess(data));
    dispatch(fetchProducts());
    return;
  }
  dispatch(responseFail(data));
};

export const deleteProduct = (_id) => async (dispatch) => {
  dispatch(responsePending());

  const data = await deleteAProduct(_id);
  // auto re-auth

  if (data.message === 'jwt expired') {
    //request for new accessJWT
    const token = await updateNewAccessJWT();
    if (token) {
      return dispatch(deleteProduct());
    } else {
      dispatch(userLogout());
    }
  }

  if (data?.status === 'success') {
    dispatch(deleteProductSuccess(data));
    dispatch(fetchProducts());
    return;
  }
  dispatch(responseFail(data));
};
