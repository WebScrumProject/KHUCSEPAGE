import express from "express";
import * as mypageController from "../controllers/mypage.controller";
import isLoggedIn from "../middlewares/auth";

const router = express.Router();

router.get("/mypage/api/info", [isLoggedIn], mypageController.welcome);

export default router;
