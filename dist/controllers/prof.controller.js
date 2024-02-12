"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postProf = exports.deleteProf = exports.putProfDetail = exports.getProfDetail = exports.getProfCard = exports.postImage = exports.getImage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const File_1 = require("../models/File");
const Prof_1 = require("../models/Prof");
async function getImage(req, res) {
    const imageId = req.params.id;
    //이거 id->profId?
    const objectId = new mongoose_1.default.Types.ObjectId(imageId);
    try {
        const foundImage = await File_1.File.findOne({ fileUser: objectId });
        res.send(foundImage?.fileUrl);
    }
    catch (err) {
        res.status(500).send("Error getting Image Url");
    }
}
exports.getImage = getImage;
async function postImage(req, res) {
    try {
        const imageUser = req.body.profId;
        const multerFile = req.file;
        //as: 변수의 타입을 명시적으로 변환하는 문법
        const imageUrl = multerFile.location;
        const imageName = multerFile.key;
        const newFile = new File_1.File({
            fileUser: imageUser,
            fileUrl: imageUrl,
            fileName: imageName,
        });
        await newFile.save();
        res.status(200).send({
            success: true,
            imageUser: imageUser,
            imageName: imageName,
            imageUrl: imageUrl,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
        });
    }
}
exports.postImage = postImage;
async function getProfCard(req, res) {
    try {
        const allData = await Prof_1.Prof.find({});
        const cardData = allData.map((data) => ({
            profName: data.profName,
            profMajor: data.profMajor,
            profEmail: data.profEmail,
            recNumber: data.recNumber,
            recDate: data.recDate,
        }));
        res.send(cardData);
    }
    catch (err) {
        console.error("Error getting carddata: ", err);
        res.status(500).send("Server Error getting prof card data");
    }
}
exports.getProfCard = getProfCard;
async function getProfDetail(req, res) {
    const profId = req.params.id;
    const objectId = new mongoose_1.default.Types.ObjectId(profId);
    try {
        const foundProf = await Prof_1.Prof.findById(objectId);
        res.send(foundProf);
    }
    catch (err) {
        res.status(500).send("Error getting Prof Detail");
    }
}
exports.getProfDetail = getProfDetail;
async function putProfDetail(req, res) {
    const profId = req.params.id;
    const objectId = new mongoose_1.default.Types.ObjectId(profId);
    const { profName, profMajor, profPhone, profEmail, profLab, profLink, recNumber, recDate, profHistory, labHistory, } = req.body;
    try {
        const existingProf = await Prof_1.Prof.findById(objectId);
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
    }
    catch (err) {
        res.status(500).send("Error updating Prof");
    }
}
exports.putProfDetail = putProfDetail;
async function deleteProf(req, res) {
    const profId = req.params.id;
    const objectId = new mongoose_1.default.Types.ObjectId(profId);
    try {
        await Prof_1.Prof.findByIdAndDelete(objectId);
        await File_1.File.deleteMany({ fileUser: profId });
        res.send(`${objectId} deleted successfully`);
    }
    catch (err) {
        res.status(500).send("Error deleting Prof");
    }
}
exports.deleteProf = deleteProf;
async function postProf(req, res) {
    try {
        const { profName, profMajor, profPhone, profEmail, profLab, profLink, recNumber, recDate, profHistory, labHistory, } = req.body;
        const newProf = new Prof_1.Prof({
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
        });
        const savedProf = await newProf.save();
        res.status(200).json({ ObjectId: savedProf._id });
    }
    catch (err) {
        res.status(500).send("Error posting Prof");
    }
}
exports.postProf = postProf;
