import React, { useState } from 'react'
import '../styles/MypageModal.css'
import { CgCloseO } from "react-icons/cg";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface MypageModalProps {
    isOpen: boolean,
    onClose: () => void;
}
export default function MypageModal({isOpen, onClose}: MypageModalProps) {
  const user = useSelector((state: RootState) => state.user); // state 타입은 RootState로 가정
  const receivedToken = localStorage.getItem('accessToken')


  let navigate = useNavigate();
  // 이미지 선택
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  let imageUrl = user.userimage;

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
      console.log("imageUrl : ", imageUrl);
      return imageUrl;
    } catch (err) {
      console.log(err);
    }
  };

  //사용자 정보 수정
  const [userInfo, setUserInfo] = useState({
    usermajor: user.usermajor,
    userphone: user.userphone,
    userimage:  imageUrl,
    useremail: user.useremail,
    usertype: user.usertype,
    usercollege: user.usercollege,
    username: user.username,
  })

  const handleInputUserChange = (e: any, field: string) => {
    setUserInfo({ ...userInfo, [field]: e.target.value });
  };

  const putUserInfo = async () => {
    const res = await axios.put("http://localhost:8080/profile/api/edit", userInfo, {
      headers: {
        Authorization: `Bearer ${receivedToken}`,
      },
    });
    try {
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // 탈퇴 경고창
  const deleteUser = async () => {
    const res = axios.delete('http://localhost:8080/profile/api/withdrawal', {
      headers: {
        Authorization : `Bearer ${receivedToken}`
      }
    })
    try {
      localStorage.clear();
      console.log(res);
      navigate('/');
    } catch(err) {
      console.log(err)
    }
  }

  const onDeleteClick = () => {
    if (window.confirm("정말 탈퇴하시겠어요?")) {
      alert('탈퇴가 완료되었습니다.')
      deleteUser();
    }
  }


  if(!isOpen) return null;
  return (
    <div className='modalBackground'>
      <div className='modalBox'>
        <div className='topButton'>
          <CgCloseO size="50" style={{cursor:'pointer'}} onClick={onClose}/>
        </div>
        <div className='content'>
          <div className='contentLeft'>
            {image ? (
              <img src={typeof image === "string" ? image : undefined} alt='프사'/>
            ) : (
              <img src={user.userimage} alt='프사'/>
            )}
            <label htmlFor='imgFile'>프로필 사진 바꾸기</label>
            <input id='imgFile' 
              type='file' 
              style={{display:'none'}}
              onChange={handleImageChange}
            />
            <button onClick={handleImageUpload}>이미지 등록하기</button>
          </div>
          <div className='contentRight'>
            <input placeholder='이름' defaultValue={user.username}
            onChange={(e) => handleInputUserChange(e, 'username')}/>
            <input placeholder='단과대' defaultValue={user.usercollege}
            onChange={(e) => handleInputUserChange(e, 'usercollege')}/>
            <input placeholder='학과' defaultValue={user.usermajor}
            onChange={(e) => handleInputUserChange(e, 'usermajor')}/>
            <input placeholder='연락처' defaultValue={user.userphone}
            onChange={(e) => handleInputUserChange(e, 'userphone')}/>
          </div>
        </div>
        <div className='buttonBox'>
          <button className='secessionButton'
          onClick={onDeleteClick}>탈퇴</button>
          <button className='editButton'
          onClick={() => {
            putUserInfo();
            onClose();
          }}>수정</button>
        </div>
      </div>
    </div>
  )
}

