import React, { useEffect, useState } from "react";
import "../styles/App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../store/user";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function Mynavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  let receivedToken = localStorage.getItem('accessToken');
  const user = useSelector((state: RootState) => state.user);

  let navigate = useNavigate();
  let dispatch = useDispatch();
  
  const handleLoginClick = () => {
    if (!isLoggedIn) {
      console.log('로그인했다!!');
      setIsLoggedIn(true);
      // navigate('/');
    } else {
      console.log('로그아웃했다!!');
      localStorage.clear();
      setIsLoggedIn(false);
      alert('로그아웃되었습니다')
    }
  };

  const fetchUserInfo = async () => {
    let token = localStorage.getItem('accessToken');
    const res = await axios.get("http://localhost:8080/profile/api/info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(token)
    try {
      console.log(res)
      dispatch(
        getUser({
          usermajor: res.data.usermajor,
          userphone: res.data.userphone,
          userimage: res.data.userimage,
          useremail: res.data.useremail,
          usertype: res.data.usertype,
          usercollege: res.data.usercollege,
          username: res.data.username,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (receivedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false); 
    }
  }, [receivedToken]);

  useEffect(() => {
    if (receivedToken)
    fetchUserInfo()
  }, [receivedToken])

  return (
    <div>
      <div className="navbar">
        <div>
          <p className="navbar_webname"> 웹이름 </p>
        </div>
        <div className="navbar_menu">
          <p onClick={()=> navigate('/research')} className="navbar_text"> 학부 연구생</p>
          <p onClick={()=> navigate('/project')} className="navbar_text"> 팀원 모집 </p>
          <p onClick={()=> navigate('/scholarship')} className="navbar_text"> 장학 및 공모전 </p>
          <p className="navbar_text"> 동아리 공지 </p>
        </div>
          {isLoggedIn ? (
            <div className="navbar_user">
              <img src={user.userimage} alt="user" onClick={() => navigate('/mypage')}></img>
              <p>{user.username}</p>
              <form method="GET" action="/logout">
                <button className="navbar_button" onClick={handleLoginClick}>로그아웃</button>
              </form>
          </div>
          ) : (
            <form method="GET" action="/login/google">
              <button className="navbar_button" type="submit" onSubmit={handleLoginClick}>로그인</button>
            </form>
          )}
      </div>
    </div>
  );
}

export default Mynavbar;
