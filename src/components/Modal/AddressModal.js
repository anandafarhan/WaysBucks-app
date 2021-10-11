import React, { useEffect, useState } from 'react';
import { Modal, Card, ListGroup, Button } from 'react-bootstrap';
import {
	addUserAddress,
	deleteAddress,
	getUserAddresses,
	setPrimaryAddress,
	updateAddress,
} from '../../config/server';
import FormAddressModal from './FormAddressModal';
import { BiEditAlt, BiX } from 'react-icons/bi';
import ConfirmModal from './ConfirmModal';

function AddressModal(props) {
	const [addresses, setAddresses] = useState([]);
	const [addAddressModal, setAddAddressModal] = useState(false);
	const [updateAddressModal, setUpdateAddressModal] = useState(false);
	const initialForm = {
		title: '',
		name: '',
		email: '',
		phone: '',
		postCode: '',
		address: '',
	};
	const initialModal = { show: false, id: '', name: '' };
	const [modalConfirm, setModalConfirm] = useState(initialModal);
	const [formData, setFormData] = useState(initialForm);

	async function loadAddresses() {
		const response = await getUserAddresses();
		setAddresses(response);
	}

	async function handleDelete(id) {
		props.setWait(true);
		await deleteAddress(id);
		setModalConfirm(initialModal);
		props.setWait(false);
	}

	async function handleSetPrimary(id) {
		props.setWait(true);
		await setPrimaryAddress(id);
		props.setWait(false);
	}

	async function handleSubmit(e, formData) {
		e.preventDefault();
		props.setWait(true);
		await addUserAddress({ ...formData, isprimary: false });
		setAddAddressModal(false);
		setFormData(initialForm);
		props.setWait(false);
	}

	async function handleUpdate(e, formData) {
		e.preventDefault();
		props.setWait(true);
		await updateAddress(formData, formData.id);
		setUpdateAddressModal(false);
		props.setWait(false);
	}

	function handleModalUpdate(payload) {
		setFormData({
			id: payload.id,
			title: payload.title,
			name: payload.name,
			email: payload.email,
			phone: payload.phone,
			postCode: payload.postCode,
			address: payload.address,
		});
		setUpdateAddressModal(true);
	}

	useEffect(() => {
		loadAddresses();
	}, [props.wait]);
	return (
		<Modal
			show={props.show}
			onHide={props.handleClose}
			style={{ backdropFilter: 'blur(5px)' }}
			centered
		>
			<Modal.Header as='h3' closeButton>
				<Modal.Title className='text-overide' as='h3'>
					Manage Addresses
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Button variant='outline-danger' className='mb-3' onClick={() => setAddAddressModal(true)}>
					Add Address
				</Button>

				{!addresses ? (
					''
				) : (
					<div style={{ padding: '5px', height: '550px', overflowY: 'scroll' }}>
						{addresses.map((address) => (
							<Card key={address.id} className='p-0 mb-3' style={{ border: '1px solid #f6dada' }}>
								<Card.Header as='h5' className='d-flex justify-content-between bg-overide-2 text-overide'>
									<span>{address.title}</span>
									<span>
										{address.isprimary ? (
											<span className='me-1 fs-6'>Primary</span>
										) : (
											<Button
												variant='outline-danger'
												size='sm'
												className='me-1'
												onClick={() => handleSetPrimary(address.id)}
											>
												Set as Primary
											</Button>
										)}
										<BiEditAlt size='1.2rem' className='me-1' onClick={() => handleModalUpdate(address)} />
										<BiX
											size='1.5rem'
											onClick={() => setModalConfirm({ show: true, id: address.id, name: address.title })}
										/>
									</span>
								</Card.Header>
								<Card.Body>
									<ListGroup variant='flush'>
										<ListGroup.Item>
											<strong className='text-overide-2'>Name : </strong>
											{address.name}
										</ListGroup.Item>
										<ListGroup.Item>
											<strong className='text-overide-2'>Email : </strong>
											{address.email}
										</ListGroup.Item>
										<ListGroup.Item>
											<strong className='text-overide-2'>Phone : </strong>
											{address.phone}
										</ListGroup.Item>
										<ListGroup.Item>
											<strong className='text-overide-2'>Address : </strong>
											{address.address}
										</ListGroup.Item>
										<ListGroup.Item>
											<strong className='text-overide-2'>Zip code : </strong>
											{address.postCode}
										</ListGroup.Item>
									</ListGroup>
								</Card.Body>
							</Card>
						))}
					</div>
				)}
			</Modal.Body>
			<FormAddressModal
				show={addAddressModal}
				action='Add'
				handleClose={() => setAddAddressModal(false)}
				handleSubmit={handleSubmit}
				formData={formData}
				setFormData={setFormData}
			/>
			<FormAddressModal
				show={updateAddressModal}
				action='Update'
				handleClose={() => setUpdateAddressModal(false)}
				handleSubmit={handleUpdate}
				formData={formData}
				setFormData={setFormData}
			/>
			<ConfirmModal
				show={modalConfirm.show}
				name={modalConfirm.name}
				body="Warning, this action can't be undone!"
				variant='danger'
				actionName='Delete!'
				action={() => handleDelete(modalConfirm.id)}
				handleClose={() => setModalConfirm(initialModal)}
			/>
		</Modal>
	);
}

export default AddressModal;
