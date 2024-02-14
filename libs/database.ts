import mongoose from "mongoose";
import dotenv from "dotenv";
import Redis from "ioredis";

// const redisClient = new Redis(`redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
//  { legacyMode: true,}
// );

dotenv.config();

const redisClient = new Redis({
  port: parseInt(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

// async function connectToRedis() {
//   try {
//     await redisClient.connect();
//     console.info("✔️ Connection successful: Redis conncected!");
//   } catch (error) {
//     console.error("Error connecting to Redis Client:", error);
//   }
// }

async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("✔️ Connection successful: MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export { redisClient, connectToDatabase };
