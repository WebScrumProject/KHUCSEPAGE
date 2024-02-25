import express from "express";
import expressSession from "express-session";
import passport from "passport";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import connectRedis from "connect-redis";

import {
  // connectToRedis,
  connectToDatabase,
  redisClient,
} from "./libs/database";
import authRoutes from "./routes/login";
import profRoutes from "./routes/prof";
import mypageRoutes from "./routes/mypage";

const RedisStore = require("connect-redis").default;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../client/build")));

app.use(authRoutes);
app.use(mypageRoutes);
app.use("/undergraduate_student", profRoutes);

dotenv.config();
connectToDatabase();
// connectToRedis();

app.use(
  expressSession({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.MAIN_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
