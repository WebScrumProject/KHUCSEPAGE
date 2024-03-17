import React from 'react'
import '../../styles/MypageTab.css'

export default function Project() {
  return (
    <div className="write_list_con">
      <div className='top'>
        <p>게시판</p>
        <p>제목</p>
        <p>등록일</p>
      </div>
      <div className='write_list'>
        <div className='글임'>
          <p>지원한</p>
          <div className='write_line'/>
        </div>
        <div className='글임'>
          <p>프로젝트</p>
          <div className='write_line'/>
        </div>
        <div className='글임'>
          <p>글</p>
          <div className='write_line'/>
        </div>
        <div className='글임'>
          <p>목록</p>
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
