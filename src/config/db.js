import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mahmoudmansooour_db_user:Gx271Hbg85SADfJd@cluster0.ktkwn7s.mongodb.net/social-app?retryWrites=true&w=majority",
    );
    console.log("DB Connectd Successfuly");
  } catch (error) {
    console.log(error);
  }
};
