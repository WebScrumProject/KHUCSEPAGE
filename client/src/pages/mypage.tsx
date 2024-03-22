import { useEffect, useState } from "react";
import Mynavbar from "../components/navbar";
import styles from "../styles/Mypage.module.css";
import axios from "axios";
import MypageTab from "../components/MypageTab/MypageTab";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { getUser } from "../store/user";
import MypageModal from "../components/MypageModal";

function Mypage() {
  //이 페이지를 보여주면서 mypage/api/info로 get요청을 보내면 사용자정보 전체를 준다.
  //get요청보낼때 headers:{'authorization':`Bearer ${token}} 하기
  //token은 cookie에 저장되어있다
  //페이로드 정보에는 gooleId, email, name, type이 있다

  // router.get("/profile/api/info", [isLoggedIn], mypageController.getUserDetail);
  // router.put("/profile/api/edit", [isLoggedIn], mypageController.putUserDetail);

  const user = useSelector((state: RootState) => state.user); // state 타입은 RootState로 가정
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);

  }
  const closeModal = () => {
    setIsModalOpen(false);
  }

  let dispatch = useDispatch();
  const receivedToken = localStorage.getItem("accessToken");

  const fetchUserInfo = async () => {
    const res = await axios.get("http://localhost:8080/profile/api/info", {
      headers: {
        Authorization: `Bearer ${receivedToken}`,
      },
    });
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

  const fetchUserProject = async () => {
    const res = await axios.get("http://localhost:8080/profile/api/myproject", {
      headers: {
        Authorization: `Bearer ${receivedToken}`,
      },
    });
    try {
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div>
      <div className={styles.mypage_container}>
        <div className={styles.mypage_profile}>
          <div className={styles.mypage_picture}>
            <img
              src={user.userimage}
              alt="프사"
            ></img>
          </div>
          <div>
            <p>{user.username}</p>
            <p>{user.useremail}</p>
            <p>{user.usercollege}</p>
            <p>{user.usermajor}</p>
            <p>{user.userphone}</p>
          </div>
          <button 
            className={styles.mypage_button}
            onClick={openModal}
            >수정</button>
        </div>
        <div className={styles.mypage_content}>
          <div className={styles.button_container}>
            <MypageTab />
          </div>
        </div>
      </div>
      <div className="mypage_portfolio"> </div>
      <MypageModal isOpen={isModalOpen} onClose={closeModal}/>
    </div>
  );
}

export default Mypage;
