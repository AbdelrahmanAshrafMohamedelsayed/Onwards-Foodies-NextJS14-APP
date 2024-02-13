import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";
import { deleteMealHandler } from "@/lib/actions";
import { Meal } from "@/app/Meal.types";
import MealDel from "./MealDelete/MealDel";
type MealItemProps = { meal: Meal };

export default function MealItem({ meal }: MealItemProps) {
  // fill in Image component to deal with dynamic images from the API which you don't know its dimensions
  // const updateDeleteMealHandler = deleteMealHandler.bind(null, slug);
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={meal?.image as string} alt={meal?.title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{meal?.title}</h2>
          <p>by {meal?.creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{meal?.summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${meal?.slug}`}>View Details</Link>
          <MealDel slug={meal?.slug} />
        </div>
      </div>
    </article>
  );
}
