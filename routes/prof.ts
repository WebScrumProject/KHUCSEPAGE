import express from "express";
import * as profController from "../controllers/prof.controller";

const router = express.Router();

router.get("/image/:id", profController.getImage);
router.post("/image", profController.postImage);
router.get("/api/info", profController.getProfCard);
router.get("/api/info/:id", profController.getProfDetail);
router.put("/api/info/:id", profController.putProfDetail);
router.delete("/api/info/:id", profController.deleteProf);
router.post("/write", profController.postProf);
