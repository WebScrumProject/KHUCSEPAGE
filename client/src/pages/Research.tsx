import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../store/store'
import {addProfessor, deleteProfessor, resetProfessor} from '../store/professor'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Research.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/Paging.css';
import Pagination from 'react-js-pagination'
import { MdDelete } from "react-icons/md";
// import { ObjectId } from 'mongodb';


function Research() {
    // let professor = useSelector((state: RootState) => state.professor);
    const professor = useSelector((state: RootState) => state.professor.prof); // state 타입은 RootState로 가정

    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [page, setPage] = useState(1) // 현재 페이지
    const pageSize = 6;
    let [count, setCount] = useState(0) // 카드의 개수

    const handlePageChange = (page: number) => {
      setPage(page);
    };

    // const fetchUndergraduatePage = async () => {
    //     try {
    //       const res = await axios.get(`/undergraduate_student?page=${page}`);
    //       navigate('/research')
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    const fetchUndergraduateInfo = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/undergraduate_student/api/info?page=${page}&pageSize=${pageSize}`);
            navigate('/research')
            const info_count = res.data
            setCount(info_count.length)
            dispatch(resetProfessor());
            res.data.map((a:any, i:number) => {
                dispatch(addProfessor(a))
            })
            console.log(res.data)
            console.log('카드 개수 : ', count) 
            window.scrollTo(0, 0);
        } catch (error) {
            console.error(error);
          }
    }
    // 삭제할 때마다 axios.delete
    const deleteUndergraduate = (id:string) => {
        if(window.confirm('정말 삭제할까요?')) {
            axios.delete(`http://localhost:8080/undergraduate_student/api/info/${id}`)
            .then((res) => { 
                dispatch(deleteProfessor(id))
                alert('삭제되었습니다.')
            })
            .catch((err) => {
              console.log(err)
            })
        }
    }

    useEffect(() => { 
      fetchUndergraduateInfo();
    }, [page])
    // 그 카드의 상세페이지로 이동할 때 axios.get

    const selectCard = (id:any, name:string) => {
        return {
          type: 'SELECT_CARD',
          payload: { id, name }
        };
      };
    return (
        <div>
          <button className={styles.add_professor} onClick={() => {navigate('/addProfessor')}}> 페이지 추가 </button>
          <div className={styles.research_container}>
              {
                professor.map((a:any, index:any) => {
                  return(
                    <div className={styles.research_box}>
                      <div className={styles.research_profile}>
                        {/* <div className={styles.research_picture} /> */}
                        <img src={a.profImage} alt="image"></img>
                        <p>{a.profName} 교수님</p>
                        <p>{a.profEmail}</p>
                      </div>
                      <div className={styles.research_content}>
                        <p>모집 인원 : {a.recNumber}</p>
                        <p>기간 : {a.recDate}</p>
                        <p>연구 분야 : {a.profMajor}</p>
                      </div>
                      <div className={styles.button_container}>
                        <button type='submit' 
                        className={styles.delete_button}
                        onClick={() => {
                          var id = a.profId
                          deleteUndergraduate(id)}}> 
                          <MdDelete color="white"/> </button>
                        <button type='submit' 
                          className={styles.detail_button} 
                          onClick={() => {
                            var id = a.profId
                            navigate(`/detail/${id}`)}}> + </button>
                      </div>
                    </div>
                  )
                })
              }
          </div>
          <div className={styles.pagination}>
            <Pagination 
              activePage={page}
              itemsCountPerPage={pageSize}
              totalItemsCount={30}
              pageRangeDisplayed={5}
              prevPageText={"<"}
              nextPageText={">"}
              onChange={handlePageChange} // onPageChange 대신 onChange 사용
            />
          </div>
        </div>
    )
}

export default Research
