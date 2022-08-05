require("dotenv").config()
const express = require("express")
const http = require("http")
const app = express()
<<<<<<< HEAD
app.set('port', process.env.POR);
const server = http.createServer(app)
const PORT = process.env.PORT
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        credential:true
    }
})
app.use(express.urlencoded({extended: true}))
const moment = require('moment')
=======
app.set('port', process.env.PORT);
const server = http.createServer(app)
const PORT = process.env.PORT
app.use(express.urlencoded({extended: true}))
>>>>>>> 6d8f13051b49e643d4ddd371e5b827712d314c52
// const api = require('./apis/apis')
// app.use("/", api)
const cors = require("cors")
app.use(cors({
    //origin: 'ec2-13-125-172-64.ap-northeast-2.compute.amazonaws.com:3000', // 출처 허용 옵션
    origin: 'localhost:3000', // 출처 허용 옵션
    credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));
<<<<<<< HEAD
function init_cluedeck(){
    let clue_deck = {}
    clue_deck[0] = '에어컨'
    clue_deck[1] = '개미'
    clue_deck[2] = '골동품'
    clue_deck[3] = '사과'
    clue_deck[4] = '반창고'
    clue_deck[5] = '브로치'
    clue_deck[6] = '지폐'
    clue_deck[7] = '종'
    clue_deck[8] = '베팅 칩'
    clue_deck[9] = '혈액'
    clue_deck[10] = '뼈'
    clue_deck[11] = '책'
    clue_deck[12] = '팔찌'
    clue_deck[13] = '빵'
    clue_deck[14] = '팬티'
    clue_deck[15] = '빗자루'
    clue_deck[16] = '총알'
    clue_deck[17] = '버튼'
    clue_deck[18] = '케이크'
    clue_deck[19] = '달력'
    clue_deck[20] = '사탕'
}
function init_meansdeck() {
    let means_deck = {}
    means_deck[0] = '알코올'
    means_deck[1] = '아메바'
    means_deck[2] = '비소(가루약물)'
    means_deck[3] = '방화'
    means_deck[4] = '도끼'
    means_deck[5] = '뾰족한 대나무'
    means_deck[6] = '방망이'
    means_deck[7] = '허리띠'
    means_deck[8] = '물기'
    means_deck[9] = '믹서기'
    means_deck[10] = '과다출혈'
    means_deck[11] = '절단기'
    means_deck[12] = '벽돌'
    means_deck[13] = '매장'
    means_deck[14] = '촛대'
    means_deck[15] = '전기톱'
    means_deck[16] = '화학물질'
    means_deck[17] = '식칼'
    means_deck[18] = '목발'
    means_deck[19] = '단도'
    means_deck[20] = '더러운 물'
}

io.on('connection',(socket) => {
    let clue_deck //deception
    let means_deck //deception
    let murderer = ''
    let murder_means = ''
    let murder_clue = ''
    let score
    
    socket.on('chatting', (data) => {
        // let msg_time = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
        // const {msg_sender, msg_content, room} = data.message;
        const msg_sender = data.message.name;
        const msg_content = data.message.message;
        const room = data.message.room;
        console.log(data.message)
        socket.to(room).emit('chatting',{
            msg_sender: msg_sender,
            msg_content: msg_content
        })
    })    

    socket.on('joinparade', (data) => {
        let room = data.room_id
        socket.join(room)
    })

    socket.on('leaveparade',(data) => {
        let room = data.room_id
        socket.leave(room)
    })

    socket.on('joindeception',(data) => {
        console.log(data)
        let room = data.room        
        socket.join(room)
    })

    socket.on('leavedeception',(data) => {        
    })

    socket.on('initdeck',(data) => {
        let room = data.room_id
        clue_deck = init_cluedeck()
        means_deck = init_meansdeck()
        socket.to(room).emit('initdeck', {
            clue_deck,
            means_deck
        })
    })

    socket.on('drawdeck',(data) => {
        let room = data.room_id
        let card_count = data.card_count
    })
=======
>>>>>>> 6d8f13051b49e643d4ddd371e5b827712d314c52


const SocketIO = require('./socket/socket.js')
SocketIO(server)


// const SocketIO = require('./socket/socket.js')
// SocketIO(server)


server.listen(PORT, () => console.log(`server is runnig ${PORT}`))