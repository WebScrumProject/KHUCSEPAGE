import express from "express";
import session from "express-session";
import passport from "passport";

import { connectToRedis, connectToDatabase } from "./libs/database";

require("dotenv").config();

const app = express();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
