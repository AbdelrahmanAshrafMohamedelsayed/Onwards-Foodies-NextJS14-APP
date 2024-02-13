// import { connectToDB } from "@/utils/database";
const mongoose = require("mongoose");
const fs = require("fs");
const Meal = require(`././../../src/`);
// console.log(process.env.PASSWORD);
// console.log(process.env);
// await connectToDB();

const meals = JSON.parse(fs.readFileSync(`${__dirname}/meals.json`, "utf-8"));
const importDataToDB = async () => {
  try {
    await Meal.create(meals);
    console.log("data loaded successfully");
  } catch (err) {
    console.log(err);
  }
  console.log("process.argv");
  process.exit();
};
importDataToDB();
