import React from "react";
import classes from "./AvailableMeals.module.css";
import DUMMY_MEALS from "./dummyMealsData";
import Card from "../UI/Card";
import MealItem from "./MealItems/MealItem";

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meal}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
