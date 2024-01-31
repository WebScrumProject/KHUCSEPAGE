import express from "express";
import session from "express-session";
import passport from "passport";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

import { connectToRedis, connectToDatabase } from "./libs/database";
import profRoutes from "./routes/prof";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../client/build")));

app.use("/undergraduate_student", profRoutes);

dotenv.config();
connectToDatabase();

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
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
