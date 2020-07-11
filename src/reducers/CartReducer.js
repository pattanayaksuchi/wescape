import {
  GET_PRODUCTS,
  ADD_TO_CART,
  ADD_QUANTITY_TO_CART,
  SUBTRACT_QUANTITY_FROM_CART,
  REMOVE_ITEM,
} from "../actions/types";

const initialState = {
  products: [],
  addedItems: [],
  total: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case ADD_TO_CART:
      debugger;
      let addedItem = state.products.find(
        (product) => product._id === action.id
      );
      let existedItem = state.addedItems.find(
        (product) => action.id === product._id
      );
      if (existedItem) {
        console.log("Adding quantity by 1");
        existedItem.quantity += 1;
        return {
          ...state,
          total: state.total + addedItem.price,
        };
      } else {
        addedItem.quantity = 1;
        let newTotal = state.total + addedItem.price;
        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: newTotal,
        };
      }
    case REMOVE_ITEM:
      let itemToBeRemoved = state.addedItems.find(
        (item) => action.id === item._id
      );
      let itemsLeft = state.addedItems.filter((item) => action.id !== item._id);

      let newTotal =
        state.total - itemToBeRemoved.price * itemToBeRemoved.quantity;
      console.log(itemToBeRemoved);
      return {
        ...state,
        addedItems: itemsLeft,
        total: newTotal,
      };
    case ADD_QUANTITY_TO_CART:
      let addedQuantityItem = state.addedItems.find(
        (product) => product._id === action.id
      );
      console.log(addedQuantityItem);
      addedQuantityItem.quantity += 1;
      console.log(addedQuantityItem);

      let finalTotal = state.total + addedQuantityItem.price;
      return {
        ...state,

        total: finalTotal,
      };
    case SUBTRACT_QUANTITY_FROM_CART:
      let removeQuantityItem = state.addedItems.find(
        (product) => product._id === action.id
      );
      if (removeQuantityItem.quantity === 1) {
        let itemsLeft = state.addedItems.filter(
          (item) => item._id !== action.id
        );
        let newTotal = state.total - removeQuantityItem.price;
        return {
          ...state,
          addedItems: itemsLeft,
          total: newTotal,
        };
      } else {
        removeQuantityItem.quantity -= 1;
        let finTot = state.total - removeQuantityItem.price;
        return {
          ...state,
          total: finTot,
        };
      }
    default:
      return state;
  }
}
