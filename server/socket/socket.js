const Socketio = require('socket.io')
const moment = require('moment')
var deception_player = []
var deception_clue_deck //deception의 단서카드 정보 ex) 사용자의 단서카드 값 = 4라면 clue_deck의 5번째 정보를 참조하면 됨.
var deception_means_deck //deception 수단카드 정보. 위와 마찬가지.
var deception_clue // deception에 실제 사용되는 단서카드
var deception_means // deception에 실제 사용되는 단서카드
var deception_murderer //살인자 플레이어 닉네임 혹은 번호
var deception_murder_means // 살인자 수단카드 번호
var deception_murder_clue //살인자 단서카드 번호
var deception_info = []
// let deception_info = [{room:0}, {deception_player: []} ,{deception_clue_deck}, {deception_means_deck}, 
// {deception_clue},{deception_means},{deception_murderer}, {deception_murder_means}, {deception_murder_clue}]
function deception_init_clueinfo(){//단서카드 정보 return
    let clue_deck = []
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
    clue_deck[20] = '선글라스'
    clue_deck[21] = '우유통'
    clue_deck[22] = '카세트 테이프'
    clue_deck[23] = '고양이'
    clue_deck[24] = '신분증'
    clue_deck[25] = '분필'
    clue_deck[26] = '담배'
    clue_deck[27] = '티슈'
    clue_deck[28] = '톱밥'
    clue_deck[29] = '세제'
    clue_deck[30] = '바퀴벌레'
    clue_deck[31] = '커피'
    clue_deck[32] = '동전'
    clue_deck[33] = '만화책'
    clue_deck[34] = '컴퓨터'
    clue_deck[35] = 'USB'
    clue_deck[36] = '키보드 마우스'
    clue_deck[37] = '밀서'
    clue_deck[38] = '마스크'
    clue_deck[39] = '천'
    clue_deck[40] = '컵'
    clue_deck[41] = '커튼'
    clue_deck[42] = '다이아몬드'
    clue_deck[43] = '틀니'
    clue_deck[44] = '다이어리'
    clue_deck[45] = '주사위'
    clue_deck[46] = '사전'
    clue_deck[47] = '비누'
    clue_deck[48] = '문서'
    clue_deck[49] = '먼지'
    clue_deck[50] = '귀걸이'
    clue_deck[51] = '달걀'
    clue_deck[52] = '전기회로'
    clue_deck[53] = '봉투'
    clue_deck[54] = '시험지'
    clue_deck[55] = '선풍기'
    clue_deck[56] = '팩스'
    clue_deck[57] = '광섬유'
    clue_deck[58] = '손톱'
    clue_deck[59] = '손전등'
    clue_deck[60] = '십자 드라이버'
    clue_deck[61] = '식재료'
    clue_deck[62] = '기어'
    clue_deck[63] = '장갑'
    clue_deck[64] = '접착제'
    clue_deck[65] = '낙서'
    clue_deck[66] = '헤어핀'
    clue_deck[67] = '옷걸이'
    clue_deck[68] = '모자'
    clue_deck[69] = '수갑'
    clue_deck[70] = '헤드셋'
    clue_deck[71] = '하이힐'
    clue_deck[72] = '모래시계'
    clue_deck[73] = '얼음'
    clue_deck[74] = '잉크'
    clue_deck[75] = '곤충'
    clue_deck[76] = '쥬스'
    clue_deck[77] = '열쇠'
    clue_deck[78] = '나뭇잎'
    clue_deck[79] = '렌즈'
    clue_deck[80] = '립스틱'
    clue_deck[81] = '러브레터'
    clue_deck[82] = '자물쇠'
    clue_deck[83] = '로또'
    clue_deck[84] = '잡지'
    clue_deck[85] = '휴대폰'
    clue_deck[86] = '거울'
    clue_deck[87] = '모기'
    clue_deck[88] = '목걸이'
    clue_deck[89] = '노트북'
    clue_deck[90] = '페인트'
    clue_deck[91] = '팬티'
    clue_deck[92] = '토끼'
    clue_deck[93] = '모래'
    clue_deck[94] = '와인'
    clue_deck[95] = '해골'
    clue_deck[96] = '스위치'
    clue_deck[97] = '문신'
    clue_deck[98] = '우산'
    clue_deck[99] = '바이올린'
    clue_deck[100] = '시계'

    return clue_deck
}
function deception_init_meansinfo() { //수단카드 정보
    let means_deck = []
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
    means_deck[21] = '절단'
    means_deck[22] = '드릴'
    means_deck[23] = '익사'
    means_deck[24] = '아령'
    means_deck[25] = '전기자전거'
    means_deck[26] = '전기 배턴'
    means_deck[27] = '감전'
    means_deck[28] = '폭발물'
    means_deck[29] = '접이식 의자'
    means_deck[30] = '화약'
    means_deck[31] = '망치'
    means_deck[32] = '갈고리'
    means_deck[33] = '스케이트화'
    means_deck[34] = '불법 마약'
    means_deck[35] = '약물 투여'
    means_deck[36] = '등유'
    means_deck[37] = '발차기'
    means_deck[38] = '나이프와 포크'
    means_deck[39] = '라이터'
    means_deck[40] = '잠긴 문'
    means_deck[41] = '마체테'
    means_deck[42] = '기계'
    means_deck[43] = '광견'
    means_deck[44] = '성냥'
    means_deck[45] = '수은'
    means_deck[46] = '쇠사슬'
    means_deck[47] = '과식'
    means_deck[48] = '포장 테이프'
    means_deck[49] = '살충제'
    means_deck[50] = '알약'
    means_deck[51] = '베개'
    means_deck[52] = '권총'
    means_deck[53] = '전염병'
    means_deck[54] = '비닐봉지'
    means_deck[55] = '독성 가스'
    means_deck[56] = '독침'
    means_deck[57] = '가루 약물'
    means_deck[58] = '화분'
    means_deck[59] = '주먹질'
    means_deck[60] = '밀기'
    means_deck[61] = '방사능'
    means_deck[62] = '광선검'
    means_deck[63] = '밧줄'
    means_deck[64] = '스카프'
    means_deck[65] = '가위'
    means_deck[66] = '조각상'
    means_deck[67] = '연기'
    means_deck[68] = '저격'
    means_deck[69] = '굶주림'
    means_deck[70] = '쇠파이프'
    means_deck[71] = '돌멩이'
    means_deck[72] = '황산'
    means_deck[73] = '수술'
    means_deck[74] = '트로피'
    means_deck[75] = '모종삽'
    means_deck[76] = '맨손'
    means_deck[77] = '독사'
    means_deck[78] = '독전갈'
    means_deck[79] = '비디오 게임기'
    means_deck[80] = '바이러스'
    means_deck[81] = '채찍'
    means_deck[82] = '낚시줄'
    means_deck[83] = '과로'
    means_deck[84] = '스패너'
    means_deck[85] = '깨물기'
    return means_deck
}
function deception_init_card(card_count) { //실제 사용 덱 숫자 기입
    let deck = []
    for(let i=0;i<card_count;i++) {
        deck[i] = i
    }
    return deck
}
function deception_shuffle(deck) {    //실제 사용 덱 숫자 셔플
    let randnum
    for(let i=0; i<deck.length; i++){
        randnum = Math.floor(Math.random()*20)
        let tmp = deck[i]
        deck[i] = deck[randnum]
        deck[randnum] = tmp
    }
    return deck
}
function deception_init_game(deception_clue_deck,deception_means_deck, deception_clue, deception_means) { // 처음 게임 시작할 때 덱 구성
    deception_clue_deck = deception_init_clueinfo()
    deception_means_deck = deception_init_meansinfo()
    deception_clue = deception_init_card(deception_clue_deck.length)
    deception_clue = deception_shuffle(deception_clue)
    deception_means = deception_init_card(deception_means_deck.length)
    deception_means = deception_shuffle(deception_means)
    return [deception_clue_deck,deception_means_deck,deception_clue,deception_means]
}
function deception_draw_card(deception_clue_deck,deception_means_deck,deception_clue,deception_means,card_count) {
    let clue = []
    let means = []
    let tmp
    for(let i=0;i<card_count;i++){
        tmp = deception_clue.pop()
        clue.push(deception_clue_deck[tmp])
        tmp = deception_means.pop()
        means.push(deception_means_deck[tmp])
    }
    return [clue, means]    
}
function deception_decide_role(personnel,deception_player) {//랜덤으로 역할 정하기
    let randnum
    let player = []
    for(let i=0;i<personnel;i++){
        player[i] = i
    }
    randnum = Math.floor(Math.random()*personnel)
    deception_player[player[randnum]].job = '법의학자'
    player.splice(randnum,1)
    personnel-=1
    randnum = Math.floor(Math.random()*personnel)
    deception_player[player[randnum]].job = '살인자'
    player.splice(randnum,1)
    personnel -=1
    if(personnel>3) {//총 인원 6명 이상
        randnum = Math.floor(Math.random()*personnel)
        deception_player[player[randnum]].job = '목격자'
        player.splice(randnum,1)
        personnel-=1    
        if(personnel>=3) {//위에서 3명을 빼고 남은 인원 3 총 인원 6~7 / 공범 1
            randnum = Math.floor(Math.random()*personnel)
            deception_player[player[randnum]].job = '공범자'
            player.splice(randnum,1)
        }
        else if(personnel>=5) {//총 인원 8~9 / 공범 2
            for(let i=0;i<2;i++){
                randnum = Math.floor(Math.random()*personnel)
                deception_player[player[randnum]].job = '공범자'
                player.splice(randnum,1)
            }
        }
        else if(personnel==7) {//총 인원 10 / 공범 3
            for(let i=0;i<3;i++){
                randnum = Math.floor(Math.random()*personnel)
                deception_player[player[randnum]].job = '공범자'
                player.splice(randnum,1)
            }
        }
        else {//인원초과.
        }
    }
    return deception_player
}
module.exports = (server) => {
    
    const io = Socketio(server, {
        cors: {
            origin: "*",
            credential:true
        }
    })
    io.on('connection',(socket) => {    
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속! ip:', ip,'socketid:', socket.id,'reqip:', req.ip);
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

            socket.broadcast.to(room).emit('chatting',{
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
    
        socket.on('deceptionJoin',(data) => {
            let {room, name} = data
            //let card_count = 4
            console.log('data: ',data)
            let player_form = {name: name, ready: false, job: '수사관', clue: [], means: []}
            if (data.room != '') {
                socket.join(room)

                console.log(room+'번 방 join 완료!')

                deception_player.push(player_form)
                //가상으로 인원 설정 test

                // player_form = {name: '형진', ready: false, job: 'detective', clue: [], means: []}
                // deception_player.push(player_form)
                // player_form = {name: '창현', ready: false, job: 'detective', clue: [], means: []}
                // deception_player.push(player_form)
                // player_form = {name: '철', ready: false, job: 'detective', clue: [], means: []}
                // deception_player.push(player_form)
                // player_form = {name: '민호', ready: false, job: 'detective', clue: [], means: []}
                // deception_player.push(player_form)
                // player_form = {name: 'JuD', ready: false, job: 'detective', clue: [], means: []}
                // deception_player.push(player_form)
                // player_form = {name: 'Looser', ready: false, job: 'detective', clue: [], means: []}
                // deception_player.push(player_form)
                // console.log('deception_player: ',deception_player)

                //ready test
                // p = deception_player.filter((e)=>{
                //     return e.name == '창현'
                // })
                // console.log('r: ',p,p[0].ready)
                

                // ready test

                //가상으로 인원 설정 test

                // start의 덱 설정 test
                // let personnel = deception_player.length
                // //console.log('personnel: ',personnel)
                // //초기 덱 설정
                // let init_deck = deception_init_game(deception_clue_deck,deception_means_deck,deception_clue,deception_means)
                // //console.log('init_deck: ',init_deck)
                // deception_clue_deck = init_deck[0]
                // deception_means_deck = init_deck[1]
                // deception_clue = init_deck[2]
                // deception_means = init_deck[3]
                // //console.log('초기 덱 설정 끝',deception_clue, deception_means)                
                // //직업정하기
                // deception_player = deception_decide_role(personnel,deception_player)
                // //카드뽑기
                // for(let i=0;i<personnel;i++) {
                //     let drawn_card = deception_draw_card(deception_clue_deck,deception_means_deck,deception_clue,deception_means,card_count)
                //     //console.log('drawn_card: ',drawn_card)
                //     deception_player[i].clue = drawn_card[0]
                //     deception_player[i].means = drawn_card[1]
                // }

                // start의 덱 설정 test

                console.log('플레이어: ',deception_player)

                socket.to(room).emit('deceptionJoin',{
                    deception_player
                })
            }
            else{
                console.log('value is empty!')
            }
        })

        socket.on('deceptionReady',(data) => {
            const {user, room} = data
            //let msg // 유저가 준비한지 여부
            for(let i=0;i<deception_player.length;i++){
                if(deception_player[i].name == user){
                    if(deception_player[i].ready == true){
                        deception_player[i].ready = false
                        //msg = '레디 해제'
                        //console.log(msg)
                    }
                    else {
                        deception_player[i].ready = true
                        //msg = '레디 완료'
                        //console.log(deception_player[i].name,deception_player[i].ready,msg)
                    }
                    //console.log('준비 후: ',deception_player)
                }
            }
            let not_ready = 0
            let ready = false
            for(let i=0;i<deception_player.length;i++){
                if(deception_player[i].ready == false) not_ready += 1
            }
            if(not_ready == 0) { //모두 준비 완료되면 (레디 안 한 사람이 없으면)
                ready = true
                socket.to(room).emit('deceptionReady',{
                    ready
                })
                //console.log('다 준비됨',ready,msg,not_ready)
            }
            else{ //한명이라도 준비가 안되면
                ready = false
                socket.to(room).emit('deceptionReady',{
                    ready
                })
                //console.log('준비 덜 됨',ready,msg,not_ready)
            }
        })
    
        socket.on('deceptionLeave',(data) => {   
            let {user,room} = data.room
            if (data.room != '') {
                for(let i=0;i<deception_player.length;i++){
                    if(deception_player[i].name == user){
                        deception_player.splice(i,1)
                    }
                }
                socket.leave(room)
                console.log(room+'번 방 leave 완료!')
            }
            else{
                console.log('value is empty!')
            }    
        })
    
        socket.on('deceptionStart',(data) => {//게임 시작(카드 덱 설정)
            let {room,card_count} = data
            
            let personnel = deception_player.length
            //초기 덱 설정
            let init_deck = deception_init_game(deception_clue_deck,deception_means_deck,deception_clue,deception_means)
            deception_clue_deck = init_deck[0]
            deception_means_deck = init_deck[1]
            deception_clue = init_deck[2]
            deception_means = init_deck[3]             
            //직업정하기
            deception_player = deception_decide_role(personnel,deception_player)
            //카드뽑기
            for(let i=0;i<personnel;i++) {
                let drawn_card = deception_draw_card(deception_clue_deck,deception_means_deck,deception_clue,deception_means,card_count)
                deception_player[i].clue = drawn_card[0]
                deception_player[i].means = drawn_card[1]
            }
            console.log(deception_player)
            socket.to(room).emit('deceptionStart', {
                deception_player
            })            
        })

        socket.on('deceptionMurdererChoice',(data)=>{ 
            const{room, means, clue} = data
            deception_murder_means = means
            deception_murder_clue = clue
            socket.to(room).emit('deceptionMurdererChoice',{
                data
            })
        })
    
        socket.on('deceptionGodChoice',(data)=>{ 
            const{room} = data.room
            socket.to(room).emit('deceptionGodChoice',{
                data
            })
        })
    

        socket.on('deceptionTime',(data)=>{ //시간 증감 고민중.
            const{room, time} = data
            socket.to(room).emit('deceptionTime', {
                time
            })
        })
    
        socket.on('deceptionGuessAnswer',(data) =>{ //최후의 추리
            const {room, murderer, means, clue} = data
            let anwer
            if (murderer == deception_murderer && means == deception_murder_means && clue == deception_murder_clue) {
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
