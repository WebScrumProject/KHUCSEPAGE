import React, { useEffect, useState } from 'react'
import '../../styles/MypageTab.css'
import axios from 'axios';

export default function WriteList() {
  const receivedToken = localStorage.getItem('accessToken')

  interface Write {
    projDate: string;
    projTitle: string;
  }
  const [write, setWrite] = useState<Write[]>([])

  const fetchUserProject = async () => {
    const res = await axios.get("http://localhost:8080/profile/api/myproject", {
      headers: {
        Authorization: `Bearer ${receivedToken}`,
      },
    });
    try {
      console.log(res.data);
      setWrite(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserProject();
  }, [])

  return (
    <div className="write_list_con">
      <div className='top'>
        <p>게시판</p>
        <p>제목</p>
        <p>등록일</p>
      </div>
      <div className='write_list'>
        {write.map((value: any, index: number) => {
          return (
            <div>
             <div className='write_set'>
               <p>게시판</p>
               <p>{value.projTitle}</p>
               <p>{value.projDate}</p>
             </div>
               <div className='write_line'/>
            </div>
          )
          })
        }
      </div>
    </div>
  )
}
