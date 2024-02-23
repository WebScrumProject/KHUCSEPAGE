import { StringArray } from 'aws-sdk/clients/rdsdataservice';
import express, {Request, Response} from 'express'
const router = express.Router()
const upload = require('../middlewares/multer')
const {writeProject} = require('../DTO/projectDTO')

interface CustomRequest extends Request {
    files? : any
}

router.post('/write',async(req:CustomRequest, res:Response)=>{
    writeProject(req.body[0])
})
  
router.post('/write/images',upload.array('image'),async(req:CustomRequest, res:Response)=>{
  const images:StringArray = []
  req.files.forEach((file:any, index:number) => {
    images.push(file.location)
  });
  res.status(200).json({ image: images});
})

router.post('/write/videos',upload.array('video'),async(req:CustomRequest, res:Response)=>{
  const videos:StringArray = []
  req.files.forEach((file:any, index:number) => {
    videos.push(file.location)
  });
  res.status(200).json({ video: videos});
}) 

router.post('/write/files',upload.array('file'),async(req:CustomRequest, res:Response)=>{
  const files:StringArray = []
  req.files.forEach((file:any, index:number) => {
    files.push(file.location)
  });
  res.status(200).json({ file: files});
}) 
export default router