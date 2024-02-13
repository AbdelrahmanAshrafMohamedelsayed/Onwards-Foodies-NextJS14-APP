import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import Meal from "@/models/meal";
import { connectToDB } from "@/utils/database";
// get all meals from the database
// run use for insert data
// all for select all rows
// get for select one row
export async function getMeals() {
  try {
    await connectToDB();
    const meals = await Meal.find({});
    // const meals = await Meal.find(); // Mongoose
    // console.log(meals);
    return meals;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMeal(slug: string) {
  {
    try {
      await connectToDB();
      const meal = await Meal.findOne({ slug: slug });
      return meal;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
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
  try {
    await connectToDB();
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
    const newMeal = new Meal({
      title: meal.title,
      summary: meal.summary,
      instructions: meal.instructions,
      creator: meal.creator,
      creator_email: meal.creator_email,
      image: meal.image,
      slug: meal.slug,
    });
    await newMeal.save();
    return newMeal;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// delete meal from the database
export function deleteMeal(slug: string) {
  try {
    connectToDB();
    Meal.deleteOne({ slug: slug });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
