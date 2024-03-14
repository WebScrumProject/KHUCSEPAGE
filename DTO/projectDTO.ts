const projectModel = require('../models/projectSchema.tsx');

interface np {
  title: String,
  writer: String,
  id : String,
  date: String,
  content:{
    image:[String],
    video: [String],
    text: String,
    file: [String]
  }
  recruit: Array<object>,
  deadline : String,
  is_done: boolean,
  apply : Array<object>
}

export async function writeProject(newProject:np, userid:string, username:string){
  console.log(newProject.content.image, typeof newProject.content.image)
    try{
        const project = await projectModel.create({
          title: newProject.title,
          writer: username,
          id : userid,
          date: newProject.date,
          content: {
            image: newProject.content.image,
            video: newProject.content.video,
            text : newProject.content.text,
            file : newProject.content.file
          },
          recruit: newProject.recruit,
          deadline : newProject.deadline,
          is_done: false,
          apply : []
        })
        
      }
      catch(err){
        console.log(err)
      }
}
