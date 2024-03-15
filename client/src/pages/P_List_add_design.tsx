import React, { useEffect, useRef, Ref, useMemo, ChangeEvent, useInsertionEffect} from 'react';
import '../styles/App.css';
import J_List_styles from '../styles/J_List.module.css';
import JB_styles from '../styles/JB_detail.module.css';
import P_add_styles from '../styles/P_List_add.module.css'
import P_List_styles from '../styles/P_List.module.css'
import P_Calendar from '../components/calendar';

import Mynavbar from '../components/navbar';
import Mojib from '../components/mojib'

import { useState } from 'react';
import axios from 'axios';

import { RootState, p_addcontent ,p_addrecruit,p_addtitle,p_addimage, p_cate_change,p_addfile, p_addvideo,p_addDate, p_addUser,p_addDeadline } from "../components/store";
import { useDispatch, useSelector } from "react-redux";

import { FaRegCalendarAlt } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { RiVideoAddFill } from "react-icons/ri";
import { BsPaperclip } from "react-icons/bs";
import { VscDiffAdded } from "react-icons/vsc";
import moment from 'moment';

import produce from 'immer'


export default function P_List_add_design() {

    
    let p_list = useSelector((state: RootState) => state.p_list);
    let temp_image:string
    let temp_video:string
    let temp_file:string

    
    
    
    let dispatch = useDispatch();
    
    const [value, onChange] = useState(new Date());
    const currentDate = moment().format("YYYY/MM/DD");
    let [cate_val, cate_change] = useState("")
    let [user_name, userChange] = useState("")

    const handleChangeContent = (e:any) => {
        dispatch(p_addcontent(e.target.value));
    };

    const handleChangeTitle = (e:any) => {
        dispatch(p_addtitle(e.target.value));
    };

    let [mojib_cnt, setmojib_cnt] = useState(0);

    const [showImages, setShowImages] = useState<string[]>([]);
    const [imageList, setImageList]  = useState<File[]>([]);

    const [showVideos, setShowVideos] = useState<string[]>([]);
    const [videoList, setVideoList] = useState<File[]>([]);

    const [showFiles, setShowFiles] = useState<string[]>([]);
    const [fileList, setFileList] = useState<File[]>([]);

    const handleAddImages = (event: { target: { files: any; }; } | any ) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];
        let newImageList = [...imageList];
    
        for (let i = 0; i < imageLists.length; i++) {
            const file = imageLists[i];
      
            if (!file.type.startsWith('image/')) {
             
                alert('이미지 파일만 업로드 가능합니다.');
                continue; 
            }
            
            const currentImageUrl = URL.createObjectURL(file);
            imageUrlLists.push(currentImageUrl);
            newImageList.push(file);
        }
    
        if (imageUrlLists.length > 30) {
            imageUrlLists = imageUrlLists.slice(0, 30);
            newImageList = newImageList.slice(0, 30);
        }
    
        setShowImages(imageUrlLists);
        setImageList(newImageList);
    };

    const handleAddVideos = (event: { target: { files: any; }; } | any) => {
        const videoFiles = event.target.files;
        let videoUrlList = [...showVideos];
        let newVideoList = [...videoList];

        for (let i = 0; i < videoFiles.length; i++) {
            const file = videoFiles[i];
           
            if (!file.type.startsWith('video/')) {
                
                alert('동영상 파일만 업로드 가능합니다.');
                continue; 
            }

            const currentVideoUrl = URL.createObjectURL(file);
            videoUrlList.push(currentVideoUrl);
            newVideoList.push(file);
        }

        if (videoUrlList.length > 30) {
            videoUrlList = videoUrlList.slice(0, 30);
            newVideoList = newVideoList.slice(0, 30);
        }

        setShowVideos(videoUrlList);
        setVideoList(newVideoList);
    };

    const handleAddFiles = (event: { target: { files: any; }; } | any) => {
        const files = event.target.files;
        let fileUrlList = [...showFiles];
        let newFileList = [...fileList];
    
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const currentFileUrl = URL.createObjectURL(file);
            fileUrlList.push(currentFileUrl);
            newFileList.push(file);
        }
    
        if (fileUrlList.length > 30) {
            fileUrlList = fileUrlList.slice(0, 30);
            newFileList = newFileList.slice(0, 30);
        }
    
        setShowFiles(fileUrlList);
        setFileList(newFileList);
    };
    

  
    const handleDeleteImage = (id: number) => {
        setShowImages(showImages.filter((_, index) => index !== id));
    };

    const handleImageUpload = async () => {
        const formData = new FormData();
        for (let i = 0; i < imageList.length; i++) {
            formData.append("image", imageList[i]);
        }
    
        try {
            const response = await axios.post('/project/write/images', formData);
            console.log("handleImageupload", response.data);
            /* dispatch(p_addimage(response.data)); */
            temp_image = response.data.image;
            
            return true; // 성공적으로 업로드되었음을 신호로 전달
        } catch (error) {
            console.error(error);
            alert('server error');
            return false; // 업로드에 실패했음을 신호로 전달
        }
    };
    
    const handleVideoUpload = async () => {
        const formData = new FormData();
        for (let i = 0; i < videoList.length; i++) {
            formData.append("video", videoList[i]);
        }
    
        try {
            const response = await axios.post('/project/write/videos', formData);
            console.log(response.data);
           /* dispatch(p_addvideo(response.data)); */
           temp_video=response.data.video;
            return true; // 성공적으로 업로드되었음을 신호로 전달
        } catch (error) {
            console.error(error);
            alert('server error');
            return false; // 업로드에 실패했음을 신호로 전달
        }
    };
    
    const handleFileUpload = async () => {
        const formData = new FormData();
        for (let i = 0; i < fileList.length; i++) {
            formData.append("file", fileList[i]);
        }
    
        try {
            const response = await axios.post('/project/write/files', formData);
            console.log(response.data);
          /* dispatch(p_addfile(response.data)); */
          temp_file=response.data.file;
            return true; // 성공적으로 업로드되었음을 신호로 전달
        } catch (error) {
            console.error(error);
            alert('server error');
            return false; // 업로드에 실패했음을 신호로 전달
        }
    };
    
    // 모든 업로드가 완료되면 실행할 함수
    const handleAllUploadsComplete = async () => {
        try {
            const imageUploadResult = await handleImageUpload();
            const videoUploadResult = await handleVideoUpload();
            const fileUploadResult = await handleFileUpload();
         
    
            // 모든 파일 업로드가 성공적으로 완료됐을 때만 p_list를 찍음
            if (imageUploadResult && videoUploadResult && fileUploadResult) {
               
              
                const temp_p_list = produce(p_list, draftState => {
                    // 원하는 변경을 수행
                    console.log(temp_image)
                    draftState[0].content.file = temp_file as string;
                    draftState[0].content.image= temp_image as string;
                    draftState[0].content.video = temp_video as string;
                   
                });
               
               console.log(temp_p_list)
               axios.post('/project/write', { p_list: temp_p_list });

                
            }
        } catch (error) {
            console.error("Error during uploads:", error);
        }
    };
    
    

    useEffect(()=>{
        dispatch(p_addimage(showImages))
    },[showImages])

    useEffect(()=>{
        dispatch(p_addvideo(showVideos))
    },[showVideos])

    useEffect(()=>{
        dispatch(p_addfile(showFiles))
    },[showFiles])

    useEffect(()=>{
        dispatch(p_addDeadline(formatDate(value)))
    },[value])

    useEffect(()=>{
        dispatch(p_addDate(currentDate))
    })

    useEffect(()=>{
        axios.get('/authorization')
                .then(response => {
                  //console.log(response.data)
                  if(response.data.isLogined == 'Logined'){
                    userChange(response.data.name)

                  }
                  
                })
                .catch(error => {
                });
    })
    useEffect(()=>{
        dispatch(p_addUser(user_name))
    },[user_name])

    function formatDate(date: { getFullYear: () => any; getMonth: () => number; getDate: () => any; }) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`
      }
    

   

    return (
        <div>
            <Mynavbar></Mynavbar>

            <div className={P_add_styles.P_List_add_container}>
            
                <div className={J_List_styles.janghak_thick_line}></div>

                <div className={P_add_styles.P_List_title}>
                    <input 
                        className={P_add_styles.P_List_text1}
                        name="title" 
                        value={p_list[0].title} 
                        onChange={handleChangeTitle}
                        placeholder="제목을 입력해주세요"
                        />
                </div>

                <button onClick={()=>{console.log(p_list);
                
                }}>콘솔</button>

                <div className={J_List_styles.janghak_thin_line}></div>

                <div className={P_add_styles.P_List_title2}>



                    

                    <div  className={P_add_styles.P_List_date}> 
                    <div style={{textAlign:'center', marginTop:7, fontSize:20}}>{formatDate(value)} </div>
                    </div>
                    
                

                    
                    <P_Calendar onChange={onChange} value={value}></P_Calendar>
                    <div className={P_add_styles.P_List_text2}>마감 기한 : </div>
     

             
                </div>

            <div className={J_List_styles.janghak_thin_line}></div>

            
            
            <textarea className={P_add_styles.content_box}
                    name="content_text" 
                    value={p_list[0].content.text} 
                    onChange={handleChangeContent}
                    placeholder="여기에 당신의 프로젝트를 소개해보세요"/>

            <div className={P_add_styles.func_container}>
                
                
            <input type="file" id="image-file" multiple style={{ display: 'none' }} onChange={handleAddImages} />
            <input type="file" id="video-file" multiple style={{ display: 'none' }} onChange={handleAddVideos} />
            <input type="file" id="file-file" multiple style={{ display: 'none' }} onChange={handleAddFiles} />

            <label htmlFor="image-file">
                <LuImagePlus className={P_add_styles.func_icon}/>
            </label>

            <label htmlFor="video-file">
                <RiVideoAddFill className={P_add_styles.func_icon} />
            </label>

            <label htmlFor="file-file">
                <BsPaperclip className={P_add_styles.func_icon}/>
            </label>

            

                {showImages.map((image, id) => (
                        <div key={id}>
                        <img style={{marginLeft:10}} src={image} alt={`${image}-${id}`} width="80" height="80" />
                        </div>
                    ))}
                
            </div>

            <div style={{marginTop:48}} className={J_List_styles.janghak_thin_line}></div>


            {
                p_list[0].recruit.map((a:any, i:any)=> {
                    return (
                        <div key={i}>
                            <div style={{ display: i > 0 ? 'none' : 'inline-flex' }}>
                                <div style={{display:'inline-flex'}}>
                                    <div style={{
                                        marginLeft:65,
                                        fontSize: 20,
                                        fontWeight: 400,
                                        marginTop:10
                                    }} >모집 분야</div>
                                    
                                    <VscDiffAdded  style={{
                                        width:50,
                                        height:50,
                                        marginLeft:13,
                                    }} onClick={() => {
                                        dispatch(p_addrecruit());
                                    }} />
                                </div>
                            </div>

                            <div style={{ display:'inline-flex', marginLeft:i >0 ? 215 : 0}} >
                                <Mojib num={i} ></Mojib>          
                            </div>

                            
                        </div>
                    )

                })
            }

            <div style={{marginTop:90, backgroundColor: '#BABABA' }} className={J_List_styles.janghak_thick_line}></div>

            <div className={P_List_styles.button_list}>
                <button className='navbar_button'>목록</button>
                <button className='navbar_button' onClick={async () => {
                   
                    await handleAllUploadsComplete()
                    
                   
                    
                }}>글쓰기</button> 
            </div>
            
            <button onClick={()=>{console.log(p_list)}}>zhsth</button>
            




            </div>

        </div>

    )
        
       

}

