import React from 'react'
import '../../styles/MypageTab.css'

export default function LikeList() {
  return (
    <div className="write_list_con">
    <div className='top'>
      <p>게시판</p>
      <p>제목</p>
      <p>등록일</p>
    </div>
    <div className='write_list'>
      <div className='글임'>
        <p>관심한</p>
        <div className='write_line'/>
      </div>
      <div className='글임'>
        <p>글목록</p>
        <div className='write_line'/>
      </div>
      <div className='글임'>
        <p>임</p>
        <div className='write_line'/>
      </div>
    </div>
  </div>
  )
}
