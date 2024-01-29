import React from 'react'
import '../styles/App.css'
import Mynavbar from '../components/navbar';
import Detail from '../pages/Detail';
import Mypage from '../pages/mypage'
import NewUser from '../pages/NewUser'
import Research from '../pages/Research'
import AddProfessor from '../pages/AddProfessor';
import UndergraduateStudentDetail from '../pages/UndergraduateStudentDetail'
import { Route, Routes } from 'react-router-dom';

export default function Routing() {
  return (
    <div>
      <Routes>  
        <Route path='/mypage' element={<Mypage></Mypage>} />
        <Route path='/newuser' element={<NewUser></NewUser>} />
        <Route path='/research' element={<Research></Research>} />
        <Route path='/addProfessor' element={<AddProfessor></AddProfessor>} />
        <Route path='/detail' element={<UndergraduateStudentDetail></UndergraduateStudentDetail>} />
        {/* <Route path='/detail/:id' element={<UndergraduateStudentDetail></UndergraduateStudentDetail>} /> */}
      </Routes>
    </div>
  )
}