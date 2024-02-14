import express from "express";
import * as authController from "../controllers/auth.controller";
import verifyRefreshToken from "../middlewares/refresh";

//url앞에 login있음

const router = express.Router();

router.get("/login/google", authController.googleLogin);

// router.get("/oauth2/redirect/google", authController.googleOauthHandler);

router.get("/login/redirect", authController.googleOauthHandler);

router.post(
  "/token",
  [verifyRefreshToken],
  authController.getTokenWithRefreshToken
);

router.post("/logout", [verifyRefreshToken], authController.logout);

export default router;
