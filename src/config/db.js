import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/blog-app-new");
    console.log("DB Connectd Successfuly");
  } catch (error) {
    console.log(error);
  }
};
