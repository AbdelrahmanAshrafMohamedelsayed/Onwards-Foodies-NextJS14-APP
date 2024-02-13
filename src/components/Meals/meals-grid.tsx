import React from "react";
import classes from "./meals-grid.module.css";
import MealItem from "./meal-item";
import { Meal } from "@/app/Meal.types";
type MealsGridProps = {
  meals: Meal[];
};
export default function MealsGrid({ meals }: MealsGridProps) {
  // console.log(meals[0]._id);
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.slug}>
          <MealItem meal={meal} />
        </li>
      ))}
    </ul>
  );
}
