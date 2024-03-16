import express from "express";
import * as mypageController from "../controllers/mypage.controller";
import isLoggedIn from "../middlewares/auth";

const router = express.Router();

// router.get("/mypage/api/info", [isLoggedIn], mypageController.welcome);

router.get("/profile/api/info", [isLoggedIn], mypageController.getUserDetail);

router.put("/profile/api/edit", [isLoggedIn], mypageController.putUserDetail);

// router.get('/profile/api/myproject', [isLoggedIn], mypageController.)

router.delete(
  "/profile/api/withdrawal",
  [isLoggedIn],
  mypageController.putUserDetail
);

export default router;
