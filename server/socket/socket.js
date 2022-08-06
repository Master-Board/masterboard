const Socketio = require('socket.io')
const moment = require('moment')
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
module.exports = (server) => {
    const io = Socketio(server, {
        cors: {
            origin: "*",
            credential:true
        }
    })
    io.on('connection',(socket) => {
        let clue_deck //deception
        let means_deck //deception
        let murderer = ''
        let murder_means = ''
        let murder_clue = ''
        let score

        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);
        socket.on('disconnect', () => { // 연결 종료 시
            console.log('클라이언트 접속 해제', ip, socket.id);
            clearInterval(socket.interval);
        });

        socket.on('chatting', (data) => {
            let msg_time = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
            const {name, message, room} = data.message;
            console.log('n: ',name)
            console.log('m: ',message)
            console.log('r: ',room)

            socket.emit('chatting',{
                name,
                message,
                msg_time,
            })
            console.log('emit 완료 ~!')
        })    
    
        socket.on('joinparade', (data) => {
            let room = data.room
            socket.join(room)
        })
    
        socket.on('leaveparade',(data) => {
            let room = data.room
            if (data.room != '') {
                socket.leave(room)
                console.log(room+'번 방 join 완료!')
            }
            else{
                console.log('value is empty!')
            }
        })
    
        socket.on('joindeception',(data) => {
            let room = data.room    
            console.log('data: ',data)  
            if (data.room != '') {
                socket.join(room)
                console.log(room+'번 방 join 완료!')
            }
            else{
                console.log('value is empty!')
            }
        })
    
        socket.on('leavedeception',(data) => {        
        })
    
        socket.on('initdeck',(data) => {
            let room = data.room
            clue_deck = init_cluedeck()
            means_deck = init_meansdeck()
            socket.to(room).emit('initdeck', {
                clue_deck,
                means_deck
            })
        })
    
        socket.on('drawdeck',(data) => {
            let room = data.room
            let card_count = data.card_count
        })
    
        socket.on('shuffledeck',(data) => {
            let room = data.room
    
        })
    
        socket.on('guessAnswer',(data) =>{
            let room = data.room
            let guess_murderer = data.murderer
            let guess_means = data.means
            let guess_clue = data.clue
            let anwer = ''
            if (guess_murderer == murderer && guess_means == murder_means && guess_clue == murder_clue) {
                anwer = 'right answer'
                socket.to(room).emit('guessAnswer', {
                    anwer
                })
            }
            else {
                anwer = 'wrong anwer'
                socket.to(room).emit('guessAnswer', {
                    anwer
                })
            }
        })
    })
}