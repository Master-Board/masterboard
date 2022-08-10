import React from 'react'

function DeceptionUser(props) {

  return (
    <div style={{width: "270px", height: " 180px", border: "1px solid #111", margin: "20px 17px"}}>
        <div style={{margin: "5px 0px"}}>{props.user.name}</div>
        <div className='단서' style={{display:"flex"}}>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>{props.user.blue[0]}</div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>{props.user.blue[1]}</div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>{props.user.blue[2]}</div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>{props.user.blue[3]}</div>
        </div>
        <div className='수단' style={{display:"flex"}}>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>{props.user.red[0]}</div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>{props.user.red[1]}</div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>{props.user.red[2]}</div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>{props.user.red[3]}</div>
        </div>
    </div>
  )
}

export default DeceptionUser;