import mongoose from 'mongoose'
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

export async function editProject(newProject:np, projectId:mongoose.Types.ObjectId){
  projectModel.find({_id:projectId})
  .then(res=>{
    if(!res){
      throw new Error('프로젝트를 찾을 수 없습니다.');
    }
    res.title= newProject.title;
    res.content.image=newProject.content.image;
    res.content.video= newProject.content.video;
    res.content.text= newProject.content.text;
    res.content.file= newProject.content.file;
    res.recruit= newProject.recruit;
    res.deadline = newProject.deadline;
    return res.save();
  })
  .then(() => {
    console.log('프로젝트가 성공적으로 수정되었습니다.');
  })
  .catch(error => {
    console.error('프로젝트 수정 중 오류 발생:', error);
  });
}

export async function getList(page: string) {
  let itemsPerPage = 10;
  let page_int = parseInt(page, 10);
  let skip = (page_int - 1) * itemsPerPage;
  try {
      const result = await projectModel
          .find({})
          .sort({ _id: -1 })
          .skip(skip)
          .limit(itemsPerPage)
          .exec();
      return result;
  } catch (err) {
      console.error(err);
      throw new Error('프로젝트 목록 데이터 가져오기에 실패했습니다.');
  }
}

export async function getDetail(id:number) {
  var skip_number:number, limit_number:number
  if(id==0){
      skip_number = id
      limit_number = 2
  }
  else if (id==499){
      skip_number =  id-1
      limit_number = 2
  }
  else{
      skip_number = id-1
      limit_number = 3
  }
  try {
      const result = await projectModel
          .find({})
          .sort({_id:-1})
          .skip(skip_number)
          .limit(limit_number)
          .exec()
      return result;
  } catch (err) {
      console.error(err);
      throw new Error('프로젝트 상세 데이터 가져오기에 실패했습니다.');
  }
}
