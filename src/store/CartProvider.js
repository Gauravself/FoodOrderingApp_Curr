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
      //Update the Total Amount
      const updatedTotalAmount =
        prevState.totalAmount + action.item.price * action.item.amount;

      //Check if item already exists in cart using index
      const existingCartItemIndex = prevState.item.findIndex(
        (item) => item.id === action.item.id
      );
      //Find Item in state
      const existingCartItem = prevState.item[existingCartItemIndex];
      let updatedItems;
      //If items exists spread it and update amount simultaneously store it in new Items
      if (existingCartItem) {
        const updatedItemNew = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...prevState.item];
        //Add updated items at the index of existing item index
        updatedItems[existingCartItemIndex] = updatedItemNew;
      } else {
        updatedItems = prevState.item.concat(action.item);
      }

      return { item: updatedItems, totalAmount: updatedTotalAmount };
    case ACTIONS.REMOVE_ITEM:
      //Find Existing cart Item
      return { item: updatedItems, totalAmount: updatedTotalAmount };
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
