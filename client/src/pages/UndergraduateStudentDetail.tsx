import { useNavigate, useParams } from 'react-router-dom'
import { RootState} from '../store/store'
import { addProfessor } from '../store/professor'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/AddProfessor.module.css'
import axios from 'axios';
// import { ObjectId } from 'mongodb';


function UndergraduateStudentDetail() {
    let professor = useSelector((state: RootState) => state.professor);
    let profHistory = useSelector((state: RootState) => state.profHistory);

    let navigate = useNavigate()
    let dispatch = useDispatch()

    interface History {
      date: string;
      content: string;
    }
    interface ProfessorData {
        _id: string;
        profName: string;
        profMajor: string;
        profPhone: string;
        profEmail: string;
        profLab: string;
        profLink: string;
        recNumber: string;
        recDate: string;
        profImage: '',
    }
    const [professorData, setProfessorData] = useState<ProfessorData>({
        _id: '',
        profName: '',
        profMajor: '',
        profPhone: '',
        profEmail: '',
        profLab: '',
        profLink: '',
        recNumber: '',
        recDate: '',
        profImage: '',
      });
    

    // const fetchUndergraduateDetail= async () => {
    //   try {
    //     const res = await axios.get(`/undergraduate_student/${professorData._id}`);
    //     console.log(res.data._id)
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
      
    // 이미지 파일 추가
    const [imgFile, setImgFile] = useState<File | null>(null)
    const [previewImg, setPreviewImg] = useState<string | null>(null)

    const Profid  = useParams().profId;
    const fetchUndergraduateInfo = async () => {
      console.log(`/undergraduate_student/api/info/${Profid}`)
      try {
          const res = await axios.get(`http://localhost:8080/undergraduate_student/api/info/${Profid}`);
          console.log('research : ', res.data)
          setProfessorData(res.data)
      } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
      fetchUndergraduateInfo();
    }, [])

    return (
        <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
            <div className={styles.add_professor_container}>
                <div className={styles.add_professor_profile}>
                    <div className={styles.add_professor_profile_top}>
                        <div className={styles.add_professor_picture}>
                        {previewImg && (<img className={styles.image_preview} src={previewImg}></img>)}
                            
                        </div>
                        {/* <input type='file' accept='image/*' id='inputTag' className={styles.image_input} onChange={handleImageChange}/>   */}
                        {/* <label htmlFor='inputTag'>이미지 선택</label> */}

                    </div>
                    <div className={styles.research_container}>
                
                    <div className={styles.research_box}>
                        <div className={styles.research_profile}>
                            <div className={styles.research_picture} />
                            <p>{professorData.profName} 교수님</p>
                            <p>{professorData.profPhone}</p>
                        </div>
                        <div className={styles.research_content}>
                            <p>모집 인원 : {professorData.recNumber}명</p>
                            <p>기간 : {professorData.recDate}</p>
                            <p>연구 분야 : {professorData.profMajor}</p>
                            <p>{professorData.profLink}</p>
                        </div>
                    </div>
              
            </div>
                </div>
                <div className={styles.add_professor_history}>
                  <div className={styles.history_content}>
                    {/* {profHistory.map((value:any, index:any) => (
                      <div>
                        <p style={{textAlign:'start'}}key={index}>{value}</p>
                        <div className={styles.line}></div>
                      </div>
                    ))} */}
                  </div>
                </div>
            </div>
            <div className={styles.add_professor_project}></div>
        </div>
    )
}

export default UndergraduateStudentDetail