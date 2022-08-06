import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:5000';
const socket = io(ENDPOINT);

function Deception(props) {

  const [user, setUser] = useState('');
  const [users, setUsers] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([{name: "형진", message: "hi"}, {name: "형진", message: "hello"}]);
  const { roomNumber } = useParams();
  
  useEffect(() => {
    setUser(props.user.id);
    setRoom(roomNumber);

    console.log(user, room);
    console.log(socket);

    socket.emit("joindeception", {room});
    
  }, [room]);

  useEffect(() => {
    // 메세지 받기
    socket.on("chatting", (data) => {
      setMessages([...messages, data]);
    });

  }, [messages]);

  useEffect(() => {
    setMessage({name: user, message: text, room: room});
  }, [text])

  const sendMessage = () => {
      socket.emit("chatting", {message});
      setText('');
  };

  const Disconnect = () => {
    socket.disconnect();
  }

  return (
      <div id="deception" style={{background: 'url("img/background.webp")', backgroundSize: 'cover', width: '100%', height: '100%'}}>
        {user}님 어서오세요! #{room} 디셉션 방입니다
        <button onClick={Disconnect}><Link to="/mainpage">나가기</Link></button>
        <div style={{width: "300px", height: "600px", border: "2px solid #111"}}>
          <div style={{backgroundColor: "#eee"}}>Room : {room}</div>
          <div className="messages" style={{width: "290px", height: "540px", border: "1px solid #111"}}>
            {messages.map((data, i) => (
              <div key={i} >
                <div>{data.name} : {data.message}</div>
              </div>
            ))}
          </div>
          <input type="text" placeholder="메세지를 입력하세요" onChange={(e)=>setText(e.target.value)} value={text} />
          <button onClick={(e)=>{
            sendMessage();
          }}>send</button>
        </div>
      </div>
    );
  }
  
  export default Deception;