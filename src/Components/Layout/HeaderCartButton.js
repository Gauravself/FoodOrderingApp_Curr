import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCTX = useContext(CartContext);
  const numOfCartItems = cartCTX.item.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  return (
    <React.Fragment>
      <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numOfCartItems}</span>
      </button>
    </React.Fragment>
  );
};

export default HeaderCartButton;
