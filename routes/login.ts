import express from "express";
import * as authController from "../controllers/auth.controller";
import verifyRefreshToken from "../middlewares/verify";

//url앞에 login있음

const router = express.Router();

router.get("/login/google", authController.googleLogin);

router.get("/login/redirect", authController.googleOauthHandler);

router.post("/login/api/auth/google", authController.authCodeHandler);

router.post(
  "/token",
  [verifyRefreshToken],
  authController.getTokenWithRefreshToken
);

router.post("/logout", [verifyRefreshToken], authController.logout);

export default router;
