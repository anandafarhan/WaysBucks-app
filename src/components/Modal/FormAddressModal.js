import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

function FormAddressModal(props) {
	function handleChange(e) {
		props.setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}
	return (
		<Modal
			show={props.show}
			onHide={props.handleClose}
			style={{ backdropFilter: 'blur(5px)' }}
			centered
		>
			<Modal.Header as='h3' closeButton>
				<Modal.Title className='text-overide' as='h3'>
					{props.action} Address
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={(e) => props.handleSubmit(e, props.formData)}>
					<Form.Group className='mb-3' controlId='FullName'>
						<Form.Control
							type='text'
							name='title'
							placeholder='Title'
							value={props.formData.title}
							onChange={(e) => handleChange(e)}
							className='input-overide'
							required
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='FullName'>
						<Form.Control
							type='text'
							name='name'
							placeholder='Full Name'
							value={props.formData.name}
							onChange={(e) => handleChange(e)}
							className='input-overide'
							required
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='Email'>
						<Form.Control
							type='email'
							name='email'
							placeholder='Email'
							value={props.formData.email}
							onChange={(e) => handleChange(e)}
							className='input-overide'
							required
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='Phone'>
						<Form.Control
							type='tel'
							name='phone'
							placeholder='Phone'
							value={props.formData.phone}
							onChange={(e) => handleChange(e)}
							className='input-overide'
							required
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='postCode'>
						<Form.Control
							type='text'
							name='postCode'
							placeholder='Post Code'
							value={props.formData.postCode}
							onChange={(e) => handleChange(e)}
							className='input-overide'
							required
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='address'>
						<Form.Control
							as='textarea'
							name='address'
							style={{ height: '100px' }}
							placeholder='Address'
							value={props.formData.address}
							onChange={(e) => handleChange(e)}
							className='input-overide'
							required
						/>
					</Form.Group>
					<div className='d-grid mt-4'>
						<Button variant='danger' className='bg-overide' type='submit'>
							Save Address
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default FormAddressModal;
