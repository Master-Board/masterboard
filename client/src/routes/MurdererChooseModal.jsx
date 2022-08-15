import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from 'react';

function MurdererChooseModal(props) {

  return (
    <div>
      <Modal show={props.showMurdererChoose} onHide={props.handleCloseMurdererChoose} aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton>
          <Modal.Title>살인자 선택</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <h5>사인</h5>
              </Form.Label>
              <br />
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="blue" value={props.user.blue[0]} onClick={(e)=>{
                    let copy = props.answer;
                    copy.blue = e.target.value;
                    props.setAnswer(copy);
                }} />{props.user.blue[0]}</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="blue" value={props.user.blue[1]} onClick={(e)=>{
                    let copy = props.answer;
                    copy.blue = e.target.value;
                    props.setAnswer(copy);
                }}/>{props.user.blue[1]}</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="blue" value={props.user.blue[2]} onClick={(e)=>{
                    let copy = props.answer;
                    copy.blue = e.target.value;
                    props.setAnswer(copy);
                }}/>{props.user.blue[2]}</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="blue" value={props.user.blue[3]} onClick={(e)=>{
                    let copy = props.answer;
                    copy.blue = e.target.value;
                    props.setAnswer(copy);
                }}/>{props.user.blue[3]}</label>
              </div>

              <br />
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="red" value={props.user.red[0]} onClick={(e)=>{
                    let copy = props.answer;
                    copy.red = e.target.value;
                    props.setAnswer(copy);
                }}/>{props.user.red[0]}</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="red" value={props.user.red[1]} onClick={(e)=>{
                    let copy = props.answer;
                    copy.red = e.target.value;
                    props.setAnswer(copy);
                }}/>{props.user.red[1]}</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="red" value={props.user.red[2]} onClick={(e)=>{
                    let copy = props.answer;
                    copy.red = e.target.value;
                    props.setAnswer(copy);
                }}/>{props.user.red[2]}</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label"><input className="form-check-input" type="radio" name="red" value={props.user.red[3]} onClick={(e)=>{
                    let copy = props.answer;
                    copy.red = e.target.value;
                    props.setAnswer(copy);
                }}/>{props.user.red[3]}</label>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            props.handleCloseMurdererChoose()
        }}>
            완료
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MurdererChooseModal;
