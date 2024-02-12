import React from "react";
import classes from "./loading.module.css";
export default function LoadingMeals() {
  return <p className={classes.loading}>Fetching meals...</p>;
}
