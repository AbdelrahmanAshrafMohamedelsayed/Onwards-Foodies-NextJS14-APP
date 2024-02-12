import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";
import { deleteMealHandler } from "@/lib/actions";
import { Meal } from "@/app/Meal.types";
import MealDel from "./MealDelete/MealDel";
type MealItemProps = Meal;

export default function MealItem({
  title,
  slug,
  image,
  summary,
  creator,
}: MealItemProps) {
  // fill in Image component to deal with dynamic images from the API which you don't know its dimensions
  // const updateDeleteMealHandler = deleteMealHandler.bind(null, slug);
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image as string} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
          <MealDel slug={slug} />
        </div>
      </div>
    </article>
  );
}
