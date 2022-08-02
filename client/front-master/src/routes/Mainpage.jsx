import React, { useEffect, useState } from "react";
import Row from "./Row.jsx";
import Featured from "./Featured.jsx";
import Header from "./Header.jsx";
import userEvent from '@testing-library/user-event';
import { useSelector, useDispatch } from 'react-redux';

function Mainpage(props) {

  const [blackHeader, setBalckHeader] = useState(false);
  const [featuredData, setFeaturedData] = useState("");

  useEffect(() => {
    let randomChoosen = Math.floor(Math.random() * (props.games.length));
    let choosen = props.games[randomChoosen];
    setFeaturedData(choosen);
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBalckHeader(true);
      } else {
        setBalckHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const LogoutFunc = () => {
    console.log("로그아웃");
  }

  return (
    <div className="page">
      <Header black={blackHeader} user={props.user} setUser={props.setUser} />
      <Featured featuredData={featuredData} user={props.user} setUser={props.setUser} />
      <section className="lists">
        {props.games && props.games.map((item, key) => (
          <Row
            key={key}
            title={item.title}
            rooms={item.rooms}
            people={item.people}
            user={props.user} 
            setUser={props.setUser}
            img={item.image}
            games={props.games}
            setGames={props.setGames}
          />
        ))}
      </section>
    </div>
  );
}

export default Mainpage;
