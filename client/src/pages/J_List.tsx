import React from 'react';

import '../styles/App.css';
import J_List_styles from '../styles/J_List.module.css';

import Mynavbar from '../components/navbar';
import Mynavbar_logined from '../components/navbar_logout';

import { useState,useEffect } from 'react';
import axios from 'axios';

import { RootState, changeIsLogined} from "../components/store";
import { useDispatch, useSelector } from "react-redux";

import '../styles/Paging.css';
import Pagination from "react-js-pagination";
import { useNavigate } from 'react-router-dom';


function J_List(props:any) {
  const navigate = useNavigate();
  const handleNavigate = (key: string, page: number) => {
    navigate(`/scholarship?key=${key}&page=${page}`);
  };
  
  const IsLogined = useSelector((state: RootState) => state.IsLogined);
  let dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const [list, setList] = useState(props.j_list)

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
  };

  useEffect(()=>{
    axios.get(`/scholarship/?key=all&page=${page}`)
      .then(response => {
        
        setList(response.data)
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
  })


  return (
    <div>
      {

        IsLogined.isLogined ? (<Mynavbar_logined/>) : (<Mynavbar/>)

      }
      <div className={J_List_styles.janghak_text}> 장학 </div>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={1499}
        pageRangeDisplayed={10}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
      <div className={J_List_styles.janghak_container} >
        <select className={J_List_styles.janghak_categori}> 
        <option selected value="전체"> 전체 </option>
        <option value="공통"> 공통 </option>
        <option value="서울">서울 </option>
        <option value="국제">국제 </option>
        <option value="기타">기타 </option>
        </select>
        <input className={J_List_styles.janghak_search} type='text'/>

        <button className={J_List_styles.janghak_icon}> 
        <img src='/images/search_icon.png' alt="불러올 수 없는 이미지" className='search_icon' />
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
          list&&list.map((a:any,i:any) => {
            return(
              <div key={i}>
                <div className={J_List_styles.j_list_container}>
                  <div className={J_List_styles.j_list_categori}>
                    <div className={J_List_styles.j_list_categori_rec}>
                      <p className={J_List_styles.j_list_categori_text}>{a.category}</p>  
                    </div>
                  </div>
                  <div className={J_List_styles.j_list_title}> 
                    <span onClick={() => {
                        handleNavigate('all', i)
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
      <script dangerouslySetInnerHTML={{
                        __html: 'window.PROPS=' + JSON.stringify(props)
                    }} />
    </div>
  );
}

export default J_List;