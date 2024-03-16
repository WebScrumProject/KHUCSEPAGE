import { StringArray } from 'aws-sdk/clients/rdsdataservice';
import express, {Request, Response} from 'express'
const router = express.Router()
const upload = require('../middlewares/multer')
const {writeProject, editProject, getList, getDetail} = require('../DTO/projectDTO')

interface CustomRequest extends Request {
    files? : any
    user?:any
}

router.post('/write',async(req:CustomRequest, res:Response)=>{
  writeProject(req.body.p_list, req.user.userid, req.user.username )
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

router.get('/', async (req, res)=>{
  let page = String(req.query.page) || '1';
  try {
      const list = await getList(page);
      res.send(list);
  } catch (error) {
      console.error
  }
})

router.get('/detail/:id', async (req,res)=>{
  try {
      const detail = await getList(req.params.id);
      res.send(detail)
  } catch (error) {
      console.error
  }
})

router.post('/edit',async(req:CustomRequest, res:Response)=>{
  editProject(req.body.p_list[0], req.user.userid, req.user.username )
})

export default router