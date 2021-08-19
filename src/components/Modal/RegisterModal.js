import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

function RegisterModal(props) {
   return (
      <Modal show={props.show} onHide={props.handleClose} dialogClassName="modal-overide" centered>
      <Modal.Body>
        <Modal.Title className="text-overide"><strong>Register</strong></Modal.Title>
        <br/>
       <Form>
          <Form.Group className="mb-3" controlId="Email">
             <Form.Control type="email" placeholder="Email" className="input-overide" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Password">
             <Form.Control type="password" placeholder="Password" className="input-overide" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="FullName">
             <Form.Control type="password" placeholder="Full Name" className="input-overide" />
          </Form.Group>
          <div className="d-grid gap-2 my-3">
          <Button variant="danger" className="bg-overide" type="submit">
                Register
             </Button>
          </div>
          <p className="text-center">Already have an account ? Click <span onClick={props.switchModal}><strong>Here</strong></span></p>
          </Form>
       </Modal.Body>
    </Modal>
   )
}

export default RegisterModal
