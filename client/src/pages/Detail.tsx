import React, { useEffect } from 'react';
import '../css/App.css';
import J_List_styles from '../styles/J_List.module.css';
import JB_styles from '../styles/JB_detail.module.css';
import P_add_styles from '../styles/P_List_add.module.css'
import Mynavbar from '../components/navbar';
import Prev_next from '../components/prev_next';
import { useState } from 'react';

import { RootState } from "../components/store";
import { useDispatch, useSelector } from "react-redux";
import J_List from './J_List';
import axios from 'axios';

export default function Detail(props:any) {

    
    let content:string = props.j_list[1].content;
    content = content.substring(1, content.length - 1);

   let a;
   if(props.scholarshipId==0) {
    a = 0;
   }
   else {
    a=1;
   }

    return (
        <div>
            <Mynavbar></Mynavbar>
           

            <div className={J_List_styles.janghak_text}> 장학 </div>

            <div className={JB_styles.detail_container} >
                <div className={J_List_styles.janghak_text}></div>

                <div className={JB_styles.detail_title}>
                <div className={JB_styles.detail_text1}></div>
                <div className={JB_styles.detail_text1}>{props.j_list[a].title}</div>
                <div className={JB_styles.detail_text1}>{props.j_list[a].date}</div>
                </div>

                <div className={J_List_styles.janghak_thin_line}></div>

                <div className={JB_styles.detail_title2}>
                    
                    <div className={JB_styles.detail_text2}> 작성자 </div>
                    <div className={JB_styles.detail_column_line}></div>
                    <div className={JB_styles.detail_text4}> {props.j_list[a].writer} </div>

                    <div className={JB_styles.detail_text3}> 첨부파일 </div>
                    <div className={JB_styles.detail_column_line}></div>
                    <div className={JB_styles.detail_text4}> {props.j_list[a].file} </div>
                </div>

                <div className={J_List_styles.janghak_thin_line}></div>

                <div className={JB_styles.detail_content}>
                <div dangerouslySetInnerHTML={{__html: content}}></div>    
                </div>

                <Prev_next j_list={props.j_list} scholarshipId={props.scholarshipId} ></Prev_next>
                
            </div>

            
            
        </div>
        
    )
}