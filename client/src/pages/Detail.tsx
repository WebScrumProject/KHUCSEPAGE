import React from 'react';
import '../App.css';
import Mynavbar from '../components/navbar';
import { text } from 'stream/consumers';

//asd
function Detail() {
  return (
<div>
    <Mynavbar></Mynavbar>
    <div className="janghak_text"> 장학 </div>
    <div className="janghak_container">
      <button className='janghak_categori'> 전체 </button>
      <input className='janghak_search' type='text'/>
      <button className='janghak_icon'> 돋보기 </button>
    </div>
</div>
    
  );
}
export default Detail;