"use server";
import { redirect } from "next/navigation";
import { deleteMeal, saveMeal } from "./meals";
import { Meal } from "@/app/Meal.types";
import { revalidatePath } from "next/cache";
function isInvalidText(text: string) {
  return !text || text.trim() === "";
}
// this indicates that all these functions will run only on the server
export async function shareMealHandler(
  prevState: {
    message: string;
  },
  formData: FormData
) {
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
    image: string | File | ArrayBuffer | null | any;
  }
  const meal: Meal = {
    title: formData.get("title") as string, // "title" => the name of the input field
    //             <input type="text" id="title" name="title" required />
    creator: formData.get("name") as string, // "name" => the name of the input field
    creator_email: formData.get("email") as string, // "email" => the name of the input field
    summary: formData.get("summary") as string, // "summary" => the name of the input field
    instructions: formData.get("instructions") as string, // "instructions" => the name of the input field
    // image: formData.get("image") as string | File, // "image" => the name of the input field
  };
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") // Use includes method only if creator_email is a string
) {
    // in server actions you can return a response
    // but the returned object should be realisable which mean not contain any funcs
    return {
      message: "Invalid input.",
    };
    // to access this object there is a hook => useFormState
    // throw new Error("Invalid input.");
  }
  //   console.log(meal);
  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
// delete a meal from the database
export async function deleteMealHandler(slug: string, formData: FormData) {
  await deleteMeal(slug);
  revalidatePath("/meals"); // help to revalidate the cache that belong to the page /meals
  // only this segment not children for example /meals ok and /meals/1 not
  // if you want all nested pages then use
  revalidatePath("/meals", "layout");
  //   revalidatePath("/", "layout"); revalidate all the pages
  redirect("/meals");
}
