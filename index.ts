import express from "express";
import session from "express-session";
import passport from "passport";
import path from "path";

import { connectToRedis, connectToDatabase } from "./libs/database";

require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
