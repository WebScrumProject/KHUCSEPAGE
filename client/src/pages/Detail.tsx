import React, { useEffect } from 'react';

import J_List_styles from '../styles/J_List.module.css';
import JB_styles from '../styles/JB_detail.module.css';
import P_add_styles from '../styles/P_List_add.module.css'
import Mynavbar from '../components/navbar';
import Prev_next from '../components/prev_next';
import { useState } from 'react';

import { RootState } from "../components/store";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import { useNavigate, useParams } from 'react-router';



export default function Detail(props:any) {
   
    const { page, id } = useParams() as unknown as { id: number, page:number };

    let p_list = useSelector((state: RootState) => state.p_list);
    
    const navigate = useNavigate();

   

    return (
        <div>
            <Mynavbar></Mynavbar>
           

            <div className={J_List_styles.janghak_text}> 프로젝트 </div>

            <button onClick={()=>{ 
                console.log(page);
                    axios.get('/authorization')
                    .then(response => {
                      if(response.data.userid == p_list[id].id){
                        navigate(`/project/edit/${page}/${id}`);
                      }
                      else {
                        alert("당신은 작성자가 아닙니다.")
                      }
                    })
                    .catch(error => {
                    });
                }} >Edit</button>

            <button onClick={()=>{ 
                console.log(page);
                    axios.get('/authorization')
                    .then(response => {
                      if(response.data.userid == p_list[id].id){
                        axios.put(`/project/end/${p_list[id]._id}`)
                      }
                      else {
                        alert("당신은 작성자가 아닙니다.")
                      }
                    })
                    .catch(error => {
                    });
                }} >마감</button>

                <button onClick={()=>{console.log(p_list)}} >버튼</button>
         

            <div className={JB_styles.detail_container} >
      

                <div className={JB_styles.detail_title}>
                <div className={JB_styles.detail_text1}></div>
                <div className={JB_styles.detail_text1}>{p_list[id].title}</div>
                <div className={JB_styles.detail_text1}>{p_list[id].date}</div>
                </div>

                <div className={J_List_styles.janghak_thin_line}></div>

                <div className={JB_styles.detail_title2}>
                    
                    <div className={JB_styles.detail_text2}> 작성자 </div>
                    <div className={JB_styles.detail_column_line}></div>
                    <div className={JB_styles.detail_text4}> {p_list[id].writer} </div>

                    <div className={JB_styles.detail_text3}> 첨부파일 </div>
                    <div className={JB_styles.detail_column_line}></div>
                    <div className={JB_styles.detail_text4}> {p_list[id].content.file} </div>
                </div>

                <div className={J_List_styles.janghak_thin_line}></div>

                <div className={JB_styles.detail_content}>
                <div> {p_list[id].content.text} </div>    
                </div>


                <div className={P_add_styles.func_container}>
                {p_list[id].content.image&&p_list[id].content.image.map((image, id) => (
                        <div key={id}>
                            <img style={{marginLeft:10}} src={image} alt={`${image}-${id}`} width="80" height="80" />
                        </div>
                    ))}
                    {p_list[id].content.video&&p_list[id].content.video.map((image, id) => (
                        <div key={id}>
                            <img style={{marginLeft:10}} src={image} alt={`${image}-${id}`} width="80" height="80" />
                        </div>
                    ))}
                
                </div>

                <Prev_next id={id} ></Prev_next>
                
            </div>

            
            
        </div>
        
    )
}