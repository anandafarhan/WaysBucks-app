import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Form, Button, Image } from 'react-bootstrap';
import { BiSad, BiTrash, BiReceipt } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import CartModal from '../components/Modal/CartModal';
import { AppContext } from '../context/AppContext';

function Cart(props) {
	const route = useHistory();
	const [state, dispatch] = useContext(AppContext);
	const { carts } = state;
	const [modalState, setModalState] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		name: '',
		phone: '',
		postCode: '',
		address: '',
	});

	function formatPrice(price) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0,
		}).format(price);
	}

	function handleChange(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	function handleRemoveCart(id) {
		dispatch({
			type: 'REMOVE_CART',
			payload: id,
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (carts.length > 0) {
			const transactionId = state.transaction.length + 1;
			const date = new Date();
			await dispatch({
				type: 'ADD_TRANSACTION',
				payload: {
					transactionId: transactionId,
					userId: state.user.id,
					dateTime: date,
					dataUser: formData,
					products: [...carts],
					status: 1,
				},
			});

			setModalState(true);
			setTimeout(() => {
				route.push('/profile');
			}, 3000);

			dispatch({
				type: 'CLEAR_CART',
			});

			setFormData({
				email: '',
				name: '',
				phone: '',
				postCode: '',
				address: '',
			});
		}
	};

	const [total, setTotal] = useState(0);
	useEffect(() => {
		setTotal(
			carts.map((product) => product.subTotal).reduce((a, b) => a + b, 0)
		);
	}, [carts]);

	return (
		<div className='d-block mx-auto' style={{ width: '70%' }}>
			{console.log(state.transaction)}
			<h2 className='text-overide'>My Cart</h2>
			<Row>
				<Col md={7} className='mt-4'>
					<div className='border-bottom'>
						<h6 className='text-overide'>Review Your Order</h6>
					</div>
					<div
						className='border-bottom overflow-auto'
						style={{
							width: 'auto',
							height: '260px',
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
											src={`${process.env.PUBLIC_URL}/assets/img/products/${product.img}`}
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
										<h6 className='text-overide mt-3'>{product.name}</h6>
										<div className='text-overide mt-3'>
											Topping:{' '}
											{product.toppings
												.map((topping) => topping.name)
												.join(', ')}
										</div>
									</Col>
									<Col md={2} className='text-end'>
										<p className='text-overide mt-3 mb-0'>
											{formatPrice(product.subTotal)}
										</p>
										<div className='text-overide mt-2'>
											<Button
												variant='danger'
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
											<p className='text-overide mt-3'>Subtotal</p>
											<p className='text-overide'>Qty</p>
										</div>
									</Col>
									<Col>
										<div className='mt-3 text-end'>
											<p className='text-overide mt-3'>{formatPrice(total)}</p>
											<p className='text-overide'>{carts.length}</p>
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
												<strong>{formatPrice(total)}</strong>
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
										<BiReceipt size='3rem' />
										<p>Attach of Transaction</p>
									</div>
								</label>
								<Form.Group
									controlId='formFileLg'
									className='mt-3'
									style={{ display: 'none' }}
								>
									<Form.Control type='file' />
								</Form.Group>
							</Col>
						</Row>
					</div>
				</Col>
				<Col md={5} className='mt-5 ps-5'>
					<Form onSubmit={(e) => handleSubmit(e)}>
						<Form.Group className='mb-3' controlId='FullName'>
							<Form.Control
								type='text'
								name='name'
								placeholder='Full Name'
								value={formData.fullName}
								onChange={(e) => handleChange(e)}
								className='input-overide'
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
							/>
						</Form.Group>

						<div className='d-grid gap-2 mt-5'>
							<Button variant='danger' className='bg-overide' type='submit'>
								Pay
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
			<CartModal show={modalState} handleClose={() => setModalState(false)} />
		</div>
	);
}

export default Cart;
