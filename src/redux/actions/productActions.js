/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import * as types from "./actionTypes";
import * as productApi from "../../api/productApi";
import { get } from "fetch-mock";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

export function updateProductSuccess(product) {
  return { type: types.UPDATE_PRODUCT_SUCCESS, product };
}

export function createProductSuccess(product) {
  return { type: types.CREATE_PRODUCT_SUCCESS, product };
}

export function loadProducts() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return productApi
      .getProducts()
      .then((products) => {
        dispatch(loadProductsSuccess(products));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveProducts(product) {
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return productApi
      .saveProducts(product)
      .then((savedProduct) => {
        product.id
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
