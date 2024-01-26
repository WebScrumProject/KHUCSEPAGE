import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../store/store'
import {addProfessor, deleteProfessor} from '../store/professor'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Research.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/Paging.css';
// import Pagination from "react-js-pagination"
// import { ObjectId } from 'mongodb';


function Research() {
    let professor = useSelector((state: RootState) => state.professor);
    // const proId = professor?.id <- typescript에서 redux의 state 부르는 방법 알압괴

    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [page, setPage] = useState(1) // 현재 페이지
    let [count, setCount] = useState(0) // 카드의 개수

    const prevPage=(() => {setPage(page-1)})
    const nextPage=(() => {setPage(page+1)})
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
            const res = await axios.get(`/undergraduate_student?page=${page}/info`);
            navigate('/research')
            const info_count = res.data
            setCount(info_count.length)
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
    const deleteUndergraduate = (i:number) => {
        if(window.confirm('정말 삭제할까요?')) {
            axios.delete(`/undergraduate_student/${i}`)
            .then((res) => { 
                dispatch(deleteProfessor(i))
                alert('삭제되었습니다.')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    // const handlePageChange = (page: number) => {
    //     setPage(page)
    // }
    // useEffect(() => {
    //     // fetchUndergraduatePage()
    //     fetchUndergraduateInfo()
    // }, [page])
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
                    professor.map((a:any, i:any) => {
                        return(
                            <div className={styles.research_box}>
                                <div className={styles.research_profile}>
                                    <div className={styles.research_picture} />
                                    <p>{a.profName} 교수님</p>
                                    <p>{a.profPhone}</p>
                                </div>
                                <div className={styles.research_content}>
                                    <p>모집 인원 : {a.recNumber}명</p>
                                    <p>기간 : {a.recDate}</p>
                                    <p>연구 분야 : {a.profMajor}</p>
                                </div>
                                <div className={styles.button_container}>
                                    <button type='submit' 
                                    className={styles.delete_button}
                                    onClick={() => {
                                        var id = a._id
                                        deleteUndergraduate(i)}}> - </button>
                                    <button type='submit' 
                                        className={styles.detail_button} 
                                        onClick={() => {
                                            var id = a._id
                                            navigate(`/detail/${id}`)}}> + </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.pagination}>
                <button className={styles.prev_btn} onClick={prevPage}
                    style={{ opacity: page !== 1 ? 1 : 0, pointerEvents: page !== 1 ? 'auto' : 'none' }}>이전</button>
                    <p className={styles.page_num}>{page}페이지</p>
                <button className={styles.next_btn} onClick={nextPage}>다음</button>      
            </div>
        </div>
    )
}

export default Research
