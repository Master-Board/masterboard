const Socketio = require('socket.io')
const moment = require('moment')
function swap(a,b) {
    let tmp = a
    a = b
    b = tmp
    return a,b
}
function deception_init_clueinfo(){//단서카드 정보 return
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
    return clue_deck
}
function deception_init_meansinfo() { //수단카드 정보
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
    return means_deck
}
function deception_init_card(card_count) { //실제 사용 덱 숫자 기입
    let deck = new Array(card_count)
    for(let i=0;i<card_count;i++) {
        deck[i] = i
    }
    return deck
}
function deception_init_game(c,m) { // 처음 게임 시작할 때 덱 구성
    c = deception_init_clueinfo()
    m = deception_init_meansinfo()
    clue = deception_init_card(c.length)
    clue = deception_shuffle(clue)
    means = deception_init_card(m.length)
    means = deception_shuffle(means)
    return clue,means
}
function deception_shuffle(deck) {    //실제 사용 덱 숫자 셔플
    for(let i=0; i<deck.length; i++){
        let randnum = Math.random()*20
        deck[i],deck[randnum] = swap(deck[i],deck[randnum])
    }
    return deck
}
function deception_draw_card(deck,card_count) {
    let card = []
    if(deck.length <= 0) {//사실 이 경우는 없음. 있다면 오류.
        console.log('덱이 비어있음.')
    }
    else if(deck.length ==1) {
        console.log('덱을 모두 소모하였음. 초기화 하겠음.')//사실 이 경우도 없음.
        card = deck.pop()
        deck = deception_init_card(deck.length)
        deck = deception_shuffle(deck)
        return card, deck
    }
    else {//덱에 오류가 없다면 실행
        for(let i=0;i<card_count;i++){
            card.push(deck.pop())
        }
        return card,deck
    }
}
function deception_decide_role(personnel,player) {//랜덤으로 역할 정하기
    let randnum
    let god //법의학자, 1명
    let murderer // 살인자, 1명
    let witness //목격자
    let confederate = [] //공범자
    randnum = Math.random()*personnel
    god = player[randnum]
    player.splice(randnum,1)
    personnel-=1
    randnum = Math.random()*personnel
    murderer = player[randnum]
    player.splice(randnum,1)
    personnel -=1
    if(personnel>3) {//총 인원 6명 이상
        randnum = Math.random()*personnel
        witness = player[randnum]
        player.splice(randnum,1)
        personnel-=1    
        if(personnel>=3) {//위에서 3명을 빼고 남은 인원 3 총 인원 6~7 / 공범 1
            randnum = Math.random()*personnel
            confederate.push(player[randnum])
            player.splice(randnum,1)
            personnel-=1
        }
        else if(personnel>=5) {//총 인원 8~9 / 공범 2
            for(let i=0;i<2;i++){
                randnum = Math.random()*personnel
                confederate.push(player[randnum])
                player.splice(randnum,1)
                personnel-=1
            }
        }
        else if(personnel==7) {//총 인원 10 / 공범 3
            for(let i=0;i<3;i++){
                randnum = Math.random()*personnel
                confederate.push(player[randnum])
                player.splice(randnum,1)
                personnel-=1
            }
        }
        else {//인원초과.
        }
    }
    return god, murderer, witness, confederate
}
module.exports = (server) => {
    const io = Socketio(server, {
        cors: {
            origin: "*",
            credential:true
        }
    })
    io.on('connection',(socket) => {
        let clue_deck //deception의 단서카드 정보 ex) 사용자의 단서카드 값 = 4라면 clue_deck의 5번째 정보를 참조하면 됨.
        let means_deck //deception 수단카드 정보. 위와 마찬가지.
        let clue // deception에 실제 사용되는 단서카드
        let means // deception에 실제 사용되는 단서카드
        let murderer //살인자 플레이어 닉네임 혹은 번호
        let murder_means // 살인자 수단카드 번호
        let murder_clue //살인자 단서카드 번호
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
                console.log(room+'번 방 leave 완료!')
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
            let room = data.room
            if (data.room != '') {
                socket.leave(room)
                console.log(room+'번 방 leave 완료!')
            }
            else{
                console.log('value is empty!')
            }    
        })
    
        socket.on('deceptionStart',(data) => {//게임 시작(카드 덱 설정)
            let room = data.room
            let message = '게임시작!'
            clue_deck, means_deck = deception_init_game()
            socket.to(room).emit('deceptionStart', {message})
        })

        socket.on('deceptionDecideRoles',(data) => { //플레이어 정보(번호나 닉네임)을 전달받고 역할 정해서 리턴
            const {personnel,player} = data
            let murderer
            let god //법의학자를 '신'이라고 칭하겠음.
            let confederate = [] //공범
            let witness //목격자
            god, murderer, witness, confederate = deception_decide_role(personnel,player)
            socket.to(room).emit('deceptionDraw',{//특수직업만 반환. 나머지는 수사관
                god, murderer, witness, confederate
            })
        })
    
        socket.on('dceptionDraw',(data) => { //처음 카드 뽑을 때
            const{room, card_count} = data
            let player_clue
            let player_means
            clue,player_clue = deception_draw_card(clue,card_count)
            means,player_means = deception_draw_card(means,card_count)
            socket.to(room).emit('deceptionDraw',{
                player_clue, player_means
            })
        })

        socket.on('deceptionTime',(data)=>{ //시간 증감 고민중.
            const{roon, time} = data

        })
    
        socket.on('deceptionGuessAnswer',(data) =>{ //최후의 추리
            let room = data.room
            let guess_murderer = data.murderer
            let guess_means = data.means
            let guess_clue = data.clue
            let anwer
            if (guess_murderer == murderer && guess_means == murder_means && guess_clue == murder_clue) {
                anwer = 'right answer'
                socket.to(room).emit('deceptionGuessAnswer', {anwer})
            }
            else {
                anwer = 'wrong anwer'
                socket.to(room).emit('deceptionGuessAnswer', {anwer})
            }
        })
        
    })
}
