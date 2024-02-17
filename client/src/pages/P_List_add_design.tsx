import React, { useEffect, useRef, Ref, useMemo } from 'react';
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

import { RootState, p_addcontent ,p_addrecruit,p_addtitle,p_addimage } from "../components/store";
import { useDispatch, useSelector } from "react-redux";

import { FaRegCalendarAlt } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { RiVideoAddFill } from "react-icons/ri";
import { BsPaperclip } from "react-icons/bs";
import { VscDiffAdded } from "react-icons/vsc";



export default function P_List_add_design() {
    let p_list = useSelector((state: RootState) => state.p_list);
    let dispatch = useDispatch();
    
    const [value, onChange] = useState(new Date());

    const handleChangeContent = (e:any) => {
        dispatch(p_addcontent(e.target.value));
    };

    const handleChangeTitle = (e:any) => {
        dispatch(p_addtitle(e.target.value));
    };

    let [mojib_cnt, setmojib_cnt] = useState(0);

    const [showImages, setShowImages] = useState<string[]>([]);
    const [imageList, setImageList]  = useState<File[]>([]);

 
    const handleAddImages = (event: { target: { files: any; }; } | any ) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];
        let newImageList = [...imageList];

        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
            newImageList.push(imageLists[i]);
        }

        if (imageUrlLists.length > 30) {
            imageUrlLists = imageUrlLists.slice(0, 30);
            newImageList = newImageList.slice(0, 30);
        }

        setShowImages(imageUrlLists);
        setImageList(newImageList);
        
    };

  
    const handleDeleteImage = (id: number) => {
        setShowImages(showImages.filter((_, index) => index !== id));
    };

    const handletoServer = () => {
        const formData = new FormData();
        for (let i = 0; i < imageList.length; i++) {
        formData.append("image", imageList[i]);
        }
        axios.post("/project/write", formData)
    }

    //image

    useEffect(()=>{
        dispatch(p_addimage(showImages))
    },[showImages])
    

   

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

                <button onClick={()=>{console.log(p_list)}}>콘솔</button>

                <div className={J_List_styles.janghak_thin_line}></div>

                <div className={P_add_styles.P_List_title2}>

                    <div className={P_add_styles.P_List_text1}> 카테고리 :  </div>

                    <select className={P_add_styles.P_List_categori}> 
                        <option selected value="전체"> 전체 </option>
                        <option value="공통"> 공통 </option>
                        <option value="서울">서울 </option>
                        <option value="국제">국제 </option>
                        <option value="기타">기타 </option>
                    </select>

                    <div className={P_add_styles.P_List_text2}>마감 기한 : </div>

                    <div className={P_add_styles.P_List_date}></div>
                    
                    {/* <FaRegCalendarAlt className={P_add_styles.calendar_icon}>
                        
                    </FaRegCalendarAlt> */}
                    
                    <P_Calendar onChange={onChange} value={value}></P_Calendar>
                    
                    
                    {/* <button onClick={()=>{console.log(value)}}>날짜콘솔</button> */}
             
                </div>

            <div className={J_List_styles.janghak_thin_line}></div>

            
            
            <textarea className={P_add_styles.content_box}
                    name="content_text" 
                    value={p_list[0].content.text} 
                    onChange={handleChangeContent}
                    placeholder="여기에 당신의 프로젝트를 소개해보세요"/>

            <div className={P_add_styles.func_container}>
                <BsPaperclip className={P_add_styles.func_icon}/>

                <RiVideoAddFill className={P_add_styles.func_icon} />

                
                <label htmlFor="input-file"  onChange={handleAddImages}>
                    <input type="file" id="input-file" multiple style={{ display: 'none' }} />
                    <LuImagePlus className={P_add_styles.func_icon}/>
                </label>

                <button onClick={() =>{
                    console.log(imageList)
                    /* console.log(showImages) */
                }}>콘솔</button>

                {showImages.map((image, id) => (
                        <div key={id}>
                        <img src={image} alt={`${image}-${id}`} width="60" height="60" />
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
                <button className='navbar_button' onClick={() => {
                   
                    /* console.log(p_list[0]) */
                    
                        axios.post('project/write',imageList)
                        .then((response) => {
                            console.log('succes');
                          })
                          .catch((error) => {
                            console.error(error);
                          });
                    
                }}>글쓰기</button> 
            </div>
            
            <button onClick={()=>{console.log(p_list)}}>zhsth</button>
            




            </div>

        </div>

    )
        
       

}

