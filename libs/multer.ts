import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import path from "path";

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

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY ?? "",
    secretAccessKey: process.env.S3_SECRET_KEY ?? "",
  },
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.BUCKET_NAME ?? "",
    key: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      if (notAllowedExtensions.includes(extension)) {
        return cb(new Error("wrong extension"));
      }
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
    acl: "public-read-write",
  }),
});

module.exports = upload;
