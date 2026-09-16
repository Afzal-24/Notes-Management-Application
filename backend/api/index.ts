import mongoose from "mongoose";
import app from "../src/app";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  await mongoose.connect(process.env.MONGO_URI as string);

  isConnected = true;

  console.log("MongoDB Connected");
};

export default async function handler(req: any, res: any) {
  try {
    await connectDB();

    return app(req, res);
  } catch (error) {
    console.error("Database connection error:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
}
