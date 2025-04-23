import mongoose from "mongoose";

export const connectMongoDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongoose Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log("Error connecting to the database:", error.message);
    process.exit(1);
  }
};
