import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { addProfessor } from "../store/professor";
import { addProfHistory } from "../store/profHistory";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import styles from "../styles/AddProfessor.module.css";
import axios from "axios";
import InputProfessor from "../components/InputProfessor";

function AddProfessor() {
  let professor = useSelector((state: RootState) => state.professor.prof) as any;
  let profHistory = useSelector((state: RootState) => state.profHistory.history) as any;

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let imageUrl = 'default';
  
  interface ProfessorData {
    profId: string;
    profName: string;
    profMajor: string;
    profPhone: string;
    profEmail: string;
    profLab: string;
    profLink: string;
    recNumber: number;
    recDate: string;
    profImage: string,
  }
  const [professorData, setProfessorData] = useState<ProfessorData>({
    profId: "",
    profName: "",
    profMajor: "",
    profPhone: "",
    profEmail: "",
    profLab: "",
    profLink: "",
    recNumber: 0,
    recDate: "",
    profImage: '',
  });

  const handleInputProfessorChange = (e: any, field: string) => {
    setProfessorData({ ...professorData, [field]: e.target.value });
  };
  const handleImageUrl = (imageUrl: string) => {
    setProfessorData(prevState => ({
      ...prevState,
      profImage: imageUrl,
    }));
  };

  const inputFields = [
    { placeholder: "이름을 입력해주세요.", name: "profName" },
    { placeholder: "연구분야를 입력해주세요.", name: "profMajor" },
    { placeholder: "연락처를 입력해주세요.", name: "profPhone" },
    { placeholder: "이메일을 입력해주세요.", name: "profEmail" },
    { placeholder: "연구실의 위치를 입력해주세요.", name: "profLab" },
    { placeholder: "홈페이지의 링크를 입력해주세요.", name: "profLink" },
    { placeholder: "모집인원을 입력해주세요.", name: "recNumber" },
    { placeholder: "기간을 입력해주세요.", name: "recDate" },
  ];

  //히스토리
  interface History {
    Date: string;
    Content: string;
  }
  const [history, setHistory] = useState<History>({
    Date: "2000-00-00",
    Content: "",
  });

  const [historyArr, setHistoryArr] = useState<History[]>([]);

  const handleInputHistoryChange = (e: any, field: string) => {
    setHistory({ ...history, [field]: e.target.value });
  };

  // 이미지 파일 추가
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  // 이미지 선택
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const showFile: File = e.target.files[0];
      setFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      if (showFile) {
        reader.readAsDataURL(showFile);
        setImageName(showFile.name);
      }
    }
  };
  // 서버에 이미지 파일 전송
  const handleImageUpload = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("img", file);
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/undergraduate_student/image",
        formData
      );
      imageUrl = res.data;
      handleImageUrl(imageUrl);
      console.log('imageUrl : ', imageUrl)
      return imageUrl;
    } catch (err) {
      console.log(err);
    }
  };

  // axios 코드 (나중에 axios 파일 만들어서 옮길 예정)
  const sendProfessorData = (professorData: any) => {
    handleImageUrl(imageUrl);
    console.log(professorData.profImage)
    const serverURL = "http://localhost:8080/undergraduate_student/write";
    axios
      .post(serverURL, professorData)
      .then((res) => {
        console.log(res.data);
        
        console.log('url이 과연 있을까?? ', professorData)
        dispatch(
          addProfessor({
            profId: res.data,
            profName: professorData.profName,
            profMajor: professorData.profMajor,
            profPhone: professorData.profPhone,
            profEmail: professorData.profEmail,
            profLab: professorData.profLab,
            profLink: professorData.profLink,
            recNumber: professorData.recNumber,
            recDate: professorData.recDate,
            profImage: imageUrl,
          })
        );
        console.log('sendProfData 이미지url 확인 : ', imageUrl)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendHistory = (historyData: History[]) => {
    const serverURL = "http://localhost:8080/undergraduate_student/write";
    // console.log('axios 확인(historyArr) : ', historyArr)
    // console.log('axios 확인(redux history) : ', profHistory)
    console.log('axios 확인 historyData : ', historyData)
    axios
      .post(serverURL, historyData)
      .then((res) => {
        console.log(res.data);
        dispatch(
          addProfHistory({
            Date: history.Date,
            Content: history.Content,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleComplete = async () => {
    try {
      // 이미지 업로드
      const imageUrl = await handleImageUpload();
  
      // 이미지 업로드가 성공한 경우에만 교수 정보 데이터 전송
      if (imageUrl) {
        // 교수 정보 데이터 전송
        sendProfessorData({ ...professorData, profImage: imageUrl });
        
        // 히스토리 데이터 전송
        sendHistory(historyArr);
        
        // 페이지 이동
        navigate("/research");
      } else {
        console.log("이미지 업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className={styles.add_professor_container}>
        <div className={styles.add_professor_profile}>
          <div className={styles.add_professor_profile_top}>
            <div className={styles.add_professor_picture}>
              {image ? (
                <label htmlFor="inputTag">
                  <img
                    src={typeof image === "string" ? image : undefined}
                    alt={imageName || "Image Description"}
                  ></img>
                </label>
              ) : (
                <label htmlFor="inputTag">
                  <p>이미지 삽입</p>
                </label>
              )}
              <input
                type="file"
                id="inputTag"
                className={styles.image_input}
                onChange={handleImageChange}
              />
            </div>
            <button onClick={handleImageUpload}>이미지 등록하기</button>
          </div>

          <div className={styles.add_professor_profile_bottom}>
            {inputFields.map((field, index) => (
              <InputProfessor
                key={index}
                placeholder={field.placeholder}
                name={field.name}
                onChange={(e) => handleInputProfessorChange(e, field.name)}
                styles={styles}
              />
            ))}
            <button
              onClick={handleComplete}
            >완료</button>
          </div>
        </div>

        <div className={styles.add_professor_history}>
          <div style={{ height: "400px" }}>
            {historyArr.map((value: any, index: any) => {
              return (
                <div key={index}>
                  <div className={styles.history_content}>
                    <p style={{ width: "90px" }} key={index}>
                      {value.Date}{" "}
                    </p>
                    <p>{value.Content}</p>
                  </div>
                  <div className={styles.line}></div>
                </div>
              );
            })}
          </div>
          <div className={styles.history_bottom}>
            <input
              type="date"
              className={styles.input_date}
              onChange={(e) => handleInputHistoryChange(e, "Date")}
            />
            <input
              className={styles.history_input}
              placeholder="입력"
              onChange={(e) => handleInputHistoryChange(e, "Content")}
            />
            <div>
              <button
                className={styles.input_button}
                onClick={(e) => {
                  //임시로 넣은 dispatch, 성공 시 뺄 예정
                  dispatch(
                    addProfHistory({
                      Date: history.Date,
                      Content: history.Content,
                    })
                  );
                  let copy = [...historyArr];
                  copy.push(history);
                  setHistoryArr(copy);
                  console.log('이거는 히스토리어레이 state : ', historyArr)
                }}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.add_professor_project}></div>
    </div>
  );
}

export default AddProfessor;
