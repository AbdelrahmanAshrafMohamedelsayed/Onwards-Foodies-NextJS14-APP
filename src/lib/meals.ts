import { Meal } from "@/app/Meal.types";
import sql from "better-sqlite3";
const db = sql("meals.db"); // meals.db is a SQLite database file
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
// get all meals from the database
// run use for insert data
// all for select all rows
// get for select one row
export async function getMeals(): Promise<Meal[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate slow network to show loading state
  //   here no necessary to use async await

  //   throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all() as Meal[];
}

export async function getMeal(slug: string): Promise<Meal> {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate slow network to show loading state
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as Meal;
  // here ? is replaced by the get(?)
}
interface Meal2 {
  title: null | FormDataEntryValue | string;
  summary: null | FormDataEntryValue | string;
  instructions: null | FormDataEntryValue | string;
  creator: null | FormDataEntryValue | string;
  creator_email: null | FormDataEntryValue | string;
  image: null | FormDataEntryValue | File | string | ArrayBuffer | null | any;
  slug?: null | FormDataEntryValue | string;
}
export async function saveMeal(meal: Meal2) {
  // add slug to the meal
  // clean the instructions from any malicious code
  meal.slug = slugify(meal.title as string, { lower: true });
  meal.instructions = xss(meal.instructions as string);

  const extension = meal.image.name.split(".").pop(); // get the extension of the file
  const randomString = Math.random().toString(36).substring(2, 15); // create a random string
  const fileName = `${meal.slug}-${randomString}.${extension}`; // create a new file name
  // then we will save the file with the new name in the public folder

  // start of the image upload
  const stream = fs.createWriteStream(`public/images/${fileName}`); // stream is a writeable stream
  const bufferedImage = await meal.image.arrayBuffer(); // convert the image to a buffer it is nessary to write the image to the stream
  stream.write(Buffer.from(bufferedImage), (error) => {
    // this is a callback function that will be called when the image is written to the stream
    if (error) {
      console.log(error);
      throw new Error("Image upload failed");
    } else {
      console.log("Image uploaded successfully");
    }
  }); // Buffer.from will convert the arrayBuffer to a buffer that can be written to the stream
  // end of the image upload

  meal.image = `/images/${fileName}`; // set the image to the new file name we removed the public segment
  // assumed that / => public
  // this is a necessary step to save the image name in the database as we will access the image by the name

  // insert the meal to the database
  // not insert id it will be populated automatically
  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
  // there is some rules in this query
  // 1- the values should be in the same order as the columns in the table
  // 2- the values should be in the same names not (order) as the parameters in the run function (meal)
  // 3- the parameters (meal) should be named as the columns in the table
}
// delete meal from the database
export function deleteMeal(slug: string) {
  db.prepare("DELETE FROM meals WHERE slug = ?").run(slug);
}
