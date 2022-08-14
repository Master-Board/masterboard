import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import DeceptionUser from './DeceptionUser';

let socket;

function Deception(props) {

  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');
  const [myJob, setMyJob] = useState('');
  const [chatting, setChatting] = useState(false);
  const [message, setMessage] = useState('');
  const [text, setText] = useState('');
  const [broadcast, setBroadcast] = useState('법의학자가 선택중입니다');
  const [messages, setMessages] = useState([{name: "형진", message: "hi"}, {name: "형진", message: "hello"}]);
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const { roomNumber } = useParams();
  let userIndex=1;

  const [users, setUsers] = useState([{name: "민철", job: null, blue: [12, 42, 53, 13], red: [2, 43, 25, 83]}, {name: "형진", job: null, blue: [54, 62, 11, 40], red: [1, 3, 4, 5]}, {name: "민호", job: null, blue: [6, 7, 8, 9], red: [6, 7, 8, 9]}, {name: "박철", job: null, blue: [10, 11, 12, 13], red: [14, 15, 16, 17]}]);
  
  useEffect(() => {
    setUser(props.user.id);
    setRoom(roomNumber);
    const ENDPOINT = 'http://localhost:5000';
    socket = io(ENDPOINT);

    console.log(user, room);
    console.log(socket);

    socket.emit("deceptionJoin", {room});
  }, [room]);

  // 메세지 받기
  useEffect(() => {
    socket.on("chatting", (data) => {
      console.log(data)
      setMessages([...messages, data])
    });
  }, [messages]);

  // 유저정보 받기
  useEffect(() => {
    socket.on("userData", (data) => {
      setUsers(data)
    })
  }, [users])

  // 레디정보 받기
  useEffect(() => {
    socket.on("deceptionReady", (data) => {
      if(data) startGame()
    })
  }, [socket])

  useEffect(() => {
    for(let i = 0; i < users.length; i++){
      if(users[i].name == user) userIndex = i;
    }

  }, [users]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if(parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1)
      }
      if(parseInt(seconds) === 0) {
        if(parseInte(minutes) === 0) {
          clearInterval(countdown)
        }else{
          setMinutes(parseInt(minutes) - 1)
          setSeconds(59)
        }
      }
    }, 1000)
    return () => clearInterval(countdown)
  }, [minutes, seconds])

  useEffect(() => {
    setMessage({name: user, message: text, room: room});
  }, [text])

  const sendMessage = () => {
      socket.emit("chatting", {message});
      setMessages([...messages, {name: user, message: text}])
      setText('');
  };

  const Disconnect = () => {
    socket.disconnect();
  }

  const startGame = () => {
    console.log("게임시작")
    setMyJob(users[userIndex].job);
    if(myJob == 'god'){ // 법의학자

    }else if(myJob == 'murderer'){ // 살인자

    }else if(myJob == 'witness'){ // 목격자

    }else if(myJob == 'confederate'){ // 공범자

    }
  }

  const ready = () => {
    socket.emit("deceptionReady", {player: user, room: room})
  }

  return (
      <div id="deception" style={{backgroundImage: 'url(../public/img/background.webp)', backgroundSize: 'cover'}}>
        {user}님 어서오세요! #{room} 디셉션 방입니다
        <button onClick={()=>setChatting(!chatting)}>채팅</button>
        <span>{broadcast} </span>
        <span>{minutes}:{seconds < 10? `0${seconds}` : seconds}</span>
        {/* <button onClick={()=>ready}>준비</button> */}
        <button onClick={Disconnect}><Link to="/mainpage">나가기</Link></button>
        <div style={{display: "flex", position: "relative"}}>
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
              {users.length<7? <DeceptionUser user={null}/> : <DeceptionUser user={users[(userIndex+6)%(users.length)]}/>}
              <DeceptionUser user={users[(userIndex+1)%(users.length)]}/>
              <DeceptionUser user={users[(userIndex+2)%(users.length)]}/>
              <DeceptionUser user={users[(userIndex+3)%(users.length)]}/>
              {users.length<8? <DeceptionUser user={null}/> : <DeceptionUser user={users[(userIndex+7)%(users.length)]}/>}
            </div>
            <div className='middle' style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              {users.length<5? <DeceptionUser user={null}/> : <DeceptionUser user={users[(userIndex+4)%(users.length)]}/>}
              <div style={{width: "800px", height: "250px", margin: "0px 55px", border: "1px solid #111"}}>
                share
              </div>
              {users.length<6? <DeceptionUser user={null}/> : <DeceptionUser user={users[(userIndex+5)%(users.length)]}/>}
            </div>
            <div className='bottom' style={{display: "flex"}}>
              {users.length<9? <DeceptionUser user={null}/> : <DeceptionUser user={users[(userIndex+8)%(users.length)]}/>}
              {users.length<11? <DeceptionUser user={null}/> : <DeceptionUser user={users[(userIndex+10)%(users.length)]}/>}
              <DeceptionUser user={users[userIndex]}/>
              {users.length<12? <DeceptionUser user={null}/> : <DeceptionUser user={users[(userIndex+11)%(users.length)]}/>}
              {users.length<10? <DeceptionUser user={null}/> : <DeceptionUser user={users[(userIndex+9)%(users.length)]}/>}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Deception;