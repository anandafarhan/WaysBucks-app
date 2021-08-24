import React, { useState } from 'react';
import { useEffect, useContext } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ToppingCard from '../components/Product/ToppingCard';
import { getProduct } from '../config/server';
import { AppContext } from '../context/AppContext';

function Product() {
	const [state, dispatch] = useContext(AppContext);
	const [loading, setLoading] = useState(true);
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

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		setLoading(true);
		let data = await getProduct(parseInt(id));
		setProduct(data);
		setToppings(data.toppings);
		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [checkedToppings, setCheckedToppings] = useState({});
	const handleChange = (event) => {
		setCheckedToppings({
			...checkedToppings,
			[event.target.id]: event.target.checked,
		});
	};

	const selectedToppingsId = [];
	for (let key in checkedToppings) {
		checkedToppings[key]
			? selectedToppingsId.push(key)
			: selectedToppingsId.splice(key, 1);
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
				subTotal,
				toppings: selectedToppings,
			},
		});
	}

	return loading || !product || toppings.length < 1 ? (
		<Loading />
	) : (
		<div className='d-block mx-auto' style={{ width: '70%' }}>
			<Row>
				<Col md={5} className='text-center'>
					<Image
						src={`../assets/img/products/${product.img}`}
						width='100%'
					></Image>
				</Col>
				<Col md={7}>
					<h1 className='text-overide'>{product.name}</h1>
					<span className='text-overide'>{formatPrice(product.price)}</span>
					<Row className='my-5'>
						<h5 className='text-overide'>Topping</h5>
						{toppings.map((topping) => {
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
						<Row className='justify-content-between my-4 text-overide'>
							<Col>
								<h5>Total</h5>
							</Col>
							<Col>
								<h5 className='text-end'>{formatPrice(subTotal)}</h5>
							</Col>
							<div className='d-grid gap-2 mt-3'>
								<Button
									variant='danger'
									className='bg-overide'
									onClick={handleAddtoCart}
								>
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
