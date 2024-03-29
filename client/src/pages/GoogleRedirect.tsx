import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleRedirect() {
  const code = new URL(window.location.href).searchParams.get("authCode");

  let navigate = useNavigate();

  const fetchGoogleData = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/login/api/auth/google?authCode=${code}`,
        {}
      );
      const receivedToken = res.data;
      localStorage.setItem("accessToken", receivedToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGoogleData();
  }, []);

  return <h2> 로그인 중입니다...</h2>;
}
