import React, { useReducer } from "react";
import CartContext from "./cart-context";

//Actions Object
const ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
};
//Set Default Cart State
const defaultCartState = {
  item: [],
  totalAmount: 0,
};

//Reducer Function
const reducer = (prevState, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      const updatedItem = prevState.item.concat(action.item);
      const updatedTotalAmount =
        prevState.totalAmount + action.item.price * action.item.amount;
      return { item: updatedItem, totalAmount: updatedTotalAmount };
    default:
      return defaultCartState;
  }
};

//Cart Provider Function
const CartProvider = (props) => {
  //Using Reducer Hook
  const [newCartState, dispatch] = useReducer(reducer, defaultCartState);

  //Functions to update Cart - to be called from Form
  const addItemToCartHandler = (item) => {
    dispatch({ type: ACTIONS.ADD_ITEM, item: item });
  };

  const deleteItemFromCartHandler = (id) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, id: id });
  };

  //Setting Context Dynamically
  const cartContext = {
    item: newCartState.item,
    totalAmount: newCartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: deleteItemFromCartHandler,
  };
  return (
    //Using Provider Pass down value
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
