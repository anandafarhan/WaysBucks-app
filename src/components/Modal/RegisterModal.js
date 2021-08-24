import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { registerUser } from '../../config/server';
import { AppContext } from '../../context/AppContext';

function RegisterModal(props) {
	const dataAllUsers = JSON.parse(localStorage.getItem('dataAllUsers'));
	const [state, dispatch] = useContext(AppContext);
	let newId = dataAllUsers.length + 1;
	const [formData, setFormData] = useState({
		id: newId,
		email: '',
		password: '',
		name: '',
		role: 'user',
	});

	function handleChange(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		registerUser(formData);

		dispatch({
			type: 'REGISTER',
			payload: formData,
		});

		setFormData({
			email: '',
			password: '',
			name: '',
		});
		props.handleClose();
	}

	return (
		<Modal
			show={props.show}
			onHide={props.handleClose}
			dialogClassName='modal-overide'
			centered
		>
			<Modal.Body>
				<Modal.Title className='text-overide'>
					<strong>Register</strong>
				</Modal.Title>
				<br />
				<Form onSubmit={(e) => handleSubmit(e)}>
					<Form.Group className='mb-3' controlId='Email'>
						<Form.Control
							type='email'
							name='email'
							placeholder='Email'
							value={formData.email}
							onChange={(e) => handleChange(e)}
							className='input-overide'
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='Password'>
						<Form.Control
							type='password'
							name='password'
							placeholder='Password'
							value={formData.password}
							onChange={(e) => handleChange(e)}
							className='input-overide'
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='FullName'>
						<Form.Control
							type='text'
							name='name'
							placeholder='Full Name'
							value={formData.name}
							onChange={(e) => handleChange(e)}
							className='input-overide'
						/>
					</Form.Group>
					<div className='d-grid gap-2 my-3'>
						<Button variant='danger' className='bg-overide' type='submit'>
							Register
						</Button>
					</div>
					<p className='text-center'>
						Already have an account ? Click{' '}
						<span onClick={props.switchModal}>
							<strong>Here</strong>
						</span>
					</p>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default RegisterModal;
