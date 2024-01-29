import { useState } from 'react'
import Mynavbar from '../components/navbar'


function Mypage() {
  
  let [tab, setTab] = useState(0) // 일단 임시로 state, redux 설치하면 CreateSlice 사용 예정
  
  return (
    <div>
      <div className='mypage_container'>
        <div className='mypage_profile'> 
          <div className='mypage_picture'>
            <img src="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/mac.svg" alt="프사"></img>
          </div>
          <div>
            <p>홍길동</p>
            <p>abcdefg@khu.ac.kr</p>
            <p>010-1234-1234</p>
            <p>소프트웨어융합대학</p>
            <p>컴퓨터공학부 컴퓨터공학과</p>
          </div>
            <button className='mypage_button'>수정</button>
        </div>
        <div className='mypage_content'> 
          <div className='button_container'>
            <button className='content_button'>작성한 글 목록</button>
            <button className='content_button'>관심한 글 목록</button>
            <button className='content_button'>지원한 프로젝트</button>
          </div>
          <Tab />
          {/* <Tab tab={tab}></Tab> // 'Tab' cannot be used as a JSX component. 이 오류를 고치기 위해서는 react의 버전을 낮춰야 한다고 하는데.. */}
        </div>

      </div>
        <div className='mypage_portfolio'> </div>
    </div>
    
  )
}

function Tab() {
  // if (props.tab == 0) {
      return (
        <div>
          <div className='content'>
            <div className='janghak_list'>
              <div className='janghak_thick_line'></div>
              <div className='janghak_title'>
                <div className='janghak_text1'>게시판</div>
                <div className='janghak_text1'>제목</div>
                <div className='janghak_text1'>등록일</div>
              </div>
              <div className='janghak_thin_line'></div>
            </div>
          </div>
        </div>
      )
    // }
}

export default Mypage
