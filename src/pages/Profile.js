import React, { useContext } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';

function Profile() {
	const [state] = useContext(AppContext);
	const transaction = state.transaction;
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
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	console.log(state);
	return (
		<Row
			className='mx-auto my-2 justify-content-between'
			style={{ width: '70%' }}
		>
			<Col md={6}>
				<h2 className='text-overide my-4'>My Profile</h2>
				<Row>
					<Col md={5}>
						<Image
							src='./assets/img/user/Avatar.svg'
							style={{ borderRadius: '10px' }}
							fluid
						/>
					</Col>
					<Col md={5}>
						<Row className='mb-4'>
							<h4 style={{ color: '#613D2B' }}>Full Name</h4>
							<span>{state.user.name}</span>
						</Row>
						<Row className=''>
							<h4 style={{ color: '#613D2B' }}>Email</h4>
							<span>{state.user.email}</span>
						</Row>
					</Col>
				</Row>
			</Col>
			<Col md={6}>
				<h2 className='text-overide my-4' style={{ color: '#613D2B' }}>
					My Transaction
				</h2>
				{transaction
					.filter((trs) => trs.userId === state.user.id)
					.map((trans, tid) => (
						<Row
							style={{ borderRadius: '10px', backgroundColor: '#F6DADA' }}
							className='mb-3 p-3 border-box'
							id='transaction'
							key={tid}
						>
							<Col
								className='d-flex flex-column text-overide overflow-auto'
								style={{
									height: '250px',
									justifyContent: trans.products.length <= 1 ? 'center' : '',
								}}
								md={9}
							>
								{trans.products.map((product, pid) => (
									<Row id='product' key={pid}>
										<Col md={3}>
											<Image
												src={`${process.env.PUBLIC_URL}/assets/img/products/${product.img}`}
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
											<h5>{product.name}</h5>
											<p style={{ fontSize: '11px' }}>
												<strong>{days[trans.dateTime.getDay()]}</strong>,{' '}
												{trans.dateTime.getDate()}{' '}
												{months[trans.dateTime.getMonth()]}{' '}
												{trans.dateTime.getFullYear()}
											</p>
											<p className='fw-light mb-0' style={{ fontSize: '12px' }}>
												<span className='fw-bold'>Topping: </span>
												{product.toppings
													.map((topping) => topping.name)
													.join(', ')}
											</p>
											<p className='fw-light' style={{ fontSize: '12px' }}>
												Price : {formatPrice(product.subTotal)}
											</p>
										</Col>
									</Row>
								))}
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
								<Image
									src={`${process.env.PUBLIC_URL}/assets/img/qr-code.svg`}
									className='mb-2'
									width='100px'
								/>
								<div
									style={{
										fontSize: '12px',
										width: '80px',
										borderRadius: '5px',
									}}
									className='bg-warning p-1 mb-1 text-center'
								>
									Waiting Approval
								</div>
								<div
									style={{ fontSize: '12px' }}
									className='mb-1 text-overide text-nowrap'
								>
									<strong>
										Sub Total :{' '}
										{formatPrice(
											trans.products
												.map((product) => product.subTotal)
												.reduce((a, b) => a + b, 0)
										)}{' '}
									</strong>
								</div>
							</Col>
						</Row>
					))}
			</Col>
		</Row>
	);
}

export default Profile;
