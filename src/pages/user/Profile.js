import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import { BiEdit } from 'react-icons/bi';
import { AppContext } from '../../context/AppContext';
import { API, getUserTransactions, updateTransaction, updateUser } from '../../config/server';
import TransactionDetail from '../../components/Modal/TransactionDetail';

function Profile() {
	const title = 'Profile';
	const [state, dispatch] = useContext(AppContext);
	const [transactions, setTransactions] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [userData, setUserData] = useState({});
	const [preview, setPreview] = useState(null);
	const [wait, setWait] = useState(false);
	const [modalTD, setModalTD] = useState({ show: false, payload: '' });

	const avatar = state.user.avatar
		? state.user.avatar
		: `https://avatars.dicebear.com/api/initials/${state.user.name.split(' ').join('+')}.svg`;

	function formatPrice(price) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0,
		}).format(price);
	}

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	async function myTransaction() {
		const response = await getUserTransactions();
		setTransactions(response);
	}

	function handleEdit() {
		setEditMode((prev) => !prev);
		setUserData({
			name: state.user.name,
			avatar,
		});
		setPreview(null);
	}

	function handleChange(e) {
		setUserData({
			...userData,
			[e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
		});

		if (e.target.type === 'file') {
			let url = e.target.files.length < 1 ? null : URL.createObjectURL(e.target.files[0]);
			setPreview(url);
		}
	}

	function handleCloseTD() {
		setModalTD({ show: false, payload: null });
	}

	function handleOpenTD(payload) {
		setModalTD({ show: true, payload });
	}

	async function handleSave() {
		setWait(true);
		const form = new FormData();
		form.set('fullName', userData.name);
		try {
			form.set('avatar', userData.avatar[0], userData.avatar[0].name);
		} catch (error) {}

		const response = await updateUser(form);
		console.log(response);
		const response2 = await API('/auth');
		dispatch({
			type: 'LOAD_USER',
			payload: response2.data.data,
		});
		setEditMode(false);
		setWait(false);
	}

	async function handleReceive(id, e) {
		e.stopPropagation();
		setWait(true);
		const body = { status: 'Success' };
		await updateTransaction(id, body);
		handleCloseTD();
		setWait(false);
	}

	document.title = `Waysbucks | ${state.user.name ? state.user.name : title}`;
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		myTransaction();
	}, [wait]);

	return (
		<Row className='mx-auto mb-2 justify-content-between' style={{ width: '70%' }}>
			<Col md={6}>
				<h2 className='text-overide my-4'>
					My Profile{' '}
					<span>
						{!editMode ? (
							<BiEdit onClick={handleEdit} size='25px' />
						) : (
							<BiEdit onClick={handleEdit} className='text-muted' size='25px' />
						)}
					</span>
				</h2>
				{!editMode ? (
					<Row>
						<Col md={5} className='d-flex justify-content-center align-items-center'>
							<Image src={avatar} style={{ borderRadius: '10px', width: '100%' }} />
						</Col>
						<Col md={5}>
							<Row className='mb-4'>
								<h4 style={{ color: '#613D2B' }}>Full Name</h4>
								<span>{state.user.name}</span>
							</Row>
							<Row>
								<h4 style={{ color: '#613D2B' }}>Email</h4>
								<span>{state.user.email}</span>
							</Row>
						</Col>
					</Row>
				) : (
					<Row>
						<Col md={5} className='d-flex justify-content-center align-items-center'>
							<div className='input-overide p-2' style={{ borderRadius: '10px' }}>
								<label htmlFor='formFileLg'>
									<Image
										src={preview ? preview : userData.avatar}
										style={{ borderRadius: '10px', width: '100%' }}
									/>
								</label>
								<Form.Group controlId='formFileLg' style={{ display: 'none' }}>
									<Form.Control
										type='file'
										name='avatar'
										onChange={(e) => handleChange(e)}
										accept='.jpg,.jpeg,.png,.svg'
										required
									/>
								</Form.Group>
							</div>
						</Col>
						<Col md={5}>
							<Row className='mb-4'>
								<h4 style={{ color: '#613D2B' }}>Full Name</h4>
								<Form.Group controlId='fullName'>
									<Form.Control
										type='text'
										name='name'
										placeholder='Full Name'
										value={userData.name}
										onChange={(e) => handleChange(e)}
										className='input-overide'
									/>
								</Form.Group>
							</Row>
							<Row className='mb-2'>
								<h4 style={{ color: '#613D2B' }}>Email</h4>
								<span>{state.user.email}</span>
							</Row>
							<Row>
								{!wait ? (
									<Form.Group className='d-flex flex-row justify-content-between'>
										<Button variant='success' style={{ width: '90px' }} onClick={handleSave}>
											Save
										</Button>
										<Button variant='danger' style={{ width: '90px' }} onClick={handleEdit}>
											Cancel
										</Button>
									</Form.Group>
								) : (
									<Form.Group className='d-flex flex-row justify-content-between'>
										<Button variant='success' style={{ width: '90px' }} disabled>
											Save
										</Button>
										<Button variant='danger' style={{ width: '90px' }} disabled>
											Cancel
										</Button>
									</Form.Group>
								)}
							</Row>
						</Col>
					</Row>
				)}
			</Col>
			<Col md={6}>
				<h2 className='text-overide my-4' style={{ color: '#613D2B' }}>
					My Transaction
				</h2>
				<Row
					style={{ height: '590px', width: '550px', overflowY: 'auto', overflowX: 'hidden' }}
					className='d-flex justify-content-center p-2'
				>
					{!transactions
						? ''
						: transactions.map((transaction) => (
								<Row
									style={{
										height: '300px',
										borderRadius: '10px',
										backgroundColor: '#F6DADA',
									}}
									className='mb-3 p-3 border-box grow'
									id='transaction'
									key={transaction.id}
									onClick={() => handleOpenTD(transaction)}
								>
									<Col
										className='d-flex flex-column text-overide overflow-auto'
										style={{
											height: '250px',
											justifyContent: transaction.transactionProducts.length <= 1 ? 'center' : '',
										}}
										md={9}
									>
										{transaction.transactionProducts.map((transactionProduct) => {
											const date = new Date(transaction.createdAt);
											return (
												<Row id='product' key={transactionProduct.id} className='my-1'>
													<Col md={3}>
														<Image
															src={transactionProduct.product.image}
															style={{
																width: '80px',
																height: '100px',
																objectFit: 'cover',
																objectPosition: 'center',
																borderRadius: '5px',
															}}
														/>
													</Col>
													<Col md={9}>
														<h5 className='mb-0'>{transactionProduct.product.name}</h5>
														<span style={{ fontSize: '12px' }}>
															<strong>{days[date.getDay()]}</strong>, {date.getDate()}{' '}
															{months[date.getMonth()]} {date.getFullYear()}
														</span>
														<p className='mb-0' style={{ fontSize: '13px' }}>
															{transactionProduct.transactionToppings.length < 1 ? (
																<>
																	<span className='text-overide-2'>No Topping</span>
																</>
															) : (
																<>
																	<span className='fw-bold text-overide-2'>Topping: </span>
																	{transactionProduct.transactionToppings
																		.map((topping) => topping.topping.name)
																		.join(', ')}
																</>
															)}
														</p>
														<p
															className='text-overide-2 d-flex justify-content-between'
															style={{ fontSize: '14px' }}
														>
															<span>Qty : {transactionProduct.qty}</span>
															<span>
																Subtotal :{' '}
																{formatPrice(
																	transactionProduct.transactionToppings
																		.map((selectedTopping) => selectedTopping.topping.price)
																		.reduce(
																			(prev, curr) => prev + curr,
																			transactionProduct.product.price
																		) * transactionProduct.qty
																)}
															</span>
														</p>
													</Col>
												</Row>
											);
										})}
									</Col>
									<Col
										md={3}
										className='d-flex flex-column justify-content-evenly align-items-center'
									>
										<Image
											src={`${process.env.PUBLIC_URL}/assets/img/Logo.svg`}
											className='mb-2'
											width='50px'
										/>
										<QRCode
											value={`http://localhost:5000/api/v1/transaction/${transaction.id}`}
											className='mb-2 p-1 bg-white rounded'
											size={100}
											renderAs='svg'
										/>
										<div
											style={{
												fontSize: '12px',
												borderRadius: '5px',
											}}
											className={
												transaction.status === 'Waiting Approval'
													? 'text-wa bg-wa p-1 mb-1 text-center text-nowrap'
													: transaction.status === 'On The Way'
													? 'text-otw bg-otw p-1 mb-1 text-center text-nowrap'
													: transaction.status === 'Success'
													? 'text-scs bg-scs p-1 mb-1 text-center text-nowrap'
													: 'text-cancel bg-cancel p-1 mb-1 text-center text-nowrap'
											}
										>
											{transaction.status}
											{transaction.status === 'On The Way' ? (
												<div className='my-1'>
													{!wait ? (
														<Button
															variant='success'
															size='sm'
															onClick={(e) => handleReceive(transaction.id, e)}
														>
															Confirm Receive
														</Button>
													) : (
														<Button variant='success' size='sm' disabled>
															Confirm Receive
														</Button>
													)}
												</div>
											) : (
												''
											)}
										</div>
										<div style={{ fontSize: '12px' }} className='mb-1 text-overide text-nowrap'>
											<strong>Total : {formatPrice(transaction.income)}</strong>
										</div>
									</Col>
								</Row>
						  ))}
				</Row>
			</Col>
			<TransactionDetail
				show={modalTD.show}
				handleClose={handleCloseTD}
				handleReceive={handleReceive}
				payload={modalTD.payload}
			/>
		</Row>
	);
}

export default Profile;
