import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.URI || "");
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to DataBase Successfuly!");
    });
    connection.on("error", (err) => {
      console.log(err.message);
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
