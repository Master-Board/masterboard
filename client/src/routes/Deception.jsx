import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import DeceptionUser from './DeceptionUser';
import GodChooseModal from './GodChooseModal';
import MurdererChooseModal from './MurdererChooseModal';

let socket;

function Deception(props) {

  const { roomNumber } = useParams();
  const [user, setUser] = useState(props.user.id);
  const [room, setRoom] = useState(roomNumber);
  const [chatting, setChatting] = useState(false);
  const [message, setMessage] = useState('');
  const [text, setText] = useState('');
  const [broadcast, setBroadcast] = useState('어서오세요!');
  const [messages, setMessages] = useState([]);
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [timer, setTimer] = useState(false)
  const [answer, setAnswer] = useState({means: '', clue: ''});
  const [godChoice, setGodChoice] = useState({godCause: '', godPlace: '', godHint: [{title: '', content: ''}, {title: '', content: ''}, {title: '', content: ''}, {title: '', content: ''}]});
  const [showGodChoose, setShowGodChoose] = useState(false);
  const [showMurdererChoose, setShowMurdererChoose] = useState(false);
  const [placeIndex, setPlaceIndex] = useState(0);
  const [hintIndex, setHintIndex] = useState([0, 0, 0, 0])
  const [gameAnswer, setGameAnswer] = useState({user: null, means: null, clue: null})
  const users = useRef({})
  const userIndex = useRef(-1)
  const myJob = useRef('수사관')
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), [])
  

  const cause = ['질식', '중상', '과다출혈', '질병', '독살', '사고사']
  const place = [['놀이터', '교실', '기숙사', '구내식당', '엘리베이터', '공중화장실'], ['거실', '침실', '창고', '화장실', '부엌', '발코니'], ['별장', '공원', '슈퍼마켓', '학교', '숲속', '은행'], ['호프집', '서점', '식당', '호텔', '병원', '건설 현장']]
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
    const ENDPOINT = 'http://localhost:5000';
    socket = io(ENDPOINT);
  }, []);

  // 입장
  useEffect(() => {
    socket.emit("deceptionJoin", {room: roomNumber, name: props.user.id});
  }, [room])

  // 레디전 유저정보 받기
  useEffect(() => {
    socket.on("deceptionJoin", (data) => {
      console.log(data.deception_player)
      users.current = data.deception_player
      console.log(users.current.length)
      for(let i = 0; i < users.current.length; i++){
        if(users.current[i].name == user) {
          userIndex.current = i
          console.log(userIndex.current)
          forceUpdate()
          break
        }
      }
    })
  })

  // 메세지 받기
  useEffect(() => {
    socket.on("chatting", (data) => {
      console.log(data)
      console.log([...messages,data])
      setMessages([...messages, data])
    });
  }, [messages]);

  useEffect(() => {
    setMessage({name: user, message: text, room: room});
  }, [text])

  // 레디정보 받기
  useEffect(() => {
    socket.on("deceptionReady", (data) => {
      if(data.ready) {
        socket.emit("deceptionStart", {room: room, card_count: 4})
      }
    })
  }, [])

  // 유저정보 받기 & 시작
  useEffect(() => {
    socket.on("deceptionStart", (data) => {
      users.current = data.deception_player
      for(let i = 0; i < users.current.length; i++){
        if(users.current[i].name == user) {
          userIndex.current = i
          forceUpdate()
          break
        }
      }
      startGame()
    })
  }, [])

  // 가운데에 정보 업데이트
  useEffect(() => {
    socket.on("deceptionGodChoice", (data) => {
      setGodChoice(data)
      // 장소
      for(let i = 0; i < place.length; i++){
        if(place[i].includes(godChoice.godPlace)){
          setPlaceIndex(i)
        }
      }
      // 현장
      for(let i = 0; i < 4; i++){
        for(let j = 0; j < hint.length; j++){
          if(hint[j].title == godChoice.godHint[i].title){
            let copy = hintIndex;
            copy[i] = j;
            setHintIndex(copy);
            console.log(hintIndex)
          }
        }
      }
    })
  }, [])

  useEffect(() => {
    socket.on("deceptionMurdererChoice", (data) => {
      let copy = gameAnswer;
      copy.user = data.user
      copy.means = data.means
      copy.clue = data.clue
      setGameAnswer(copy)
      console.log(gameAnswer)
      godChoiceFunc()
    })
  }, [])

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

  const sendMessage = () => {
      socket.emit("chatting", {message});
      setMessages([...messages, {name: user, message: text}])
      setText('');
  };  

  const Guess = () => {
    // socket.emit("deceptionGuessAnswer", {room: room, muderer: muderer, means: blue, clue: red})
    socket.on("deceptionGuessAnswer", (data) => {
      console.log(data.answer)
    })
  }

  const ready = () => {
    socket.emit("deceptionReady", {user: user, room: room})
    setBroadcast("준비완료!")
  }

  const godChoiceFunc = () => {
    setBroadcast("누군가 살인을 했습니다! 법의학자가 선택을 완료할때까지 기다려주세요.")
      if(myJob.current == '법의학자'){
        handleShowGodChoose()
      }
  }

  const startGame = async () => {
    console.log("게임시작")
    setBroadcast("게임이 시작되었습니다.")
    myJob.current = users.current[userIndex.current].job
    setBroadcast(`당신은 ${myJob.current}입니다. 살인자가 선택을 완료할때까지 기다려주세요.`)

    if(myJob.current == '살인자'){ 
      handleShowMurdererChoose()
      // setTimeout(function(){ handleShowMurdererChoose() }, 4000)
    }
  }

  const Disconnect = () => {
    socket.emit("deceptionLeave", {user: user, room: room})
  }

  return (
      <div id="deception" style={{backgroundImage: 'url(../public/img/background.webp)', backgroundSize: 'cover', position: 'relative'}}>
        <img src={require(`../img/background.webp`)} style={{display: "block", width: "1540px", height: "720px"}} />
        <div style={{position: "absolute", left: '0px', top: '0px'}}>
          {user}님 어서오세요! #{room} 디셉션 방입니다
          <button onClick={()=>setChatting(!chatting)}>채팅</button>
          <span>{broadcast} </span>
          <span>{minutes}:{seconds < 10? `0${seconds}` : seconds}</span>
          <button onClick={()=>ready()}>준비</button>
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
                <input type="text" placeholder="메세지를 입력하세요" onChange={(e)=>{
                  e.preventDefault()
                  setText(e.target.value)
                  }} value={text} onKeyPress={(e)=>(e.key === "Enter" ? sendMessage() : null)} />
                <button onClick={()=>sendMessage()}>send</button>
              </div> : null}
            <div className='gameboard' style={{textAlign: "center", width: "1540px", height: "690px"}}>
              <div className='top' style={{display: "flex"}}>
                {users.current.length<7? <DeceptionUser user={null}/> : <DeceptionUser user={users.current[(userIndex.current+6)%(users.current.length)]}/>}
                {users.current.length<2? <DeceptionUser user={null}/> : <DeceptionUser user={users.current[(userIndex.current+1)%(users.current.length)]}/>}
                {users.current.length<3? <DeceptionUser user={null}/> : <DeceptionUser user={users.current[(userIndex.current+2)%(users.current.length)]}/>}
                {users.current.length<4? <DeceptionUser user={null}/> : <DeceptionUser user={users.current[(userIndex.current+3)%(users.current.length)]}/>}
                {users.current.length<8? <DeceptionUser user={null}/> : <DeceptionUser user={users.current[(userIndex.current+7)%(users.current.length)]}/>}
              </div>
              <div className='middle' style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                {users.current.length<5? <DeceptionUser user={null}/> : <DeceptionUser user={users.current[(userIndex.current+4)%(users.current.length)]}/>}
                <div style={{width: "800px", height: "250px", margin: "0px 55px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <div style={{width: "110px", height: "230px", margin: "10px 10px 10px 0px", position: "relative"}}>
                    <img src={require(`../img/사인.png`)} alt="사인" width="130px" height="230px"/>
                    <img src={require(`../img/x.png`)} style={{position: "absolute", width: "15px", height: "15px", left: "25px", top: `${40+cause.indexOf(godChoice.godCause)*33.5}px`}} />
                  </div>
                  <div style={{width: "110px", height: "230px", margin: "10px 10px", position: "relative"}}>
                    <img src={require(`../img/장소${placeIndex}.png`)} alt="장소" width="130px" height="230px"/>
                    <img src={require(`../img/x.png`)} style={{position: "absolute", width: "15px", height: "15px", left: "25px", top: `${40+place[placeIndex].indexOf(godChoice.godPlace)*33.5}px`}} />
                  </div>
                  <div style={{width: "110px", height: "230px", margin: "10px 10px", position: "relative"}}>
                    <img src={require(`../img/현장${hintIndex[0]}.png`)} alt="현장" width="130px" height="230px"/>
                    <img src={require(`../img/x.png`)} style={{position: "absolute", width: "15px", height: "15px", left: "25px", top: `${40+hint[hintIndex[0]].content.indexOf(godChoice.godHint[0].content)*33.5}px`}} />
                  </div>
                  <div style={{width: "110px", height: "230px", margin: "10px 10px", position: "relative"}}>
                    <img src={require(`../img/현장${hintIndex[1]}.png`)} alt="현장" width="130px" height="230px"/>
                    <img src={require(`../img/x.png`)} style={{position: "absolute", width: "15px", height: "15px", left: "25px", top: `${40+hint[hintIndex[1]].content.indexOf(godChoice.godHint[1].content)*33.5}px`}} />
                  </div>
                  <div style={{width: "110px", height: "230px", margin: "10px 10px", position: "relative"}}>
                    <img src={require(`../img/현장${hintIndex[2]}.png`)} alt="현장" width="130px" height="230px"/>
                    <img src={require(`../img/x.png`)} style={{position: "absolute", width: "15px", height: "15px", left: "25px", top: `${40+hint[hintIndex[2]].content.indexOf(godChoice.godHint[2].content)*33.5}px`}} />
                  </div>
                  <div style={{width: "110px", height: "230px", margin: "10px 10px", position: "relative"}}>
                    <img src={require(`../img/현장${hintIndex[3]}.png`)} alt="현장" width="130px" height="230px"/>
                    <img src={require(`../img/x.png`)} style={{position: "absolute", width: "15px", height: "15px", left: "25px", top: `${40+hint[hintIndex[3]].content.indexOf(godChoice.godHint[3].content)*33.5}px`}} />
                  </div>
                </div>
                {users.current.length<6? <DeceptionUser user={null}/> : <DeceptionUser user={users.current[(userIndex.current+5)%(users.current.length)]}/>}
              </div>
              <div className='bottom' style={{display: "flex"}}>
                {users.current.length<9? <DeceptionUser user={null}/> : <DeceptionUser user={users.current[(userIndex.current+8)%(users.current.length)]}/>}
                {users.current.length<11? <DeceptionUser user={null}/> : <DeceptionUser user={users.current[(userIndex.current+10)%(users.current.length)]}/>}
                <DeceptionUser user={users.current[userIndex.current]}/>
                {users.current.length<12? <DeceptionUser user={null}/> : <DeceptionUser user={users.current[(userIndex.current+11)%(users.current.length)]}/>}
                {users.current.length<10? <DeceptionUser user={null}/> : <DeceptionUser user={users.current[(userIndex.current+9)%(users.current.length)]}/>}
              </div>
            </div>
          </div>
          <GodChooseModal showGodChoose={showGodChoose} handleCloseGodChoose={handleCloseGodChoose} hint={hint} godChoice={godChoice} setGodChoice={setGodChoice} socket={socket} />
          <MurdererChooseModal showMurdererChoose={showMurdererChoose} handleCloseMurdererChoose={handleCloseMurdererChoose} user={users.current[userIndex.current]} answer={answer} setAnswer={setAnswer} godChoiceFunc={godChoiceFunc} socket={socket} room={room} />
        </div>
      </div>
    );
  }
  
  export default Deception;