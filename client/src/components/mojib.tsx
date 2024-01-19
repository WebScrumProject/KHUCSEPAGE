import React, { useEffect, useRef, Ref, useMemo } from 'react';
import '../styles/App.css';
import '../styles/J_List.module.css';
import '../styles/JB_detail.module.css';
import '../styles/P_List_add.module.css'
import Mynavbar from '../components/navbar';

import { useState } from 'react';

import { RootState, p_addcontent, p_removerecruit } from "../components/store";
import { useDispatch, useSelector } from "react-redux";

import { FaRegCalendarAlt } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { RiVideoAddFill } from "react-icons/ri";
import { BsPaperclip } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

export default function Mojib(props:any) {

    let p_list = useSelector((state: RootState) => state.p_list);
    let dispatch = useDispatch();

    const handleChange = (e:any) => {
        dispatch(p_addcontent(e.target.value));
        console.log(p_list[0].content.text);
    };

    return (
        <div className='mojib_container'>
            <input className='mojib_categori'
            
            />
            <div style={{
                marginLeft:41,
                fontSize: 20,
                fontWeight: 400,
                marginTop:23
                }}> 인원 수 </div>
            <input className='mojib_pop'/>
            <MdCancel onClick={() => {
                if(props.num>0) {
                    dispatch(p_removerecruit(props.num))
                }
            }} className='cancel_icon'/>
        </div>

    )
        
       

}