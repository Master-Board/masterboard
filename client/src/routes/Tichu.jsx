import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import { Link, useParams } from "react-router-dom";

let socket;

function Tichu(props) {

  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');
  const { roomNumber } = useParams();

  const ENDPOINT = "http://localhost:3000";

  useEffect(() => {
    setUser(props.user.id);
    setRoom(roomNumber);
    // socket.io(ENDPOINT);

    console.log(user, room);

    // socket.emit("join", { user, room }, (error) => {
    //   console.log(error);
    // });


    
  }, []);

  const Disconnect = () => {
    socket.emit("disconnect", () => {
      console.log('user disconnected');
    })
  }

    return (
      <div id="tichu" style={{background: 'url("img/background.webp")', backgroundSize: 'cover'}}>
        {user}님 어서오세요! #{room} 티츄 방입니다
        <button onClick={Disconnect}><Link to="/mainpage">나가기</Link></button>
      </div>
    );
  }
  
  export default Tichu;