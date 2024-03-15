import React, { useEffect } from 'react';
import '../styles/App.css';
import J_List_styles from '../styles/J_List.module.css';
import Prev_next_styles from '../styles/Prev_next.module.css';
import { RootState } from './store';
import { useSelector } from 'react-redux';

export default function Prev_next(props:any) {
    let p_list = useSelector((state: RootState) => state.p_list);
    if(props.scholarshipId==0) {
        return (
            <div>
                <div className={Prev_next_styles.prev_container}>
                    <div style={{backgroundColor:'black'}} className={J_List_styles.janghak_thin_line}></div>
                    <div className={Prev_next_styles.prev_text}>이전글  </div>
                    <div style={{backgroundColor:'black', marginTop:24}} className={J_List_styles.janghak_thin_line}></div>
                </div>

                <div className={Prev_next_styles.prev_container}>
                    <div className={Prev_next_styles.prev_text}>다음글 {p_list[1].title}</div>
                    <div style={{backgroundColor:'black',marginTop:24}} className={J_List_styles.janghak_thin_line}></div>
                </div>
            </div>

        )
    }
    else if(props.scholarshipId==499) {
        return (
            <div>
                <div className={Prev_next_styles.prev_container}>
                    <div style={{backgroundColor:'black'}} className={J_List_styles.janghak_thin_line}></div>
                    <div className={Prev_next_styles.prev_text}>이전글 {props.p_list[0].title} </div>
                    <div style={{backgroundColor:'black', marginTop:24}} className={J_List_styles.janghak_thin_line}></div>
                </div>

                <div className={Prev_next_styles.prev_container}>
                    <div className={Prev_next_styles.prev_text}>다음글 </div>
                    <div style={{backgroundColor:'black',marginTop:24}} className={J_List_styles.janghak_thin_line}></div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
            
                <div className={Prev_next_styles.prev_container}>
                    <div style={{backgroundColor:'black'}} className={J_List_styles.janghak_thin_line}></div>
                    <div className={Prev_next_styles.prev_text}>이전글 {props.j_list[props.id-1].title} </div>
                    <div style={{backgroundColor:'black', marginTop:24}} className={J_List_styles.janghak_thin_line}></div>
                </div>

                <div className={Prev_next_styles.prev_container}>
                    <div className={Prev_next_styles.prev_text}>다음글 {props.j_list[props.id+1].title}</div>
                    <div style={{backgroundColor:'black',marginTop:24}} className={J_List_styles.janghak_thin_line}></div>
                </div>

            </div>
        )
    }


    
}