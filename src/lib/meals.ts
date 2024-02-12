import { Meal } from "@/app/Meal.types";
import sql from "better-sqlite3";
const db = sql("meals.db"); // meals.db is a SQLite database file

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

export function getMeal(slug: string): Meal {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as Meal;
  // here ? is replaced by the get(?)
}

// export async function saveMeal(meal) {
//   meal.slug = slugify(meal.title, { lower: true });
//   meal.instructions = xss(meal.instructions);

//   const extension = meal.image.name.split(".").pop();
//   const fileName = `${meal.slug}.${extension}`;

//   const bufferedImage = await meal.image.arrayBuffer();

//   s3.putObject({
//     Bucket: "maxschwarzmueller-nextjs-demo-users-image",
//     Key: fileName,
//     Body: Buffer.from(bufferedImage),
//     ContentType: meal.image.type,
//   });

//   meal.image = fileName;

//   db.prepare(
//     `
//     INSERT INTO meals
//       (title, summary, instructions, creator, creator_email, image, slug)
//     VALUES (
//       @title,
//       @summary,
//       @instructions,
//       @creator,
//       @creator_email,
//       @image,
//       @slug
//     )
//   `
//   ).run(meal);
// }
