import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/App.css';
import J_List_styles from '../styles/J_List.module.css';
import P_List_styles from '../styles/P_List.module.css'
import '../styles/Paging.css';

import Mynavbar from '../components/navbar';
import Mynavbar_logined from '../components/navbar_logout';

import { useState,useEffect } from 'react';
import axios from 'axios';
import { RootState, p_addList, changeIsLogined, p_removeList, p_resetList } from "../components/store";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "react-js-pagination";


function P_List() {
  let p_list = useSelector((state: RootState) => state.p_list);
  const IsLogined = useSelector((state: RootState) => state.IsLogined);
  let dispatch = useDispatch();
  const navigate = useNavigate();

  const [list, setList] = useState(p_list)

  const [page, setPage] = useState(1);
  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
    /* dispatch(p_resetList())
    axios.get(`/project?key=all&page=${page}`)
      .then(response => {
        console.log(response.data);
        response.data.map((a:any,i:any) => {
           dispatch(p_addList(a))
        })
      })
      .catch(error => {
      }); */
  };

  const handleNavigate = (id: number) => {
    navigate(`/project/detail/${id}`);
  };


  useEffect(()=>{
    axios.get(`/project?key=all&page=${page}`)
      .then(response => {
        console.log(response.data);
        response.data.map((a:any,i:any) => {
            dispatch(p_addList(a))
        })
      })
      .catch(error => {
      });
   
    axios.get('/authorization')
      .then(response => {
        if(response.data.isLogined == 'Logined'){
          dispatch(changeIsLogined(response.data));
        }
      })
      .catch(error => {
      });
  },[])

  return (
    
<div>
    {
      IsLogined.isLogined ? (<Mynavbar_logined/>) : (<Mynavbar/>)
    }


    <div className={J_List_styles.janghak_text}> 프로젝트 모집 </div>


    <button onClick={() => {
      axios.get(`/project?key=all&page=${page}`)
      .then(response => {
        console.log(response.data);
        response.data.map((a:any,i:any) => {
            dispatch(p_addList(a))
        })
      })
      .catch(error => {
      });
    }}>불러오기</button>

    <button onClick={() => {
      console.log(p_list)
    }}>??</button>

    <button onClick={() => {
      dispatch(p_resetList())
    }}>!!</button>

    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={1499}
      pageRangeDisplayed={10}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
    
   

    <div className={P_List_styles.P_List_container} >

      <select className={J_List_styles.janghak_categori}> 
      <option selected value="전체"> 전체 </option>
      <option value="공통"> 공통 </option>
      <option value="서울">서울 </option>
      <option value="국제">국제 </option>
      <option value="기타">기타 </option>
      </select>


      <input className={P_List_styles.P_List_search} type='text'/>

      <button className={P_List_styles.P_List_icon}> 
      <img src='/images/search_icon.png' alt="불러올 수 없는 이미지" className={J_List_styles.search_icon} />
      </button>

      <button className={P_List_styles.P_List_icon} onClick={()=>{
        navigate('/project/write')
      }}> 
      <img src='/images/add_icon.png' alt="불러올 수 없는 이미지" className={J_List_styles.search_icon} />
      </button>
      
      

    </div>


    <div className={J_List_styles.janghak_list}>

      <div className={J_List_styles.janghak_thick_line}></div>

      <div className={J_List_styles.janghak_title}>
        <div className={J_List_styles.janghak_text1}>카테고리</div>
        <div className={J_List_styles.janghak_text1}>제목</div>
        <div className={J_List_styles.janghak_text1}>등록일</div>
      </div>
      <div className={J_List_styles.janghak_thin_line}></div>



      {
        
        p_list.map((a:any,i:any) => {
           return(

            <div key={i}>

            <div className={J_List_styles.j_list_container}>

              <div className={J_List_styles.j_list_categori}>
                <div className={J_List_styles.j_list_categori_rec}>
                  <p className={J_List_styles.j_list_categori_text}>{a.categori}</p>  
                </div>
              </div>

              <div className={J_List_styles.j_list_title}> 
              <span onClick={() => {
                        handleNavigate(i)
                    }}>{a.title}</span>
              </div>

              <div className={J_List_styles.j_list_date}> 
                <div> {a.date}</div>
              </div>
              
            </div>

            <div key={i} className={J_List_styles.janghak_thin_line}></div>

            </div>
            
          ) 
        })
      }




    </div>
    
</div>
    
  );
}

export default P_List;