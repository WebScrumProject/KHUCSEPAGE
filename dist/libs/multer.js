"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
const path_1 = __importDefault(require("path"));
const notAllowedExtensions = [
    ".exe",
    ".js",
    ".vbs",
    ".bat",
    ".cmd",
    ".dll",
    ".jar",
    ".app",
    ".sh",
    ".html",
    ".htm",
    ".php",
    ".zip",
    ".rar",
];
const s3Client = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY ?? "",
        secretAccessKey: process.env.S3_SECRET_KEY ?? "",
    },
    region: "ap-northeast-2",
});
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3Client,
        bucket: process.env.BUCKET_NAME ?? "",
        key: (req, file, cb) => {
            const extension = path_1.default.extname(file.originalname);
            if (notAllowedExtensions.includes(extension)) {
                return cb(new Error("wrong extension"));
            }
            cb(null, `${Date.now().toString()}-${file.originalname}`);
        },
        acl: "public-read-write",
    }),
});
module.exports = upload;
