import mongoose from "mongoose";

let isConnected: boolean = false; // track the connection

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true); // to avoid deprecation warning

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  // if not connected, connect
  try {
    // uri is the connection string to MongoDB Atlas or local MongoDB
    // second argument is an object of options
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "Challenge", // name of the database,
    });
    isConnected = true; // set isConnected to true

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    console.error(`MongoDB connection error: ${error}`);
  }
};
