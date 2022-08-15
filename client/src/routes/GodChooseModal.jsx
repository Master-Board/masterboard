import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function GodChooseModal(props) {

    // 최대범위와 갯수를 넣으면 중복 없는 랜덤값 생성
    function ranNum (MaxNum, theNumber) {  
        const ran = [];  
        function makeNum () {    
            if (ran.length < theNumber) {      
                let n = Math.floor(Math.random() * MaxNum);      
                if (notSame(n)) {        
                    ran.push(n);      
                }      makeNum();    
            }    function notSame (n) {      
                return ran.every((e) => n !== e);    
            }  
        }  
        makeNum();  
        return ran;
    }
        
    const hintArrayIndex = ranNum(props.hint.length, 4)
    console.log(hintArrayIndex)

  return (
    <div>
        <Modal show={props.showGodChoose} onHide={props.handleCloseGodChoose} aria-labelledby="contained-modal-title-vcenter" centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>법의학자 선택</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label><h5>사인</h5></Form.Label>
              <br />
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="사인" value="질식"/>질식</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="사인" value="중상"/>중상</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="사인" value="과다출혈"/>과다출혈</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="사인" value="병/질병"/>병/질병</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="사인" value="중독"/>중독</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="사인" value="사고"/>사고</label>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label><h5>장소</h5></Form.Label>
              <br/>
              <span>그룹 1&nbsp;&nbsp;&nbsp;</span>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="술집" />술집</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="서점"/>서점</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="식당"/>식당</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="호텔"/>호텔</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="병원"/>병원</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="건축부지"/>건축부지</label>
              </div>
              <br/>
              <span>그룹 2&nbsp;&nbsp;&nbsp;</span>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="별장"/>별장</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="공원"/>공원</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="슈퍼마켓"/>슈퍼마켓</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="학교"/>학교</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="숲"/>숲</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="은행"/>은행</label>
              </div>
              <br/>
              <span>그룹 3&nbsp;&nbsp;&nbsp;</span>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="거실"/>거실</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="침실"/>침실</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="창고"/>창고</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="화장실"/>화장실</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="부엌"/>부엌</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="발코니"/>발코니</label>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label><h5>현장힌트</h5></Form.Label>
              <br/>
              {
                hintArrayIndex.map((data1, i) => (
                    <div>
                        <span>{props.hint[data1]?.title}&nbsp;&nbsp;&nbsp;</span>
                        {props.hint[data1]?.content.map((data2, j) => (
                            <div className="form-check form-check-inline">
                                <label className="form-check-label"><input className="form-check-input" type="radio" name={props.hint[data1] + i} value={data2}/>{data2}</label>
                            </div>
                        ))}
                        {/* <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name={"현장힌트"+i} id={props.hint[data] + i} value={"option" + i}/>
                            <label className="form-check-label" for={props.hint[data] + i}>발코니</label>
                        </div> */}
                    </div>
                ))
              }
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleCloseGodChoose}>
            완료
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default GodChooseModal