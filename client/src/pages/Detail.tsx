import React, { useEffect } from 'react';

import J_List_styles from '../styles/J_List.module.css';
import JB_styles from '../styles/JB_detail.module.css';
import P_add_styles from '../styles/P_List_add.module.css'
import apply_modal from '../styles/apply_modal.module.css'
import Mynavbar from '../components/navbar';
import Prev_next from '../components/prev_next';
import { useState } from 'react';

import { RootState } from "../components/store";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import { useNavigate, useParams } from 'react-router';
import moment from 'moment';



export default function Detail(props:any) {
   
    const { page, id } = useParams() as unknown as { id: number, page:number };

    let p_list = useSelector((state: RootState) => state.p_list);
    
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    const todayDate = moment().format('YYYY/MM/DD');
   

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
                        .then(response2 => {
                            alert("성공적으로 마감되었습니다.")
                            navigate('/project')
                        })
                        
                      }
                      else {
                        alert("당신은 작성자가 아닙니다.")
                      }
                    })
                    .catch(error => {
                    });
                }} >마감</button>

            <button onClick={openModal} > 지원 </button>
                {modalOpen && (
                    <div className={apply_modal.modal_overlay} onClick={closeModal}>
                        <div className={apply_modal.modal_content}>

                                {p_list[id].recruit.map((item, index) => (
                                    <div key={index} style={{ marginLeft: '20px' }}>
                                        <div>
                                            <span style={{ fontWeight: 'bold', fontSize:20}}>모집 분야:</span>{' '}
                                            <span style={{ fontWeight: 'bold', fontSize:20}}>{item.cate_field}</span>{' '}
                                            <span style={{ fontWeight: 'bold',marginLeft:20,fontSize:20 }}>상세:</span>{' '}
                                            <span style={{ fontWeight: 'bold', fontSize:20}}>{item.field} 에 지원하기</span>{' '} 

                                            <button onClick={()=>{
                                                axios.get('/authorization')
                                                .then(response => {
                                                        axios.put(`/project/applyment/${p_list[id]._id}`, 
                                                        {
                                                            id:response.data.userid,
                                                            date: todayDate,
                                                            fieldDetail: item.field,
                                                            field: item.cate_field,
                                                            memo: "",
                                                        }
                                                        )
                                                        
                                                        })
                                                        .then(response2=>{
                                                            alert("성공적으로 지원하셨습니다.")
                                                            navigate("/project")
                                                        })
                                                .catch(error => {
                                                });
                                            }} >지원</button>
                                        </div>
                            
                                </div>
                            ))}
                        </div>
                    </div>
        )}

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

                <div className={J_List_styles.janghak_thin_line}></div>
                <div>
                {p_list[id].recruit.map((item, index) => (
                        <div key={index} style={{ marginLeft: '20px' }}>
                            <div>
                                <span style={{ fontWeight: 'bold', fontSize:20}}>모집 분야:</span>{' '}
                                <span style={{ fontWeight: 'bold', fontSize:20}}>{item.cate_field}</span>{' '}
                                <span style={{ fontWeight: 'bold',marginLeft:20,fontSize:20 }}>상세:</span>{' '}
                                <span style={{ fontWeight: 'bold', fontSize:20}}>{item.field}</span>{' '}
                                <span style={{ fontWeight: 'bold',marginLeft:20,fontSize:20 }}>필요 인원 수:</span>{' '}
                                <span style={{ fontWeight: 'bold', fontSize:20}}>{item.apply_cnt}</span>{' '}
                                
                            </div>
                       
                        </div>
                    ))}
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