import React from 'react'

function DeceptionUser(props) {
  return (
    <div style={{width: "270px", height: " 180px", border: "1px solid #111", margin: "20px 17px"}}>
        <div style={{margin: "5px 0px"}}>DeceptionUser</div>
        <div className='단서' style={{display:"flex"}}>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>1</div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>2</div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>3</div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>4</div>
        </div>
        <div className='수단' style={{display:"flex"}}>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>5</div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>6</div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>7</div>
            <div style={{width: "60px", height: "60px", border: "1px solid #000", margin: "5px 5px"}}>8</div>
        </div>
    </div>
  )
}

export default DeceptionUser;