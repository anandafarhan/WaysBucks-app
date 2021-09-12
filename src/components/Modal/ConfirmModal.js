import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

function ConfirmModal(props) {
	return (
		<Modal show={props.show} onHide={props.handleClose} centered>
			<Modal.Header>
				<Modal.Title>
					Confirm {props.actionName} <strong className='text-overide'>{props.name}</strong> ?
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className='text-warning'>
				<Alert variant={props.variant}>{props.body}</Alert>
			</Modal.Body>
			<Modal.Footer className='d-flex justify-content-between'>
				<Button variant='secondary' onClick={props.handleClose}>
					Cancel
				</Button>
				<Button variant={props.variant} onClick={props.action}>
					{props.actionName}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ConfirmModal;
