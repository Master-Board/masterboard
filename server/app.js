require("dotenv").config()
const express = require("express")
const http = require("http")
const app = express()
app.set('port', process.env.PORT);
const server = http.createServer(app)
const PORT = process.env.PORT
app.use(express.urlencoded({extended: true}))
const moment = require('moment')
// const api = require('./apis/apis')
// app.use("/", api)
const cors = require("cors")
app.use(cors({
    //origin: 'ec2-13-125-172-64.ap-northeast-2.compute.amazonaws.com:3000', // 출처 허용 옵션
    origin: 'localhost:3000', // 출처 허용 옵션
    credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));

const SocketIO = require('./socket/socket.js')
SocketIO(server)


server.listen(PORT, () => console.log(`server is runnig ${PORT}`))