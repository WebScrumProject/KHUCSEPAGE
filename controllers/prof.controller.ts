import { Request, Response } from "express";
import mongoose from "mongoose";
import { DBFile, File } from "../models/File";
import { DBProf, Prof } from "../models/Prof";
import ProfCardDTO from "../DTO/prof.dto";

interface ProfRequest extends Request {
  params: {
    id: string;
  };
}

export async function postImage(req: Request, res: Response) {
  try {
    const multerFile = req.file as Express.MulterS3.File;
    const imageUrl = multerFile.location;
    const imageName = multerFile.key;
    const newFile: DBFile = new File({
      fileUrl: imageUrl,
      fileName: imageName,
    });
    await newFile.save();
    console.log(imageUrl);
    res.send(imageUrl);
  } catch (err) {
    res.status(500).send("Error posting profImage");
  }
}

export async function getProfCard(req: Request, res: Response) {
  const page: number = parseInt(req.query.page as string, 10) || 1;
  const pageSize: number = parseInt(req.query.pageSize as string, 10) || 4;

  try {
    const skipCount = (page - 1) * pageSize;

    const allData: DBProf[] = await Prof.find({})
      .skip(skipCount)
      .limit(pageSize);
    const cardData: ProfCardDTO[] = allData.map((data) => ({
      profId: data._id.toString(),
      profName: data.profName,
      profMajor: data.profMajor,
      profEmail: data.profEmail,
      recNumber: data.recNumber,
      recDate: data.recDate,
      profImage: data.profImage,
    }));
    res.send(cardData);
  } catch (err) {
    console.error("Error getting carddata: ", err);
    res.status(500).send("Server Error getting prof card data");
  }
}

export async function getProfDetail(req: ProfRequest, res: Response) {
  const profId: string = req.params.id;
  const objectId = new mongoose.Types.ObjectId(profId);
  try {
    const foundProf = await Prof.findById(objectId);
    res.send(foundProf);
  } catch (err) {
    res.status(500).send("Error getting Prof Detail");
  }
}

export async function putProfDetail(req: ProfRequest, res: Response) {
  const profId: string = req.params.id;
  const objectId = new mongoose.Types.ObjectId(profId);
  const {
    profName,
    profMajor,
    profPhone,
    profEmail,
    profLab,
    profLink,
    recNumber,
    recDate,
    profHistory,
    labHistory,
  } = req.body;
  try {
    const existingProf = await Prof.findById(objectId);
    existingProf.profName = profName || existingProf.profName;
    existingProf.profMajor = profMajor || existingProf.profMajor;
    existingProf.profPhone = profPhone || existingProf.profPhone;
    existingProf.profEmail = profEmail || existingProf.profEmail;
    existingProf.profLab = profLab || existingProf.profLab;
    existingProf.profLink = profLink || existingProf.profLink;
    existingProf.recNumber = recNumber || existingProf.recNumber;
    existingProf.recDate = recDate || existingProf.recDate;
    existingProf.profHistory = profHistory || existingProf.profHistory;
    existingProf.labHistory = labHistory || existingProf.labHistory;

    const updatedProf = await existingProf.save();
    res.status(200).json(updatedProf);
  } catch (err) {
    res.status(500).send("Error updating Prof");
  }
}

export async function deleteProf(req: Request, res: Response) {
  const profId: string = req.params.id;
  const objectId = new mongoose.Types.ObjectId(profId);
  try {
    await Prof.findByIdAndDelete(objectId);
    res.send(`${objectId} deleted successfully`);
  } catch (err) {
    res.status(500).send("Error deleting Prof");
  }
}

export async function postProf(req: Request, res: Response) {
  try {
    const {
      profName,
      profMajor,
      profPhone,
      profEmail,
      profLab,
      profLink,
      recNumber,
      recDate,
      profHistory,
      labHistory,
      profImage,
    } = req.body;

    const newProf: DBProf = new Prof({
      profName,
      profMajor,
      profPhone,
      profEmail,
      profLab,
      profLink,
      recNumber,
      recDate,
      profHistory,
      labHistory,
      profImage,
    });
    const savedProf = await newProf.save();
    res.status(200).json({ ObjectId: savedProf._id });
    console.log(savedProf)
  } catch (err) {
    res.status(500).send("Error posting Prof");
  }
}
