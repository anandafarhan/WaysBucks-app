import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

function ErrorModal(props) {
	return (
		<Modal show={props.show} onHide={props.handleClose} centered>
			<Modal.Body className='p-2 d-flex flex-column justify-content-center align-items-center text-danger'>
				<h3>Please Login before taking an order</h3>
			</Modal.Body>
		</Modal>
	);
}

export default ErrorModal;
