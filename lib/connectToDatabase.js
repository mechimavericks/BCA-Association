import mongoose from "mongoose";
export default async function connectToDB() {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  if (conn) {
    console.log("Database connected successfully");
    return true;
  } else {
    console.log("Error connecting to database");
    return false;
  }
}
