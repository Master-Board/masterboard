import React from 'react';
import { useParams } from "react-router-dom";

function Parade(props) {

  const { roomNumber } = useParams();

    return (
      <div id="parade" style={{background: 'url("img/background.webp")', backgroundSize: 'cover', width: '100%', height: '100%'}}>
        {props.user.id}님 어서오세요! #{roomNumber} 퍼레이드 방입니다
      </div>
    );
  }
  
  export default Parade;