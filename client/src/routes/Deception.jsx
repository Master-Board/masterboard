import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
<<<<<<< HEAD

const ENDPOINT = 'http://localhost:5000';
const socket = io(ENDPOINT);

=======
const socket = io.connect('http://localhost:3001');
// let socket
>>>>>>> 6d8f13051b49e643d4ddd371e5b827712d314c52
function Deception(props) {

  const [user, setUser] = useState('');
  const [users, setUsers] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{msg_sender: "형진", msg_content: "hi"}, {msg_sender: "형진", msg_content: "hello"}]);
  const { roomNumber } = useParams();
<<<<<<< HEAD
  
=======


  // const ENDPOINT = "http://ec2-13-125-172-64.ap-northeast-2.compute.amazonaws.com:3000/";
//const ENDPOINT = "http://localhost:3001/";
  


>>>>>>> 6d8f13051b49e643d4ddd371e5b827712d314c52
  useEffect(() => {
    setUser(props.user.id);
    setRoom(roomNumber);

<<<<<<< HEAD
    console.log(socket)
=======
    // socket = io.connect(ENDPOINT);
    console.log(socket)

    // socket.emit("connection", (e) => {
    //   console.log(e);
    // });
>>>>>>> 6d8f13051b49e643d4ddd371e5b827712d314c52

    socket.emit("joindeception", {room});
    
  }, []);

  // useEffect(() => {
    // 메세지 받기
    socket.on("chatting", (data) => {
      console.log(data);
      setMessages([...messages, data]);
    });

  // }, [messages]);

  const sendMessage = () => {
    if(message) {
      console.log(message);
      socket.emit("chatting", {message});
    }
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
                <div>{data.msg_sender} : {data.msg_content}</div>
              </div>
            ))}
          </div>
          <input type="text" placeholder="메세지를 입력하세요" onChange={(e)=>setMessage({name: user, message: e.target.value, room: room})} />
          <button onClick={(e)=>{
            e.preventDefault();
            sendMessage();
          }}>send</button>
        </div>
      </div>
    );
  }
  
  export default Deception;
