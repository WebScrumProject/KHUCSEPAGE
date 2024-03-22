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
