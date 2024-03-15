import React, { useState } from 'react';
import logo from './logo.svg';
import '../styles/App.css';
import Mynavbar from '../components/navbar';
import Prev_next from '../components/prev_next';
import J_List from '../pages/J_List';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Detail from '../pages/Detail';
import P_List_add_design from '../pages/P_List_add_design';
import P_calendar from '../components/calendar';
import P_List from '../pages/P_List';

function Routing() {
  
  const [value, onChange] = useState(new Date());
  return (
    
      <Routes>
        <Route path="/" element={<Mynavbar/>}></Route>
        <Route path="/calendar" element={<P_calendar onChange={onChange} value={value}></P_calendar>}></Route>
        <Route path="/scholarship" element={<J_List/>}></Route>
        <Route path="/scholarship/:key/:page" element={<Detail />} />

        <Route path="/project" element={<P_List />} />
        <Route path="/project/detail/:id" element={<Detail />} />
        <Route path="/project/write" element={<P_List_add_design/>}/>
        <Route path="/project/:key/:page" element={ <P_List/> }/>
      </Routes>
    
  );
}

export default Routing;
