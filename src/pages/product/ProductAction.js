import { getProduct, addProduct } from '../../api/productAPI.js';

import {
  responseFail,
  responsePending,
  getProductsSuccess,
  addProductSuccess,
} from './ProductSlice.js';

export const fetchProducts = () => async (dispatch) => {
  dispatch(responsePending());
  const data = await getProduct();

  if (data.status === 'success') {
    data.products && dispatch(getProductsSuccess(data));
    return;
  }
  dispatch(responseFail(data));
};
export const addProductAction = (prodObj) => async (dispatch) => {
  dispatch(responsePending());
  const data = await addProduct(prodObj);
  console.log(data);

  if (data.status === 'success') {
    dispatch(addProductSuccess(data));
    return;
  }
  dispatch(responseFail(data));
};
