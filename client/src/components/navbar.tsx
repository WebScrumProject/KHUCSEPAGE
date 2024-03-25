import React from 'react';
import '../styles/App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Mynavbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="navbar">
        <div>
          <p className="navbar_webname"> 웹이름 </p>
        </div>
        <div className="navbar_menu">
          <p className="navbar_text"> 학부 연구생</p>
          <p onClick={()=> navigate('/project')} className="navbar_text"> 팀원 모집 </p>
          <p onClick={()=> navigate('/scholarship')} className="navbar_text"> 장학 및 공모전 </p>
          <p className="navbar_text"> 동아리 공지 </p>
        </div>
         <form method="GET" action="/login">
          <button className='navbar_button'>로그인</button>
        </form> 
        
        
      </div>  
    </div>
  );
}

export default Mynavbar;