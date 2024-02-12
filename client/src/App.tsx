import React, { useState } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Mynavbar from './components/navbar';
import Prev_next from './components/prev_next';
import J_List from './pages/J_List';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Detail from './pages/Detail';
import P_List_add_design from './pages/P_List_add_design';
import P_calendar from './components/calendar';
import Routing from './routes/Routes';

function App() {
  const scholarshipId = 0;
  const [value, onChange] = useState(new Date());
  return (
    
      <Routing></Routing>
    
  );
}

export default App;
