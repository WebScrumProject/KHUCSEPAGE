import mongoose from 'mongoose'
const projectModel = require('../models/projectSchema.tsx');
const {alertUsers} = require('../middlewares/alertUsers')
const client = require ('../models/connectRedis')

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
  apply : Array<applier>
}

interface applier {
  id: string;
  date: string;
  field: string;
  fieldDetail: string;
  memo: string;
}

interface project{
  link: string,
  name: string,
  reason: string
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

export async function editProject(newProject:np, projectId:string){
  const objectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(projectId)
  let applier:Array<applier>;
  let project:project
  const oldProject = await projectModel.findOne({_id:objectId})
  oldProject.title= newProject.title;
  oldProject.content.image=newProject.content.image;
  oldProject.content.video= newProject.content.video;
  oldProject.content.text= newProject.content.text;
  oldProject.content.file= newProject.content.file;
  oldProject.recruit= newProject.recruit;
  oldProject.deadline = newProject.deadline;
  applier=oldProject.apply
  project={name: oldProject.title, link:`localhost8080/project/detail/${oldProject._id}`, reason: ''}
  await oldProject.save()
  try{
    console.log('프로젝트가 성공적으로 수정되었습니다.');
    for(let i=0; i<applier.length; i++){
      let useremail='', username='';
      client.hget(applier[i].id, 'useremail', (err: any, email: any)=>{
        useremail=email;
        client.hget(applier[i].id, 'username', (err: any, name: any)=>{
          username=name;
          alertUsers(useremail, 'edit', username, project)
        })
      })
    }
  }
  catch(error)  {
    console.error('프로젝트 수정 중 오류 발생:', error);
  };
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

export async function getDetail(projectId:string) {
  const objectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(projectId)
  try {
      const result = await projectModel
          .find({_id:objectId})
          .exec();
      return result;
  } catch (err) {
      console.error(err);
      throw new Error('프로젝트 목록 데이터 가져오기에 실패했습니다.');
  }
}

export async function endProject(projectId: string){
  let applier:Array<applier>;
  let project:project
  const objectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(projectId)
  const oldProject=await projectModel.findOne({_id:objectId})
  oldProject.is_done=true
  applier=oldProject.apply
  project={name: oldProject.title, link:`localhost8080/project/detail/${oldProject._id}`, reason: ''}
  await oldProject.save()
  try{
    console.log('프로젝트가 성공적으로 마감되었습니다.');
    for(let i=0; i<applier.length; i++){
      let useremail='', username='';
      client.hget(applier[i].id, 'useremail', (err: any, email: any)=>{
        useremail=email;
        client.hget(applier[i].id, 'username', (err: any, name: any)=>{
          username=name;
          alertUsers(useremail, applier[i].memo, username, project)
        })
      })
    }
  }
  catch(error)  {
    console.error('프로젝트 마감 중 오류 발생:', error);
  };
}
export async function applyProject(projectId: string, newApply:applier){
  const objectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(projectId)
  projectModel.findOne({_id:objectId})
  .then((res:any)=>{
    if(!res){
      throw new Error('프로젝트를 찾을 수 없습니다.');
    }
    let cnt =0;
    for (let i=0; i<res.apply.length; i++){
      if(res.apply[i].field==newApply.field){
        cnt+=1;
      }
    }
    if(cnt<=res.recruit.apply_cnt){
      res.apply.push(newApply)
      console.log('성공적으로 지원되었습니다.')
      return res.save()
    }
    else{
      return false
    }
  })
  .catch((error: any) => {
    console.error('지원 중 오류 발생:', error);
  });
}

export async function deleteProject(projectId: string, reason: string){
  let applier:Array<applier>;
  let project:project
  const objectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(projectId)
  projectModel.findOne({_id:objectId})
  .then((res:any)=>{
    if(!res){
      throw new Error('프로젝트를 찾을 수 없습니다.');
    }
    applier=res.apply
    project={name: res.title, link:`localhost8080/project/detail/${res._id}`, reason: reason}
  })
  .then(() => {
    for(let i=0; i<applier.length; i++){
      let useremail='', username='';
      client.hget(applier[i].id, 'useremail', (err: any, email: any)=>{
        useremail=email;
        client.hget(applier[i].id, 'username', (err: any, name: any)=>{
          username=name;
          alertUsers(useremail,'deletion', username, project)
        })
      })
    }
  })
  .catch((error: any) => {
    console.error('프로젝트 마감 중 오류 발생:', error);
  });
  const result = await projectModel.deleteOne({ _id: objectId });
  console.log('프로젝트가 성공적으로 삭제되었습니다')
}
