require('dotenv').config()
import express from 'express';
import path from 'path'
const app = express()
const connectMongoDB = require('./models/connectMongoDB')
const connectRedis = require('./models/connectRedis')

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));

app.listen(process.env.MAIN_PORT, function(){
    // const pythonScript = exec(`python3 ${pythonPath}`)
    // pythonScript.stderr.on('data', (data:any) => {
    // console.error(`stderr: ${data}`);
    // });
    connectRedis
    connectMongoDB
    console.log('listening on 8080')
})

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
}); 
