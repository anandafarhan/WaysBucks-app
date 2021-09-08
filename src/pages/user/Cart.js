import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Form, Button, Image } from 'react-bootstrap';
import { BiSad, BiTrash, BiReceipt } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import CartModal from '../../components/Modal/CartModal';
import { addTransaction } from '../../config/server';
import { AppContext } from '../../context/AppContext';

function Cart(props) {
	const title = 'My Cart';
	document.title = `Waysbucks | ${title}`;
	const route = useHistory();
	const [state, dispatch] = useContext(AppContext);
	const { carts } = state;
	const [modalState, setModalState] = useState(false);
	const [preview, setPreview] = useState(null);
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
			form.set('name', formData.name);
			form.set('email', formData.email);
			form.set('phone', formData.phone);
			form.set('postCode', formData.postCode);
			form.set('address', formData.address);
			form.set('income', total);
			form.set('transactionProducts', JSON.stringify(transactionProducts));
			try {
				form.set('attachment', formData.attachment[0], formData.attachment[0].name);
			} catch (error) {}

			setModalState(true);
			const response = await addTransaction(form);

			route.push('/profile');

			dispatch({
				type: 'CLEAR_CART',
			});
		}
	}

	const [total, setTotal] = useState(0);
	const [totalQty, setTotalQty] = useState(0);
	useEffect(() => {
		setTotal(carts.map((product) => product.subTotal).reduce((a, b) => a + b, 0));
		setTotalQty(carts.map((product) => product.qty).reduce((a, b) => a + b, 0));
	}, [carts]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	return (
		<div className='d-block mx-auto' style={{ width: '70%' }}>
			<h2 className='text-overide'>{title}</h2>
			<Row>
				<Col md={7} className='mt-4'>
					<div className='border-bottom'>
						<h6 className='text-overide'>Review Your Order</h6>
					</div>
					<div
						className='border-bottom '
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
											<p>
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
												<span className='fw-bold text-overide-2'>Qty :</span> {product.qty}
											</p>
										</div>
									</Col>
									<Col md={2} className='text-end'>
										<p className='text-overide mt-3 mb-0'>{formatPrice(product.subTotal)}</p>
										<div className='text-overide mt-2'>
											<Button variant='danger' size='sm' onClick={() => handleRemoveCart(i)}>
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
											<p className='text-overide'>{totalQty}</p>
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
										{preview ? (
											<Image src={preview} alt='receipt' width='80px' />
										) : (
											<BiReceipt size='3rem' />
										)}

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
										required
									/>
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
