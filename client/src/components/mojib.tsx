import React, { useEffect, useRef, Ref, useMemo } from 'react';
import '../styles/App.css';
import J_List_styles from '../styles/J_List.module.css';
import JB_styles from '../styles/JB_detail.module.css';
import P_add_styles from '../styles/P_List_add.module.css'
import Mynavbar from '../components/navbar';

import { useState } from 'react';

import { RootState, p_addcontent, p_addfield, p_addapply_cnt, p_removerecruit } from "../components/store";
import { useDispatch, useSelector } from "react-redux";

import { FaRegCalendarAlt } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { RiVideoAddFill } from "react-icons/ri";
import { BsPaperclip } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

export default function Mojib(props:any) {

    let p_list = useSelector((state: RootState) => state.p_list);
    let dispatch = useDispatch();

    const handleChangeField = (e:any) => {
        dispatch(p_addfield(
            {
                field : e.target.value,
                num : props.num
            }
        ));
        
    };

    const handleChangeApply_cnt = (e:any) => {
        dispatch(p_addapply_cnt({
            apply_cnt : e.target.value,
            num : props.num
        }));
        
    };

    return (
        <div className={P_add_styles.mojib_container}>
            
            <input className=
            {P_add_styles.mojib_container}
            name="field" 
            /* value={p_list[0].apply[props.num].field}  */
            onChange={handleChangeField}
            
            />
            <div style={{
                marginLeft:41,
                fontSize: 20,
                fontWeight: 400,
                marginTop:23
                }}> 인원 수 </div>

            <input className={P_add_styles.mojib_container}
            name="apply_cnt" 
            /* value={p_list[0].recruit[props.num].apply_cnt}  */
            onChange={handleChangeApply_cnt}
            />

            <MdCancel onClick={() => {
                if(props.num>0) {
                    dispatch(p_removerecruit(props.num))
                }
            }} className={P_add_styles.mojib_container}/>
        </div>

    )
        
       

}