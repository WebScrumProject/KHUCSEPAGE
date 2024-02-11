import { StringArray } from 'aws-sdk/clients/rdsdataservice';
import express, {Request, Response} from 'express'
const router = express.Router()
const upload = require('../middlewares/multer')
const {writeProject} = require('../DTO/projectDTO')

interface CustomRequest extends Request {
    files? : any
}

router.post('/write',upload.array('image'),upload.array('video'),upload.array('file'),async(req:CustomRequest, res:Response)=>{
    const imageFiles = req.files.filter((file: { fieldname: String })=>file.fieldname === 'image')
    const videoFiles = req.files.filter((file: { fieldname: String })=>file.fieldname === 'video')
    const fileFiles = req.files.filter((file: { fieldname: String })=>file.fieldname === 'file')
    const images:StringArray = []
    const videos:StringArray = []
    const files:StringArray = []
    if (images.length!=0){
      imageFiles.forEach((file:any, index:number) => {
        images.push(file.location)
      });
    }
    if (videos.length!=0){
      videoFiles.forEach((file:any, index:number) => {
        videos.push(file.location)
      });
    }
    if (files.length!=0){
      fileFiles.forEach((file:any, index:number) => {
        files.push(file.location)
      });
    }
    writeProject(req.body, images, videos, files)
  })
  
export default router