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
  let professor = useSelector((state: RootState) => state.professor) as any;
  let profHistory = useSelector((state: RootState) => state.profHistory) as any;

  let navigate = useNavigate();
  let dispatch = useDispatch();

  interface ProfessorData {
    _id: string;
    profName: string;
    profMajor: string;
    profPhone: string;
    profEmail: string;
    profLab: string;
    profLink: string;
    recNumber: number;
    recDate: string;
  }
  const [professorData, setProfessorData] = useState<ProfessorData>({
    _id: "",
    profName: "",
    profMajor: "",
    profPhone: "",
    profEmail: "",
    profLab: "",
    profLink: "",
    recNumber: 0,
    recDate: "",
  });

  const handleInputProfessorChange = (e: any, field: string) => {
    setProfessorData({ ...professorData, [field]: e.target.value });
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
    date: String;
    content: String;
  }
  const [history, setHistory] = useState<History>({
    date: "2000-00-00",
    content: "",
  });
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
<<<<<<< HEAD
  };
  // 서버에 이미지 파일 전송
  const handleImageUpload = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("img", file);
    }
    try {
      const imageUrl = await axios.post(
        "http://localhost:8080/undergraduate_student/image",
        formData
      );
      console.log(imageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  // axios 코드 (나중에 axios 파일 만들어서 옮길 예정)
  const sendProfessorData = (professorData: any) => {
    const serverURL = "http://localhost:8080/undergraduate_student/write";
    axios
      .post(serverURL, professorData)
      .then((res) => {
        console.log(res.data);
        dispatch(
          addProfessor({
            profId: res.data,
            profName: professorData.profName,
=======
    const [history, setHistory] = useState<History>({
      date: '2000-00-00',
      content: ''
    })
    const handleInputHistoryChange = (e: any, field: string) => {
      setHistory({ ...history, [field]: e.target.value });
    };

 
    // 이미지 파일 추가
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);


    // 이미지 선택
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file : File = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        if (file) {
          reader.readAsDataURL(file);
          setImageName(file.name);
        }
      }
    };
     // 서버에 이미지 파일 전송
    const handleImageUpload = async() => {
      const formData = new FormData();
      if (image) {
        try {
          const decodedImage = await decodeImage(image as string);
          const imageExtension = imageName ? imageName.split('.').pop() : 'defaultExtension';
          const blobImage = new Blob([decodedImage], { type: `image/${imageExtension}` });
          formData.append("imageUrl", blobImage, imageName || 'defaultName');

          const res = await axios.post('http://localhost:8080/undergraduate_student/image', formData ,{
            headers: {
              'Content-type': "application/json"
            }
          })
          console.log('이미지가 성공적으로 업로드되었습니다.', res.data);
        } catch (error) {
          console.error('이미지 업로드에 실패했습니다.', error);
        }
      } else {
        console.error('이미지 파일을 선택해주세요.');
      }
  };

    const decodeImage = async (base64Image: string) => {
      const blobImage = await fetch(base64Image).then((res) => res.blob());
      return blobImage; 
    };

  
    // axios 코드 (나중에 axios 파일 만들어서 옮길 예정)
    const sendProfessorData = (professorData: any) => {
      const serverURL = 'http://localhost:8080/undergraduate_student/write';
      axios.post(serverURL, professorData)
        .then((res) => {
          console.log(res.data);
          dispatch(addProfessor({
            profId : res.data,
            profName : professorData.profName,
>>>>>>> 85cf02f196ff57bb343ffcef6362b53bc91a10da
            profMajor: professorData.profMajor,
            profPhone: professorData.profPhone,
            profEmail: professorData.profEmail,
            profLab: professorData.profLab,
            profLink: professorData.profLink,
            recNumber: professorData.recNumber,
            recDate: professorData.recDate,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

<<<<<<< HEAD
  const sendHistory = (history: any) => {
    const serverURL = "http://localhost:8080/undergraduate_student/write";

    axios
      .post(serverURL, history)
      .then((res) => {
        console.log(res.data);
        dispatch(
          addProfHistory({
            date: history.date,
            content: history.content,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
=======
    const sendHistory = (history: any) => {
      const serverURL = 'http://localhost:8080/undergraduate_student/write';
    
      axios.post(serverURL, history)
        .then((res) => {
          console.log(res.data);
          dispatch(addProfHistory({
            date : history.date,
            content : history.content,
          }))
        })
        .catch((err) => {
          console.log(err);
        });
    };
>>>>>>> 85cf02f196ff57bb343ffcef6362b53bc91a10da

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
                  <p>룸 이미지 추가</p>
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
<<<<<<< HEAD
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
              onClick={(e) => {
                //임시로 넣은 dispatch, 성공 시 뺄 예정
                dispatch(
                  addProfessor({
                    profId: "",
                    profName: professorData.profName,
                    profMajor: professorData.profMajor,
                    profPhone: professorData.profPhone,
                    profEmail: professorData.profEmail,
                    profLab: professorData.profLab,
                    profLink: professorData.profLink,
                    recNumber: professorData.recNumber,
                    recDate: professorData.recDate,
                  })
                );
                console.log(professor);
                sendProfessorData(professorData);
                sendHistory(history);
                navigate("/research");
              }}
            >
              완료
            </button>
=======
          {
            inputFields.map((field, index) => (
            <InputProfessor
              key={index}
              placeholder={field.placeholder}
              name={field.name}
              onChange={(e) => handleInputProfessorChange(e, field.name)}
              styles={styles}
            />
            ))
            }
              <button onClick={(e) => {
              //임시로 넣은 dispatch, 성공 시 뺄 예정
                dispatch(addProfessor({
                  profId : '',
                  profName : professorData.profName,
                  profMajor: professorData.profMajor,
                  profPhone: professorData.profPhone,
                  profEmail: professorData.profEmail,
                  profLab :professorData.profLab,
                  profLink: professorData.profLink,
                  recNumber: professorData.recNumber,
                  recDate: professorData.recDate,
                }))
                console.log(professor)
                sendProfessorData(professorData)
                sendHistory(history)
                navigate('/research')
              }}>완료</button>
>>>>>>> 85cf02f196ff57bb343ffcef6362b53bc91a10da
          </div>
        </div>

        <div className={styles.add_professor_history}>
          <div style={{ height: "400px" }}>
            {profHistory.map((value: any, index: any) => {
              return (
                <div key={index}>
                  <div className={styles.history_content}>
                    <p style={{ width: "90px" }} key={index}>
                      {value.date}{" "}
                    </p>
                    <p>{value.content}</p>
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
              onChange={(e) => handleInputHistoryChange(e, "date")}
            />
            <input
              className={styles.history_input}
              placeholder="입력"
              onChange={(e) => handleInputHistoryChange(e, "content")}
            />
            <div>
              <button
                className={styles.input_button}
                onClick={(e) => {
                  //임시로 넣은 dispatch, 성공 시 뺄 예정
                  dispatch(
                    addProfHistory({
                      date: history.date,
                      content: history.content,
                    })
                  );
                  console.log(profHistory);
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
