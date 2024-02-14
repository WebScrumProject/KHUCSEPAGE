import express from "express";

import { redisClient } from "../libs/database";

//url앞에 login있음

const router = express.Router();

router.get("/login/google");

router.get("/oauth2/redirect/google");

router.post("/token", [verifyRefreshToken]);

router.post("/logout", [verifyRefreshToken]);

module.exports = router;
