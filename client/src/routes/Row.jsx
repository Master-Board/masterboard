import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function Row(props) {
  const [scrollX, setScrollX] = useState(0);
  const [roomSearchModal, setRoomSearchModal] = useState(false);
  const [roomMakeModal, setRoomMakeModal] = useState(false);
  const searchModalhandleClose = () => setRoomSearchModal(false);
  const searchModalhandleShow = () => setRoomSearchModal(true);
  const makeModalhandleClose = () => setRoomMakeModal(false);
  const makeModalhandleShow = () => setRoomMakeModal(true);

  const [roomNumber, setRoomNumber] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = props.rooms?.length * 150;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };

  const addRoom = () => {
    let index = 0;
    if (props.title == "deception") {
      index = 1;
    } else if (props.title == "tichu") {
      index = 2;
    } else if (props.title == "fertility") {
      index = 3;
    }
    const games = props.games;
    const newRoom = {
      number: roomNumber * 1,
      people: 1,
    };
    games[index].rooms.push(newRoom);
  };

  return (
    <div className="Row" style={{ backgroundColor: "#111" }}>
      <h2 style={{ color: "#fff", marginBottom: "10px" }}>
        {props.title === "parade"
          ? "퍼레이드"
          : props.title === "deception"
          ? "디셉션"
          : props.title === "tichu"
          ? "티츄"
          : props.title === "fertility"
          ? "퍼틸리티"
          : null}
      </h2>
      <div className="Row-left" onClick={handleLeftArrow}>
        <img src="https://img.icons8.com/ios-glyphs/50/FFFFFF/chevron-left.png" />
      </div>
      <div className="Row-right" onClick={handleRightArrow}>
        <img src="https://img.icons8.com/ios-glyphs/50/FFFFFF/chevron-right.png" />
      </div>

      <div className="Row-listarea">
        <div
          className="Row-list"
          style={{
            marginLeft: scrollX,
          }}
        >
          <div style={{position : "relative", width: "300px", height: "300px"}}>
            <img width={"300px"} height={"300px"} src={`${props.img}`} />
            <button id="rowRepresentImgBtn" >게임설명</button>
          </div>
          <div style={{ width: "150px" }}>
            <button
              className="roomButton"
              style={{
                display: "block",
                backgroundColor: "#111",
                border: "none",
                padding: "30px 0px 20px 30px",
              }}
              variant="primary"
              onClick={makeModalhandleShow}
            >
              <img
                src="img/add.png"
                alt="+"
                style={{ width: "100px", height: "100px" }}
              />
            </button>
            <Modal show={roomMakeModal} onHide={makeModalhandleClose}>
              <Modal.Header closeButton>
                <Modal.Title>새로운 방 번호를 입력하세요</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  onChange={(event) => {
                    setRoomNumber(event.target.value);
                  }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={makeModalhandleClose}>
                  Close
                </Button>
                <Link to={"/" + props.title + "/" + roomNumber}>
                  <Button
                    variant="primary"
                    onClick={() => {
                      makeModalhandleClose();
                      addRoom();
                    }}
                  >
                    Create!
                  </Button>
                </Link>
              </Modal.Footer>
            </Modal>
            <button
              className="roomButton"
              style={{
                display: "block",
                backgroundColor: "#111",
                border: "none",
                padding: "20px 0px 20px 30px",
              }}
              variant="primary"
              onClick={searchModalhandleShow}
            >
              <img
                src="img/search.png"
                alt="Q"
                style={{ width: "100px", height: "100px" }}
              />
            </button>
            <Modal show={roomSearchModal} onHide={searchModalhandleClose}>
              <Modal.Header closeButton>
                <Modal.Title>참가할 방 번호를 입력하세요</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={searchModalhandleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={searchModalhandleClose}>
                  Search!
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          {props.rooms.map((item, key) => (
            <div key={key} className="Row-item">
              <Link to={ "/" + props.title + "/" + props.rooms[key].number}>
                <img src="#" height={"300px"} />
              </Link>
              <div style={{ color: "#fff" }}>
                방 번호: {props.rooms[key].number}, 인원:{" "}
                {props.rooms[key].people + "  / " + props.people}
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Row;
