/* eslint-disable no-debugger */
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function productReducer(state = initialState.products, action) {
  switch (action.type) {
    case types.CREATE_PRODUCT_SUCCESS:
      return [...state, { ...action.product }];
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;
    case types.UPDATE_PRODUCT_SUCCESS:
      return state.map((product) =>
        product.id === action.product.id ? action.product : product
      );
    default:
      return state;
  }
}
