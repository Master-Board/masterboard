import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import DeceptionUser from './DeceptionUser';
import GodChooseModal from './GodChooseModal';
import MurdererChooseModal from './MurdererChooseModal';

let socket;

function Deception(props) {

  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');
  const [myJob, setMyJob] = useState('');
  const [chatting, setChatting] = useState(false);
  const [message, setMessage] = useState('');
  const [text, setText] = useState('');
  const [broadcast, setBroadcast] = useState('살인자가 선택중입니다');
  const [messages, setMessages] = useState([{name: "형진", message: "hi"}, {name: "형진", message: "hello"}]);
  const [minutes, setMinutes] = useState(2)
  const [seconds, setSeconds] = useState(30)
  const [timer, setTimer] = useState(false)
  const [answer, setAnswer] = useState({blue: '', red: ''});
  const [godChoice, setGodChoice] = useState({});
  const [showGodChoose, setShowGodChoose] = useState(false);
  const [showMurdererChoose, setShowMurdererChoose] = useState(false);
  const { roomNumber } = useParams();
  let userIndex=1;

  const [users, setUsers] = useState([{name: "창현", job: null, blue: [12, 42, 53, 13], red: [2, 43, 25, 83]}, {name: "형진", job: null, blue: [54, 62, 11, 40], red: [1, 3, 4, 5]}, {name: "민호", job: null, blue: [6, 7, 8, 9], red: [6, 7, 8, 9]}, {name: "박철", job: null, blue: [10, 11, 12, 13], red: [14, 15, 16, 17]}]);
  const cause = ['질식', '중상', '과다출혈', '질병', '독살', '사고사']
  const place = [['놀이터', '교실', '기숙사', '구내식당', '엘리베이터', '공중화잘실'], ['거실', '침실', '창고', '화장실', '부엌', '발코니'], ['별장', '공원', '슈퍼마켓', '학교', '숲속', '은행']]
  const hint = [{title: '피해자의 신체특성', content: ['큰 체격', '마름', '키가 큼', '키가 작음', '장애가 있음', '보통의 체격']}, 
                {title: '현장에 남겨진 흔적', content: ['지문', '발자국', '타박상', '핏자국', '체액', '흉터']},
                {title: '살인자의 성격', content: ['오만한', '비열한', '다혈질', '탐욕스러운', '강압적', '변태적']},
                {title: '발견된 단서', content: ['자연스러움', '예술적', '기록되어 있음', '인조 물질', '개연적', '관계없음']},
                {title: '범죄기간', content: ['즉각적', '단시간', '점진적', '장기적', '며칠동안', '확실하지 않음']},
                {title: '사회적 관계', content: ['가족', '친구', '동료', '고용주/종업원', '연인', '모르는 사람']},
                {title: '범죄 동기', content: ['증오', '권력', '돈', '사랑', '질투', '정의']},
                {title: '피해자의 복장상태', content: ['단정함', '지저분함', '우아함', '허름함', '독특함', '나체']},
                {title: '사망 시각', content: ['새벽', '아침', '정오', '오후', '저녁', '밤']},
                {title: '피해자의 신원', content: ['어린이', '청소년', '중년', '노인', '남성', '여성']},
                {title: '피해자의 직업', content: ['경영직', '전문직', '노동직', '학생', '무직', '은퇴']},
                {title: '날씨', content: ['맑음', '폭풍우', '건조함', '습함', '추운날씨', '더운날씨']},
                {title: '전반적인 인상', content: ['평범한', '창의적인', '수상함', '잔인함', '공포스러움', '긴장감 넘침']},
                {title: '사건 당일', content: ['평일', '주말', '봄', '여름', '가을', '겨울']},
                {title: '피해자의 표정', content: ['평온함', '힘겨워함', '겁먹음', '고통스러움', '무표정함', '화남']},
                {title: '범죄현장 상황', content: ['어질러져 있음', '잿더미', '물얼룩', '깨진 흔적', '무질서함', '정돈됨']},
                {title: '갑작스러운 사건', content: ['정전', '화재', '다툼', '금품도난', '비명', '없음']},
                {title: '시체의 상태', content: ['온기가 남아있음', '경직됨', '부패함', '훼손됨', '온전함', '뒤틀림']},
                {title: '범행 시 상황', content: ['여가중', '휴가중', '회의중', '거래중', '방문중', '식사중']},
                {title: '시체에서의 단서', content: ['머리', '가슴', '손', '다리', '일부분', '전체적']}]
  
  const handleCloseGodChoose = () => setShowGodChoose(false);
  const handleShowGodChoose = () => setShowGodChoose(true);

  const handleCloseMurdererChoose = () => setShowMurdererChoose(false);
  const handleShowMurdererChoose = () => setShowMurdererChoose(true);

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
  }, [])

  // share에 정보 업데이트
  useEffect(() => {
    socket.on("godChoice", (data) => {

    })
  })

  useEffect(() => {
    for(let i = 0; i < users.length; i++){
      if(users[i].name == user) userIndex = i;
    }
  }, [users]);

  // 타이머
  useEffect(() => {
    const countdown = setInterval(() => {
      if(parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1)
      }
      if(parseInt(seconds) === 0) {
        if(parseInt(minutes) === 0) {
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
    socket.emit("deceptionLeave", {room})
  }

  const Guess = () => {
    // socket.emit("deceptionGuessAnswer", {room: room, muderer: muderer, means: blue, clue: red})
    socket.on("deceptionGuessAnswer", (data) => {
      console.log(data.answer)
    })
  }

  const startGame = async () => {
    console.log("게임시작")
    setBroadcast("게임이 시작되었습니다.")
    setMyJob(users[userIndex].job);

    //직업 정하기
    // 법의학자 god 살인자 murderer 목격자 witness 공범자 confederate
    // setTimeout(function(){ setBroadcast(`당신은 ${myJob}입니다. 살인자가 선택을 완료할때까지 기다려주세요.`) }, 2000)
    setBroadcast(`당신은 ${myJob}입니다. 살인자가 선택을 완료할때까지 기다려주세요.`)

    if(myJob == 'murderer'){ // 살인자
      setTimeout(function(){ handleShowMurdererChoose() }, 4000)
      await socket.emit("deceptionMurdererChoice", {answer})
      setBroadcast("누군가 살인을 했습니다! 법의학자가 선택을 완료할때까지 기다려주세요.")
      if(myJob == 'god'){
        handleShowGodChoose()
        await socket.emit("deceptionGodChoice", {godChoice})
      }
    }
  }

  const ready = () => {
    socket.emit("deceptionReady", {player: user, room: room})
    setBroadcast("준비완료!")
  }

  return (
      <div id="deception" style={{backgroundImage: 'url(../public/img/background.webp)', backgroundSize: 'cover'}}>
        {user}님 어서오세요! #{room} 디셉션 방입니다
        <button onClick={()=>setChatting(!chatting)}>채팅</button>
        <span>{broadcast} </span>
        <span>{minutes}:{seconds < 10? `0${seconds}` : seconds}</span>
        <button onClick={()=>handleShowGodChoose()}>준비</button>
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
                <GodChooseModal showGodChoose={showGodChoose} handleCloseGodChoose={handleCloseGodChoose} hint={hint} />
                <MurdererChooseModal showMurdererChoose={showMurdererChoose} handleCloseMurdererChoose={handleCloseMurdererChoose} user={users[userIndex]} answer={answer} setAnswer={setAnswer} />
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