"use server";
import { redirect } from "next/navigation";
import { deleteMeal, saveMeal } from "./meals";

// this indicates that all these functions will run only on the server
export async function shareMealHandler(formData: FormData) {
  //   "use server";  this commented as it is not required we already have "use server" at the top
  // handle the form submission on the server
  // "use server" grantees that this code will run only on the server
  // server actions always should be async
  // what will in papper
  const meal = {
    title: formData.get("title"), // "title" => the name of the input field
    //             <input type="text" id="title" name="title" required />
    creator: formData.get("name"), // "name" => the name of the input field
    creator_email: formData.get("email"), // "email" => the name of the input field
    summary: formData.get("summary"), // "summary" => the name of the input field
    instructions: formData.get("instructions"), // "instructions" => the name of the input field
    image: formData.get("image"), // "image" => the name of the input field
  };
  //   console.log(meal);
  await saveMeal(meal);
  redirect("/meals");
}
// delete a meal from the database
export async function deleteMealHandler(slug: string, formData: FormData) {
  deleteMeal(slug);
  redirect("/meals");
}
