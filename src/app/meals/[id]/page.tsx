import { getMeal } from "@/lib/meals";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import classes from "./page.module.css";
type MealPageProps = {
  params: {
    id: string;
  };
};

const MealPage = ({ params }: MealPageProps) => {
  // dangerouslySetInnerHTML is used to render the html tags
  // <a> tag is used to send email to the creator
  // notFound() is used to redirect to 404 page
  const { id } = params;
  const meal = getMeal(id);
  /**
   * look at the code below this is helpful in this case
   * 1. the user looks for a meal that does not exist /meals/invalid-id
   * here in the code you will without the below code the page will have error due to the meal not found
   * meal.instructions = meal.instructions.replace(/\n/g, "<br />"); try to access undefined property of meal
   * and this happens because the meal is not found "const meal = getMeal(id)"
   * the solution is the below
   * redirect you to the nearst (not found page )
   */
  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />"); // replace new line with br tag
  // this is neccessary to render the html tags as it will ignore break lines and the text will be shown in one line
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={`${meal.image}`} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
};

export default MealPage;
