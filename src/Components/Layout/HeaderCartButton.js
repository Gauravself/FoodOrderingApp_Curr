import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnHighlighted, setbtnHighlighted] = useState(false);
  const cartCTX = useContext(CartContext);
  const numOfCartItems = cartCTX.item.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  const { item } = cartCTX;

  const buttonClasses = `${classes.button} ${
    btnHighlighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (item.length === 0) return;
    setbtnHighlighted(true);

    const timer = setTimeout(() => {
      setbtnHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [item]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
