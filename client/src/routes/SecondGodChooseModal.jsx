import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import { useState } from 'react';

function SecondGodChooseModal(props) {

    const [deleteIndex, setDeleteIndex] = useState(0);
    const [ranNum, setRanNum] = useState(0);
    const [afterHint, setAfterHint] = useState('');

    useEffect(() => {
        setRanNum(createRanNum());
      }, [])

    const createRanNum = () => {
        return Math.floor(Math.random() * props.hint.length)
    }

    return (
        <div>
            <Modal show={props.showSecondGodChoose} onHide={props.handleCloseSecondGodChoose} aria-labelledby="contained-modal-title-vcenter" centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>법의학자 선택</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><h5>없앨 힌트</h5></Form.Label>
                            <br />
                            <div className="form-check form-check-inline">
                                <label className="form-check-label"><input className="form-check-input" type="radio" name="없앨힌트" value={props.hintTitle[0]} onClick={() => {
                                setDeleteIndex(0)
                                }}/>{props.hintTitle[0]}</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label"><input className="form-check-input" type="radio" name="없앨힌트" value={props.hintTitle[1]} onClick={() => {
                                setDeleteIndex(1)
                                }}/>{props.hintTitle[1]}</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label"><input className="form-check-input" type="radio" name="없앨힌트" value={props.hintTitle[2]} onClick={() => {
                                setDeleteIndex(2)
                                }}/>{props.hintTitle[2]}</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label"><input className="form-check-input" type="radio" name="없앨힌트" value={props.hintTitle[3]} onClick={() => {
                                setDeleteIndex(3)
                                }}/>{props.hintTitle[3]}</label>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><h5>바꿀 힌트</h5></Form.Label>
                            <br />
                            <span>{props.hint[ranNum].title}&nbsp;&nbsp;&nbsp;</span>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label"><input className="form-check-input" type="radio" name="바꿀힌트" value={props.hint[ranNum].content[0]} onClick={(e) => {
                                setAfterHint(e.target.value);
                                }}/>{props.hint[ranNum].content[0]}</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label"><input className="form-check-input" type="radio" name="바꿀힌트" value={props.hint[ranNum].content[1]} onClick={(e) => {
                                setAfterHint(e.target.value);
                                }}/>{props.hint[ranNum].content[1]}</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label"><input className="form-check-input" type="radio" name="바꿀힌트" value={props.hint[ranNum].content[2]} onClick={(e) => {
                                setAfterHint(e.target.value);
                                }}/>{props.hint[ranNum].content[2]}</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label"><input className="form-check-input" type="radio" name="바꿀힌트" value={props.hint[ranNum].content[3]} onClick={(e) => {
                                setAfterHint(e.target.value);
                                }}/>{props.hint[ranNum].content[3]}</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label"><input className="form-check-input" type="radio" name="바꿀힌트" value={props.hint[ranNum].content[4]} onClick={(e) => {
                                setAfterHint(e.target.value);
                                }}/>{props.hint[ranNum].content[4]}</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label"><input className="form-check-input" type="radio" name="바꿀힌트" value={props.hint[ranNum].content[5]} onClick={(e) => {
                                setAfterHint(e.target.value);
                                }}/>{props.hint[ranNum].content[5]}</label>
                            </div>
                        </Form.Group>
                        </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        for(let i = 0; i < props.godChoice.current.godHint.length; i++){
                            if(props.godChoice.current.godHint[i].title == props.hintTitle[deleteIndex]){
                                props.godChoice.current.godHint[i].title = props.hint[ranNum].title
                                props.godChoice.current.godHint[i].content = afterHint
                                break
                            }
                        }
                        console.log(props.godChoice)
                        props.socket.emit("deceptionGodChoice", {room: props.room, godChoice: props.godChoice})
                        props.handleCloseSecondGodChoose()
                    }}>
                        완료
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SecondGodChooseModal