import React from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Mynavbar from './components/navbar';
import Prev_next from './components/prev_next';

function App() {
  const scholarshipId = 0;
  return (
    <Prev_next scholarshipId = {scholarshipId}></Prev_next>
  );
}

export default App;
