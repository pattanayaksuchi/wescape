import axios from "axios";

import {
  GET_PRODUCTS,
  ADD_TO_CART,
  ADD_QUANTITY_TO_CART,
  SUBTRACT_QUANTITY_FROM_CART,
  REMOVE_ITEM,
  GET_ERRORS,
} from "./types";

export const getProducts = () => (dispatch) => {
  axios
    .get("api/products")
    .then((res) => dispatch({ type: GET_PRODUCTS, products: res.data.product }))
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const addToCart = (id) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    id,
  });
};

export const addQuantity = (id) => (dispatch) => {
  dispatch({ type: ADD_QUANTITY_TO_CART, id });
};

export const removeQuantity = (id) => (dispatch) => {
  dispatch({ type: SUBTRACT_QUANTITY_FROM_CART, id });
};

export const removeItem = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ITEM, id });
};
