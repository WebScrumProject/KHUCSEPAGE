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

import { PListItem, PListState } from '../components/type';

export default function Mojib(props:any) {

    let p_list = useSelector((state: RootState) => state.p_list);
    let dispatch = useDispatch();
    let [mojib_cate_val, mojib_cate_change ] = useState("")
   

    const handleChangeField = (e:any) => {
        /* dispatch(p_addfield(
            {
                field : e.target.value,
                num : props.num,
                cate_field : mojib_cate_val
            }

            state[0].recruit[action.payload.num].field =action.payload.field;
            state[0].recruit[action.payload.num].cate_field =action.payload.cate_field;
        )); */
        
        props.setTempPList((prevState: { recruit: any; }) => {
            const updatedRecruit = [...prevState.recruit]; 
            updatedRecruit[props.num] = {
              ...updatedRecruit[props.num], 
              field: e.target.value,
              cate_field: mojib_cate_val
            };
            return {
              ...prevState,
              recruit: updatedRecruit 
            };
            
          });
          
        
    };

    const handleChangeApply_cnt = (e:any) => {
        props.setTempPList((prevState: { recruit: any; }) => {
            const updatedRecruit = [...prevState.recruit]; // 이전 배열을 복사합니다.
            updatedRecruit[props.num] = {
              ...updatedRecruit[props.num], // 기존 요소를 복사합니다.
              apply_cnt: e.target.value
            };
            return {
              ...prevState,
              recruit: updatedRecruit // 업데이트된 배열을 새로운 상태에 할당합니다.
            };
          });
        
    };

    return (
        <div className={P_add_styles.mojib_container}>
            
            <select className={P_add_styles.P_List_categori} value={mojib_cate_val} onChange={(e) => {
                        
                        mojib_cate_change(e.target.value)

                    }}>
                        <option hidden disabled value=""> 선택 </option>
                        <option value="프론트"> 프론트 </option>
                        <option value="백"> 백 </option>
                        <option value="게임"> 게임 </option>
                        <option value="AI"> AI </option>
                        <option value="PM"> PM </option>
                        <option value="디자이너 "> 디자이너 </option>
                        <option value="안드로이드 "> 안드로이드 </option>
                        <option value="IOS"> IOS </option>
                        <option value="기타">기타 </option>
            </select>

            {/* <button onClick={()=>console.log(mojib_cate_val)}>ㅋㅋ</button> */}

            {
                mojib_cate_val=="" ? null : 

                <input className=
                {P_add_styles.mojib_container}
                name="field" 
                style={{marginLeft:20}}
                /* value={p_list[0].apply[props.num].field}  */
                onChange={handleChangeField}
                placeholder='자세한 분야를 적어주세요'
                />
            }

            

            <div style={{
                marginLeft:41,
                fontSize: 20,
                fontWeight: 400,
                marginTop:20
                }}> 인원 수 </div>

            <input className={P_add_styles.mojib_container}
            name="apply_cnt" 
            /* value={p_list[0].recruit[props.num].apply_cnt}  */
            style={{marginLeft:20}}
            onChange={handleChangeApply_cnt}
            />

            <MdCancel onClick={() => {
                setTempPList(prevState => {
                    const updatedRecruit = [...prevState.recruit]; 
                    updatedRecruit.splice(props.num, 1); 
                    return {
                      ...prevState,
                      recruit: updatedRecruit 
                    };
                  });
            }} className={P_add_styles.mojib_container}/>
        </div>

    )
        
       

}

function setTempPList(arg0: (prevState: any) => any) {
    throw new Error('Function not implemented.');
}
