import React, { useState, useContext, useEffect } from 'react';
import {
	Row,
	Col,
	Form,
	Button,
	Image,
	InputGroup,
	FormControl,
	Alert,
	FloatingLabel,
} from 'react-bootstrap';
import { BiSad, BiTrash, BiReceipt } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import CartModal from '../../components/Modal/CartModal';
import { addTransaction, getUserAddresses, updateTransaction } from '../../config/server';
import { AppContext } from '../../context/AppContext';

function Cart(props) {
	const title = 'My Cart';
	document.title = `Waysbucks | ${title}`;
	const route = useHistory();
	const [state, dispatch] = useContext(AppContext);
	const { carts } = state;
	const [modalState, setModalState] = useState(false);
	const [alert, setAlert] = useState(false);
	const [preview, setPreview] = useState(null);
	const [addresses, setAddresses] = useState([]);
	const [formData, setFormData] = useState({
		email: '',
		name: '',
		phone: '',
		postCode: '',
		address: '',
		attachment: null,
	});

	function formatPrice(price) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0,
		}).format(price);
	}

	async function loadAddress() {
		const response = await getUserAddresses();
		console.log(response);
		const primaryAddress = response ? response.find((address) => address.isprimary) : null;
		if (primaryAddress) {
			setFormData({
				...formData,
				email: primaryAddress.email,
				fullName: primaryAddress.name,
				phone: primaryAddress.phone,
				postCode: primaryAddress.postCode,
				address: primaryAddress.address,
			});
		}
		setAddresses(response ? response : []);
	}

	function handleChange(e) {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
		}));

		if (e.target.type === 'file') {
			let url = e.target.files.length < 1 ? null : URL.createObjectURL(e.target.files[0]);
			setPreview(url);
		}
	}

	function handleRemoveCart(id) {
		dispatch({
			type: 'REMOVE_CART',
			payload: id,
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (carts.length > 0) {
			if (preview) {
				setAlert(false);
				const transactionProducts = [];

				carts.forEach((product) => {
					const transactionToppings = [];
					product.toppings.forEach((topping) =>
						transactionToppings.push({
							toppingId: topping.id,
						})
					);
					transactionProducts.push({
						productId: product.id,
						qty: product.qty,
						transactionToppings,
					});
				});

				const form = new FormData();
				try {
					form.set('name', formData.fullName);
					form.set('email', formData.email);
					form.set('phone', formData.phone);
					form.set('postCode', formData.postCode);
					form.set('address', formData.address);
					form.set('income', total);
					form.set('transactionProducts', JSON.stringify(transactionProducts));
					form.set('attachment', formData.attachment[0], formData.attachment[0].name);
				} catch (error) {}

				setModalState(true);
				const response = await addTransaction(form);
				window.snap.pay(response.payment.token, {
					onSuccess: function (result) {
						route.push('/profile');
						dispatch({
							type: 'CLEAR_CART',
						});
					},
					onPending: function (result) {
						updateTransaction(response.transaction.id, { status: 'Canceled' });
						route.push('/profile');
					},
					onError: function (result) {
						updateTransaction(response.transaction.id, { status: 'Canceled' });
						route.push('/profile');
					},
					onClose: function () {
						updateTransaction(response.transaction.id, { status: 'Canceled' });
						route.push('/profile');
					},
				});
			} else {
				setAlert(true);
			}
		}
	}

	function handleAddressChange(e) {
		if (e.target.value !== 'manual') {
			const selectedAddress = addresses.find((item) => item.id === parseInt(e.target.value));
			setFormData({
				...formData,
				email: selectedAddress.email,
				fullName: selectedAddress.name,
				phone: selectedAddress.phone,
				postCode: selectedAddress.postCode,
				address: selectedAddress.address,
			});
		} else {
			setFormData({
				...formData,
				email: '',
				fullName: '',
				phone: '',
				postCode: '',
				address: '',
			});
		}
	}

	const deliveryFee = carts.length < 1 ? 0 : 10000;
	const [tax, setTax] = useState(0);
	const [subTotal, setSubTotal] = useState(0);
	const [total, setTotal] = useState(0);
	const [totalQty, setTotalQty] = useState(0);
	useEffect(() => {
		loadAddress();
		const scriptTag = document.createElement('script');
		scriptTag.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
		scriptTag.setAttribute('data-client-key', process.env.REACT_APP_CLIENT_KEY);
		document.body.appendChild(scriptTag);
		return () => {
			document.body.removeChild(scriptTag);
		};
	}, []);

	useEffect(() => {
		setSubTotal(
			carts.map((product) => product.subTotal).reduce((a, b) => parseInt(a) + parseInt(b), 0)
		);
		setTotalQty(carts.map((product) => product.qty).reduce((a, b) => parseInt(a) + parseInt(b), 0));
	}, [carts]);

	useEffect(() => {
		setTax(parseInt(subTotal) * 0.1, 0);
	}, [subTotal]);

	useEffect(() => {
		setTotal(
			carts.map((product) => product.subTotal).reduce((a, b) => parseInt(a) + parseInt(b), tax)
		);
	}, [tax]);

	return (
		<div className='d-block mx-auto' style={{ width: '70%' }}>
			<h2 className='text-overide'>{title}</h2>
			<Row>
				<Col md={7} className='mt-4 g-0'>
					<div className='border-bottom border-2'>
						<h6 className='text-overide'>Review Your Order</h6>
					</div>
					<div
						className='border-bottom border-2 pe-2'
						style={{
							width: 'auto',
							height: '260px',
							overflowY: 'scroll',
							overflowX: 'hidden',
						}}
					>
						{carts.length < 1 ? (
							<div
								className='d-flex flex-column justify-content-center align-items-center text-overide'
								style={{ width: '100%', height: '100%', opacity: '60%' }}
							>
								<BiSad size='6rem' />
								<h5 className='fw-lighter'>It's quiet in here</h5>
							</div>
						) : (
							carts.map((product, i) => (
								<Row className='my-3' key={i}>
									<Col md={2}>
										<Image
											src={product.image}
											style={{
												width: '100px',
												height: '100px',
												objectFit: 'cover',
												objectPosition: 'center',
												borderRadius: '5px',
											}}
										/>
									</Col>
									<Col md={8}>
										<h6 className='fw-bold text-overide'>{product.name}</h6>
										<div className='text-overide'>
											<div>
												{product.toppings.length < 1 ? (
													<>
														<span className='text-overide-2'>No Topping</span>{' '}
													</>
												) : (
													<>
														<span className='fw-bold text-overide-2'>Topping :</span>{' '}
														{product.toppings.map((topping) => topping.name).join(', ')}
													</>
												)}
												<br />
												<Col md={3}>
													<InputGroup size='sm' className='mt-2'>
														<Button
															variant='danger'
															className='btn-overide'
															onClick={() => dispatch({ type: 'DECREASE_QTY', payload: product })}
														>
															-
														</Button>
														<FormControl
															placeholder='Qty'
															aria-label='Qty'
															name='qty'
															className='text-center'
															value={product.qty}
															onChange={(e) =>
																dispatch({
																	type: 'CHANGE_QTY',
																	payload: { ...product, qty: e.target.value },
																})
															}
															min='1'
															max='50'
														/>
														<Button
															variant='danger'
															className='btn-overide'
															onClick={() => dispatch({ type: 'INCREASE_QTY', payload: product })}
														>
															+
														</Button>
													</InputGroup>
												</Col>
											</div>
										</div>
									</Col>
									<Col md={2} className='align-items-end d-flex flex-column justify-content-end'>
										<p className='text-overide'>{formatPrice(product.subTotal)}</p>
										<div className='text-overide'>
											<Button
												variant='danger'
												className='btn-overide'
												size='sm'
												onClick={() => handleRemoveCart(i)}
											>
												<BiTrash size='1.5rem' />
											</Button>
										</div>
									</Col>
								</Row>
							))
						)}
					</div>

					<div>
						<Row>
							<Col md={8}>
								<Row className='border-top mt-4 g-0'>
									<Col>
										<div className='mt-3'>
											<p className='text-overide'>Total Qty</p>
											<p className='text-overide mt-3'>Subtotal</p>
											<p className='text-overide'>Tax 10%</p>
											<p className='text-overide'>Delivery fee</p>
										</div>
									</Col>
									<Col>
										<div className='mt-3 text-end'>
											<p className='text-overide'>{totalQty}</p>
											<p className='text-overide mt-3'>{formatPrice(subTotal)}</p>
											<p className='text-overide'>{formatPrice(tax)}</p>
											<p className='text-overide'>{formatPrice(deliveryFee)}</p>
										</div>
									</Col>
								</Row>
								<Row className='border-top g-0'>
									<Col>
										<div className='mt-3'>
											<p className='text-overide mt-3'>
												<strong>Total</strong>
											</p>
										</div>
									</Col>
									<Col>
										<div className='mt-3 text-end'>
											<p className='text-overide mt-3'>
												<strong>{formatPrice(total + deliveryFee)}</strong>
											</p>
										</div>
									</Col>
								</Row>
							</Col>
							<Col md={4}>
								<label htmlFor='formFileLg'>
									<div
										className='d-flex flex-column mt-4 justify-content-center align-items-center'
										style={{
											backgroundColor: 'rgba(224, 200, 200, 25%)',
											color: 'rgba(50,50,50,60%)',
											border: '2px solid #BD0707',
											width: '13rem',
											height: '9rem',
											borderRadius: '5px',
										}}
									>
										{preview ? <Image src={preview} alt='receipt' width='80px' /> : <BiReceipt size='3rem' />}

										<p>
											{formData.attachment === null || formData.attachment.length < 1
												? 'Attach of Transaction'
												: formData.attachment[0].name}
										</p>
									</div>
								</label>
								<Form.Group controlId='formFileLg' className='mt-3' style={{ display: 'none' }}>
									<Form.Control
										type='file'
										name='attachment'
										onChange={(e) => handleChange(e)}
										accept='.jpg,.jpeg,.png,.svg'
										required
									/>
								</Form.Group>
							</Col>
						</Row>
					</div>
				</Col>
				<Col md={5} className='mt-5 ps-5'>
					<FloatingLabel controlId='floatingSelect' label='Saved Addresses'>
						<Form.Select
							aria-label='Saved Addresses'
							className='input-overide mb-3'
							onChange={(e) => handleAddressChange(e)}
						>
							{addresses.length < 1 ? (
								<option value='manual'>You Have no Saved Address</option>
							) : (
								<>
									<option value='manual'>Select Address</option>
									{addresses.map((address) =>
										address.isprimary ? (
											<option key={address.id} value={address.id} selected>
												{address.title}
											</option>
										) : (
											<option key={address.id} value={address.id}>
												{address.title}
											</option>
										)
									)}
								</>
							)}
						</Form.Select>
					</FloatingLabel>
					<Form onSubmit={(e) => handleSubmit(e)}>
						<Form.Group className='mb-3' controlId='FullName'>
							<Form.Control
								type='text'
								name='name'
								placeholder='Full Name'
								value={formData.fullName}
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
								value={formData.email}
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
								value={formData.phone}
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
								value={formData.postCode}
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
								value={formData.address}
								onChange={(e) => handleChange(e)}
								className='input-overide'
								required
							/>
						</Form.Group>
						<Alert
							variant='danger'
							style={alert ? { display: 'block', fontSize: '15px' } : { display: 'none' }}
						>
							Please provide attach of transaction
						</Alert>
						<div className='d-grid mt-4'>
							{carts.length < 1 ? (
								<Button variant='danger' className='bg-overide' type='submit' disabled>
									Pay
								</Button>
							) : (
								<Button variant='danger' className='bg-overide' type='submit'>
									Pay
								</Button>
							)}
						</div>
					</Form>
				</Col>
			</Row>
			<CartModal show={modalState} handleClose={() => setModalState(false)} />
		</div>
	);
}

export default Cart;
