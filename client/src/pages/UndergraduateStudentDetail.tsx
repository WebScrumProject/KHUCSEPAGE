import { useNavigate, useParams } from 'react-router-dom'
import { RootState} from '../store/store'
import { addProfessor } from '../store/professor'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/AddProfessor.module.css'
import '../styles/Detail.css'
import axios from 'axios';
// import { ObjectId } from 'mongodb';


function UndergraduateStudentDetail() {
  let professor = useSelector((state: RootState) => state.professor);
  let profHistory = useSelector((state: RootState) => state.profHistory);

  let navigate = useNavigate()
  let dispatch = useDispatch()

  interface History {
    Date: string;
    Content: string;
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
      profImage: string,
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
  
  const [history, setHistory] = useState<History[]>([])
  const [image, setImage] = useState<string>('');

  const Profid  = useParams().profId;
  const fetchUndergraduateInfo = async () => {
    console.log(`/undergraduate_student/api/info/${Profid}`)
    try {
      const res = await axios.get(`http://localhost:8080/undergraduate_student/api/info/${Profid}`);
      console.log('research : ', res.data)
      setProfessorData(res.data)
      setHistory(res.data.profHistory)
      console.log(professorData)
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
            <div className="profile">
              <img className={styles.image_preview} src={professorData.profImage}></img>
            </div>
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
          <div style={{ height: "400px" }}>
            {history.map((value: any, index: any) => {
                return (
                  <div key={index}>
                    <div className="history_container">
                      <p style={{ width: "130px" }} key={index}>
                        {value.Date}{" "}
                      </p>
                      <p>{value.Content}</p>
                    </div>
                    <div className="line"></div>
                  </div>
                );
              })} 
          </div>
        </div>
      </div>
      <div className={styles.add_professor_project}></div>
    </div>
  )
}

export default UndergraduateStudentDetail