import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import cartReducer from "./CartReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  cart: cartReducer,
});
