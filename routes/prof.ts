import express from "express";
import * as profController from "../controllers/prof.controller";
import upload from "../libs/multer";

const router = express.Router();

router.post("/image", upload.single("img"), profController.postImage);
router.get("/api/info", profController.getProfCard);
router.get("/api/info/:id", profController.getProfDetail);
router.put("/api/info/:id", profController.putProfDetail);
router.delete("/api/info/:id", profController.deleteProf);
router.post("/write", profController.postProf);

export default router;
