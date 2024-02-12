import React from "react";

import classes from "../meal-item.module.css";
import { deleteMealHandler } from "@/lib/actions";
export default function MealDel({ slug }: { slug: string }) {
  const updateDeleteMealHandler = deleteMealHandler.bind(null, slug);
  return (
    <form action={updateDeleteMealHandler}>
      <button type="submit" className={classes.btn}>
        Delete Meal
      </button>
    </form>
  );
}
