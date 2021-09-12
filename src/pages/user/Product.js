import React, { useState } from 'react';
import { useEffect, useContext } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import ToppingCard from '../../components/Product/ToppingCard';
import { getProduct, getToppings } from '../../config/server';
import { AppContext } from '../../context/AppContext';

function Product() {
	const title = 'Product Detail';
	const [state, dispatch] = useContext(AppContext);
	const [product, setProduct] = useState({});
	const [toppings, setToppings] = useState([]);
	let { id } = useParams();

	function formatPrice(price) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0,
		}).format(price);
	}

	async function loadProduct() {
		try {
			let product = await getProduct(parseInt(id));
			let toppings = await getToppings();
			setProduct(product);
			setToppings(toppings);
			document.title = `Waysbucks | ${product.name ? product.name : title}`;
		} catch (error) {
			console.error(error, state);
		}
	}

	const [checkedToppings, setCheckedToppings] = useState({});
	const handleChange = (event) => {
		setCheckedToppings({
			...checkedToppings,
			[event.target.id]: event.target.checked,
		});
	};

	const selectedToppingsId = [];
	for (let key in checkedToppings) {
		checkedToppings[key] ? selectedToppingsId.push(key) : selectedToppingsId.splice(key, 1);
	}

	const selectedToppings = selectedToppingsId.map((selectedToppingId) =>
		toppings.find((topping) => topping.id === parseInt(selectedToppingId))
	);

	const subTotal = selectedToppings
		.map((selectedTopping) => selectedTopping.price)
		.reduce((prev, curr) => prev + curr, product.price);

	function handleAddtoCart() {
		dispatch({
			type: 'ADD_CART',
			payload: {
				...product,
				qty: 1,
				initialPrice: subTotal,
				subTotal,
				toppings: selectedToppings,
			},
		});
	}

	useEffect(() => {
		loadProduct();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return !product ? (
		<Loading />
	) : (
		<div className='d-block mx-auto' style={{ width: '70%' }}>
			<Row>
				<Col md={5} className='text-center'>
					<Image src={product.image} width='100%' style={{ borderRadius: '10px' }} />
				</Col>
				<Col md={7}>
					<h1 className='text-overide'>{product.name}</h1>
					<span className='text-overide'>{formatPrice(product.price)}</span>
					<Row className='my-4'>
						<h5 className='text-overide'>Topping</h5>
						<Row style={{ height: '300px', overflowY: 'auto' }}>
							{toppings.length < 1
								? 'No Topping'
								: toppings.map((topping) => {
										return (
											<Col md={3} key={topping.id}>
												<ToppingCard
													topping={topping}
													key={topping.id}
													onChange={handleChange}
													checked={checkedToppings[topping.id] || false}
												/>
											</Col>
										);
								  })}
						</Row>
						<Row>
							<Col md={2}></Col>
						</Row>
						<Row className='justify-content-between my-4 text-overide'>
							<Col>
								<h5>Total</h5>
							</Col>
							<Col>
								<h5 className='text-end'>{formatPrice(subTotal)}</h5>
							</Col>
							<div className='d-grid gap-2 mt-3'>
								<Button variant='danger' className='bg-overide' onClick={handleAddtoCart}>
									Add to Cart
								</Button>
							</div>
						</Row>
					</Row>
				</Col>
			</Row>
		</div>
	);
}

export default Product;
