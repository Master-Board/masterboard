import './App.css';
import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import Mainpage from './routes/Mainpage.jsx';
import Parade from "./routes/Parade.jsx";
import Deception from "./routes/Deception.jsx";
import Tichu from "./routes/Tichu.jsx";
import Fertility from "./routes/Fertility.jsx";

function App() {

  const [user, setUser] = useState({id:"형진", password:"1234", isLogIn: true});
  const [games, setGames] = useState([{
    title: 'parade',
    rooms: [{number: 4347, people: 2}, {number: 3257, people: 4}, {number: 2361, people: 5}, {number: 8135, people: 2}, {number: 5686, people: 1}, {number: 3482, people: 6}, {number: 43181, people: 3}, {number: 1634, people: 3}, {number: 4372, people: 1}, {number: 6464, people: 5}, {number: 6080, people: 5}, {number: 1755, people: 6}],
    people: 6,
    grade: 4.5,
    image: 'img/parade.jpeg',
    content: '안녕하세요? 퍼레이드 게임소개 ~~'
  },
  {
    title: 'deception',
    rooms: [{number:2125, people: 3}, {number: 5643, people: 2}, {number: 2785, people: 6}, {number: 1457, people: 4}, {number: 1232, people: 5}],
    people: 6,
    grade: 4.5,
    image: 'img/deception.webp',
    content: '안녕하세요? 디셉션 게임소개 ~~'
  },
  {
    title: 'tichu',
    rooms: [{number:1852, people: 3}, {number: 3456, people: 4}, {number: 1174, people: 4}],
    people: 4,
    grade: 4.5,
    image: 'img/tichu.png',
    content: '안녕하세요? 티츄 게임소개 ~~'
  },
  {
    title: 'fertility',
    rooms: [],
    people: 6,
    grade: 4.5,
    image: 'img/fertility.jpg',
    content: '안녕하세요? 퍼틸리티 게임소개 ~~'
  }]);

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={user.isLogIn == true ? <Navigate to="/mainpage" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/signup" element={<Signup user={user} setUser={setUser} />} />
          <Route path="/mainpage" element={<Mainpage user={user} setUser={setUser} games={games} setGames={setGames} />} />
          <Route path="/parade/:roomNumber" element={<Parade user={user} setUser={setUser} />} />
          <Route path="/deception/:roomNumber" element={<Deception user={user} setUser={setUser} />} />
          <Route path="/tichu/:roomNumber" element={<Tichu user={user} setUser={setUser} />} />
          <Route path="/fertility/:roomNumber" element={<Fertility user={user} setUser={setUser} />} />
          {/* <Route path="*" element={} /> */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
