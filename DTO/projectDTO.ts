import { StringArray } from 'aws-sdk/clients/rdsdataservice';
const projectModel = require('../models/projectSchema.tsx');

interface np {
  title: String,
  writer: String,
  id : String,
  date: String,
  content:{
    image:StringArray,
    video: StringArray,
    text: String,
    file: StringArray
  }
  recruit: Array<object>,
  deadline : String,
  is_done: boolean,
  apply : Array<object>
}

export async function writeProject(newProject:np){
    try{
        const project = await projectModel.create({
          title: newProject.title,
          writer: newProject.writer,
          writer_id : newProject.id,
          date: newProject.date,
          content: {
            image: [],
            video: [],
            text : newProject.content.text,
            file : []
          },
          recruit: [],
          deadline : newProject.deadline,
          is_done: false,
          apply : []
        })
        
      }
      catch(err){
        console.log(err)
      }
}
