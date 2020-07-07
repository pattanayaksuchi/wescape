import { createStore } from "redux";
import CartReducer from "../reducers/CartReducer";

export const appStore = createStore(CartReducer);
