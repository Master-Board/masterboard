import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import DeceptionUser from './DeceptionUser';

const ENDPOINT = 'http://localhost:5000';
const socket = io(ENDPOINT);

function Deception(props) {

  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');
  const [chatting, setChatting] = useState(false);
  const [message, setMessage] = useState('');
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([{name: "형진", message: "hi"}, {name: "형진", message: "hello"}]);
  const { roomNumber } = useParams();
  let userIndex=1;

  const [users, setUsers] = useState([{name: "창현", blue: [12, 42, 53, 13], red: [2, 43, 25, 83]}, {name: "형진", blue: [54, 62, 11, 40], red: [1, 3, 4, 5]}, {name: "민호", blue: [6, 7, 8, 9], red: [6, 7, 8, 9]}, {name: "철", blue: [10, 11, 12, 13], red: [14, 15, 16, 17]}]);
  
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
    // 유저 받기
    // socket.on("유저받기", (data) => {
    //   setUsers(data)
    // })
    for(let i = 0; i < users.length; i++){
      if(users[i].name == user) userIndex = i;
    }

  }, [users]);

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
        <button onClick={()=>setChatting(!chatting)}>채팅</button>
        <button onClick={Disconnect}><Link to="/mainpage">나가기</Link></button>
        <body style={{display: "flex", position: "relative"}}>
          {chatting === true ? 
            <div style={{width: "300px", height: "600px", border: "2px solid #111", position: "absolute", background: "#fff"}}>
              <div style={{backgroundColor: "#eee"}}>Room : {room}</div>
              <div className="messages" style={{width: "290px", height: "540px", border: "1px solid #111", overflow: "scroll"}}>
                {messages.map((data, i) => (
                  <div key={i} >
                    <div>{data.name} : {data.message}</div>
                  </div>
                ))}
              </div>
              <input type="text" placeholder="메세지를 입력하세요" onChange={(e)=>setText(e.target.value)} value={text} onKeyPress={(e)=>(e.key === "Enter" ? sendMessage() : null)} />
              <button onClick={()=>sendMessage()}>send</button>
            </div> : null}
          <div className='gameboard' style={{textAlign: "center", width: "1540px", height: "690px"}}>
            <div className='top' style={{display: "flex"}}>
              <DeceptionUser user={users[(userIndex+6)%(users.length)]}/>
              <DeceptionUser user={users[(userIndex+1)%(users.length)]}/>
              <DeceptionUser user={users[(userIndex+2)%(users.length)]}/>
              <DeceptionUser user={users[(userIndex+3)%(users.length)]}/>
              <DeceptionUser user={users[(userIndex+7)%(users.length)]}/>
            </div>
            <div className='middle' style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <DeceptionUser user={users[(userIndex+4)%(users.length)]}/>
              <div style={{width: "800px", height: "250px", margin: "0px 55px", border: "1px solid #111"}}>
                share
              </div>
              <DeceptionUser user={users[(userIndex+5)%(users.length)]}/>
            </div>
            <div className='bottom' style={{display: "flex"}}>
              <DeceptionUser user={users[(userIndex+8)%(users.length)]}/>
              <DeceptionUser user={users[(userIndex+10)%(users.length)]}/>
              <DeceptionUser user={users[userIndex]}/>
              <DeceptionUser user={users[(userIndex+11)%(users.length)]}/>
              <DeceptionUser user={users[(userIndex+9)%(users.length)]}/>
            </div>
          </div>
        </body>
      </div>
    );
  }
  
  export default Deception;