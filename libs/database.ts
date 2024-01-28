import mongoose from "mongoose";

async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("✔️ Connection successful: MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectToDatabase;
