import React, { useState, useEffect } from 'react'

function DeceptionUser(props) {

    const [btnClick, setBtnClick] = useState([false, false, false, false, false, false, false, false]);

  return props.user == null ? 
    (<div style={{width: "270px", height: " 180px", border: "1px solid #111", margin: "20px 17px"}}>
        <div style={{margin: "5px 0px"}}>empty</div>
        <div className='단서' style={{display:"flex"}}>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}></div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}></div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}></div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}></div>
        </div>
        <div className='수단' style={{display:"flex"}}>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}></div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}></div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}></div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}></div>
        </div>
    </div>) :
    (<div style={{width: "270px", height: " 180px", border: "1px solid #111", margin: "20px 17px"}}>
      <div style={{margin: "5px 0px"}}>{props.user.name}</div>
      <div className='단서' style={{display:"flex"}}>
          <div className={'deceptionCard' + (btnClick[0]? " clicked" : "")} onClick={() => {
            let copy = [...btnClick];
            copy[0]= !copy[0];
            setBtnClick(copy);}}>{props.user.means[0]}</div>
          <div className={'deceptionCard' + (btnClick[1]? " clicked" : "")} onClick={() => {
            let copy = [...btnClick];
            copy[1]= !copy[1];
            setBtnClick(copy);}}>{props.user.means[1]}</div>
          <div className={'deceptionCard' + (btnClick[2]? " clicked" : "")} onClick={() => {
            let copy = [...btnClick];
            copy[2]= !copy[2];
            setBtnClick(copy);}}>{props.user.means[2]}</div>
          <div className={'deceptionCard' + (btnClick[3]? " clicked" : "")} onClick={() => {
            let copy = [...btnClick];
            copy[3]= !copy[3];
            setBtnClick(copy);}}>{props.user.means[3]}</div>
      </div>
      <div className='수단' style={{display:"flex"}}>
          <div className={'deceptionCard' + (btnClick[4]? " clicked" : "")} onClick={() => {
            let copy = [...btnClick];
            copy[4]= !copy[4];
            setBtnClick(copy);}}>{props.user.clue[0]}</div>
          <div className={'deceptionCard' + (btnClick[5]? " clicked" : "")} onClick={() => {
            let copy = [...btnClick];
            copy[5]= !copy[5];
            setBtnClick(copy);}}>{props.user.clue[1]}</div>
          <div className={'deceptionCard' + (btnClick[6]? " clicked" : "")} onClick={() => {
            let copy = [...btnClick];
            copy[6]= !copy[6];
            setBtnClick(copy);}}>{props.user.clue[2]}</div>
          <div className={'deceptionCard' + (btnClick[7]? " clicked" : "")} onClick={() => {
            let copy = [...btnClick];
            copy[7]= !copy[7];
            setBtnClick(copy);}}>{props.user.clue[3]}</div>
      </div>
    </div>)
}

export default DeceptionUser;