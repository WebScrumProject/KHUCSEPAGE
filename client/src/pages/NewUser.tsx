import React, { useState } from "react";
import "../styles/NewUser.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";


function NewUser() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [file, setFile] = useState<File>();

  const [name, setName] = useState<string>('');
  const [college, setCollege] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  let imageUrl = '';

  let navigate = useNavigate();

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
        "http://localhost:8080/register",
        formData
      );
      imageUrl = res.data;
      console.log('imageUrl : ', imageUrl)
      return imageUrl;
    } catch (err) {
      console.log(err);
    }
  };

  const registerUser = async() => {
    try {
        const res = await axios.post("http://localhost:8080/register" , 
        {
          userName: name,
          userCollege: college,
          userMajor: major,
          userPhone: phone,
          userProfile: imageUrl 
        })
        console.log(res.data);
    } catch(err) {
        console.log(err);
    }
  }
    return (
      <div className="container">
        <div className="profile_container">
          {image ? (
            <label htmlFor="input-file">
              {image && typeof image === 'string' && <img src={image} alt="Uploaded" />}
            </label>
            ) : (
            <label htmlFor="input-file">
              <div className="default_profile">이미지 삽입</div>
            </label>
            )
          }
          <input style={{display:'none'}}type="file" id="input-file" onChange={handleImageChange} />
        </div>
        <button onClick={handleImageUpload}>이미지 등록하기</button>
        <div className="input_container">
          <input placeholder="이름" onChange={(e) => {setName(e.target.value)}}></input>
          <input placeholder="단과대" onChange={(e) => {setCollege(e.target.value)}}></input>
          <input placeholder="학과" onChange={(e) => {setMajor(e.target.value)}}></input>
          <input placeholder="연락처" onChange={(e) => {setPhone(e.target.value)}}></input>
        </div>
        <div className="button_container">
          <button onClick={() => navigate(-1)}>뒤로 가기</button>
          <button onClick={registerUser}>가입하기</button>
        </div>
      </div>
    )
}
export default NewUser
