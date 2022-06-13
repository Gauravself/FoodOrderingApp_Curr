import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitFormHandler = (e) => {
    e.preventDefault();
    const inputAmount = amountInputRef.current.value;
    const inputAmountNum = +inputAmount;
    if (
      inputAmount.trim().length === 0 ||
      inputAmountNum < 1 ||
      inputAmountNum > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.addToCart(amountIsValid);
  };
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>
  );
};

export default MealItemForm;
