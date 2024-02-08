import React from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Mynavbar from './components/navbar';
import Prev_next from './components/prev_next';
import J_List from './pages/J_List';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Detail from './pages/Detail';
import P_List_add_design from './pages/P_List_add_design';

function App() {
  const scholarshipId = 0;
  return (
    
      <Routes>
        <Route path="/" element={<Mynavbar/>}></Route>
        <Route path="/scholarship" element={<J_List/>}></Route>
        <Route path="/scholarship/:key/:page" element={<Detail />} />
        <Route path="/project/write" element={<P_List_add_design/>}/>
      </Routes>
    
  );
}

export default App;
