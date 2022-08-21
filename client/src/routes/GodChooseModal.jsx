import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import { useState } from 'react';

function GodChooseModal(props) {

  const [hintArrayIndex, setHintArrayIndex] = useState([]);

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
        
    useEffect(() => {
      setHintArrayIndex(ranNum(props.hint.length, 4))
      console.log(hintArrayIndex)
    }, [])

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
                <label className="form-check-label"><input className="form-check-input" type="radio" name="사인" value="질식" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godCause = e.target.value;
                  props.setGodChoice(copy);
                }}/>질식</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="사인" value="중상" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godCause = e.target.value;
                  props.setGodChoice(copy);
                }}/>중상</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="사인" value="과다출혈" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godCause = e.target.value;
                  props.setGodChoice(copy);
                }}/>과다출혈</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="사인" value="질병" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godCause = e.target.value;
                  props.setGodChoice(copy);
                }}/>질병</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="사인" value="독살" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godCause = e.target.value;
                  props.setGodChoice(copy);
                }}/>독살</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="사인" value="사고사" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godCause = e.target.value;
                  props.setGodChoice(copy);
                }}/>사고사</label>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label><h5>장소</h5></Form.Label>
              <br/>
              <span>그룹 1&nbsp;&nbsp;&nbsp;</span>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="놀이터" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>놀이터</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="교실" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>교실</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="기숙사" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>기숙사</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="구내식당" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>구내식당</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="엘리베이터" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>엘리베이터</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="공중화잘실" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>공중화잘실</label>
              </div>
              <br/>
              <span>그룹 2&nbsp;&nbsp;&nbsp;</span>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="거실" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>거실</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="침실" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>침실</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="창고" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>창고</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="화장실" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>화장실</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="부엌" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>부엌</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="발코니" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>발코니</label>
              </div>
              <br/>
              <span>그룹 3&nbsp;&nbsp;&nbsp;</span>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="별장" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>별장</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="공원" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>공원</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="슈퍼마켓" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>슈퍼마켓</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="학교" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>학교</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="숲속" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>숲속</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="장소" value="은행" onClick={(e) => {
                  let copy = props.godChoice;
                  copy.godPlace = e.target.value;
                  props.setGodChoice(copy);
                }}/>은행</label>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label><h5>현장힌트</h5></Form.Label>
              <br/>
              {
                hintArrayIndex.map((data1, i) => (
                    <div key = {i}>
                        <span>{props.hint[data1]?.title}&nbsp;&nbsp;&nbsp;</span>
                        {props.hint[data1]?.content.map((data2, j) => (
                            <div className="form-check form-check-inline" key = {j}>
                                <label className="form-check-label"><input className="form-check-input" type="radio" name={props.hint[data1] + i} value={data2} onClick={(e) => {
                                    let copy = props.godChoice;
                                    copy.godHint[i].title = props.hint[data1].title
                                    copy.godHint[i].content = e.target.value
                                    props.setGodChoice(copy);
                                }}/>{data2}</label>
                            </div>
                        ))}
                    </div>
                ))
              }
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            console.log(props.godChoice)
            props.socket.emit("deceptionGodChoice", {})
            props.handleCloseGodChoose()
          }}>
            완료
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default GodChooseModal