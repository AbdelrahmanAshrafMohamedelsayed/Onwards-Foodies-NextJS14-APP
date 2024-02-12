"use server";
import { redirect } from "next/navigation";
import { deleteMeal, saveMeal } from "./meals";
import { Meal } from "@/app/Meal.types";
function isInvalidText(text: string) {
  return !text || text.trim() === "";
}
// this indicates that all these functions will run only on the server
export async function shareMealHandler(formData: FormData) {
  //   "use server";  this commented as it is not required we already have "use server" at the top
  // handle the form submission on the server
  // "use server" grantees that this code will run only on the server
  // server actions always should be async
  // what will in papper
  interface Meal {
    title: string;
    creator: string;
    creator_email: string;
    summary: string;
    instructions: string;
    image: string | File;
  }
  const meal: Meal = {
    title: formData.get("title") as string, // "title" => the name of the input field
    //             <input type="text" id="title" name="title" required />
    creator: formData.get("name") as string, // "name" => the name of the input field
    creator_email: formData.get("email") as string, // "email" => the name of the input field
    summary: formData.get("summary") as string, // "summary" => the name of the input field
    instructions: formData.get("instructions") as string, // "instructions" => the name of the input field
    image: formData.get("image") as string | File, // "image" => the name of the input field
  };
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") || // Use includes method only if creator_email is a string
    (meal.image instanceof File && meal.image.size === 0) // Check the size property of the image if it is a File
  ) {
    // return {
    //   message: "Invalid input.",
    // };
    throw new Error("Invalid input.");
  }
  //   console.log(meal);
  await saveMeal(meal);
  redirect("/meals");
}
// delete a meal from the database
export async function deleteMealHandler(slug: string, formData: FormData) {
  deleteMeal(slug);
  redirect("/meals");
}
