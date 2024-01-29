import mongoose from "mongoose";
import redis from "redis";

const client = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true,
});

async function connectToRedis() {
  try {
    await client.connect();
    console.info("✔️ Connection successful: Redis conncected!");
  } catch (error) {
    console.error("Error connecting to Redis Client:", error);
  }
}

async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("✔️ Connection successful: MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export { client, connectToRedis, connectToDatabase };
