import React, { useEffect } from 'react';
import '../styles/App.css';
import styles1 from '../styles/J_List.module.css';
import styles3 from '../styles/Prev_next.module.css';

export default function Prev_next(props:any) {

    if(props.scholarshipId==0) {
        return (
            <div>
                <div className={styles3.prev_container}>
                    <div style={{backgroundColor:'black'}} className={styles1.janghak_thin_line}></div>
                    <div className={styles3.prev_text}>이전글  </div>
                    <div style={{backgroundColor:'black', marginTop:24}} className={styles1.janghak_thin_line}></div>
                </div>

                <div className={styles3.prev_container}>
                    <div className={styles3.prev_text}>다음글 {/* {props.j_list[1].title} */}</div>
                    <div style={{backgroundColor:'black',marginTop:24}} className={styles1.janghak_thin_line}></div>
                </div>
            </div>

        )
    }
    else if(props.scholarshipId==499) {
        return (
            <div>
                <div className={styles3.prev_container}>
                    <div style={{backgroundColor:'black'}} className={styles1.janghak_thin_line}></div>
                    <div className={styles3.prev_text}>이전글 {/* {props.j_list[0].title} */} </div>
                    <div style={{backgroundColor:'black', marginTop:24}} className={styles1.janghak_thin_line}></div>
                </div>

                <div className={styles3.prev_container}>
                    <div className={styles3.prev_text}>다음글 </div>
                    <div style={{backgroundColor:'black',marginTop:24}} className={styles1.janghak_thin_line}></div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
            
                <div className={styles3.prev_container}>
                    <div style={{backgroundColor:'black'}} className={styles1.janghak_thin_line}></div>
                    <div className={styles3.prev_text}>이전글 {/* {props.j_list[0].title} */} </div>
                    <div style={{backgroundColor:'black', marginTop:24}} className={styles1.janghak_thin_line}></div>
                </div>

                <div className={styles3.prev_container}>
                    <div className={styles3.prev_text}>다음글 {/* {props.j_list[2].title} */}</div>
                    <div style={{backgroundColor:'black',marginTop:24}} className={styles1.janghak_thin_line}></div>
                </div>

            </div>
        )
    }


    
}