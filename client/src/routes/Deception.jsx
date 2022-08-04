import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
const socket = io.connect('http://localhost:3001');
// let socket
function Deception(props) {

  const [user, setUser] = useState('');
  const [users, setUsers] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{name: "형진", message: "hi"}, {name: "형진", message: "hello"}]);
  const { roomNumber } = useParams();


  // const ENDPOINT = "http://ec2-13-125-172-64.ap-northeast-2.compute.amazonaws.com:3000/";
//const ENDPOINT = "http://localhost:3001/";
  


  useEffect(() => {
    setUser(props.user.id);
    setRoom(roomNumber);
    console.log(user, room);

    // socket = io.connect(ENDPOINT);
    console.log(socket)

    // socket.emit("connection", (e) => {
    //   console.log(e);
    // });

    socket.emit("joindeception", {room});
    
  }, []);

  useEffect(() => {
    // 메세지 받기
    socket.on("chatting", (message) => {
      console.log(message);
      setMessages([...messages, message]);
    });

  }, []);

  const sendMessage = () => {
    if(message) {
      console.log(message);
      socket.emit("chatting", {message});
    }
  };

  const Disconnect = () => {
    socket.emit("disconnect", (user) => {
      console.log('user disconnected');
    })
  }

  return (
      <div id="deception" style={{background: 'url("img/background.webp")', backgroundSize: 'cover', width: '100%', height: '100%'}}>
        {user}님 어서오세요! #{room} 디셉션 방입니다
        <button onClick={Disconnect}><Link to="/mainpage">나가기</Link></button>
        <div style={{width: "300px", height: "600px", border: "2px solid #111"}}>
          <div style={{backgroundColor: "#eee"}}>Room : {room}</div>
          <div className="messages" style={{width: "290px", height: "540px", border: "1px solid #111"}}>
            {messages.map((message, i) => (
              <div key={i} >
                <div>{message.name} : {message.message}</div>
              </div>
            ))}
          </div>
          <input type="text" placeholder="메세지를 입력하세요" onChange={(e)=>setMessage({name: user, message: e.target.value})} />
          <button onClick={(e)=>{
            e.preventDefault();
            console.log(message);
            setMessage({name: user, message: e.target.value});
            sendMessage();
          }}>send</button>
        </div>
      </div>
    );
  }
  
  export default Deception;
