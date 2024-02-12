import express, {Request, Response} from 'express'
import path from 'path';
const {exec} = require('child_process')
const pythonPath = path.resolve(__dirname,'../pythonScript/autoscrap.py')
const router = express.Router()
const {getList, getDetail} = require('../DTO/scholarshipoDTO')

router.get('/', async (req, res)=>{
    /* const pythonScript = exec(`python3 ${pythonPath}`)
    pythonScript.stderr.on('data', (data:any) => {
        console.error(`stderr: ${data}`);
    }); */
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

export default router