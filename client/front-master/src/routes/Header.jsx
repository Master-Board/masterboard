import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";

export default (props) => {
    return (
        <header className={props.black ? 'black' : ''}>
            <div className="header-logo">
                <a href="/mainpage">
                    <img src="img/logo.PNG" alt="페이지 로고/홈버튼"/>
                </a>
            </div>
            <div className="header-user">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: '#111', border: '#111'}}>
                        <img src="img/user.png" alt="User"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href ="/login" onClick={() => {
                            let copy = props.user;
                            copy.isLogIn = false;
                            props.setUser(copy);
                        }}>로그아웃
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </header>
    );
};