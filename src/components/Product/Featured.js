import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { getProducts } from '../../config/server';
import Loading from '../Loading';
import Cards from './Cards';

function Featured() {
	const [products, setProducts] = useState([]);

	async function loadProducts() {
		let data = await getProducts();
		setProducts(data);
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		loadProducts();
		return () => setProducts(null);
	}, []);

	return !products ? (
		<Loading />
	) : (
		<>
			<span className='anchor' id='featured'></span>
			<div className='d-block mx-auto' style={{ width: '70%' }}>
				<h1 className='text-overide'>Let's order</h1>
				<Row>
					{products.length < 1
						? null
						: products.map((data) => (
								<Col key={data.id} md={3}>
									<Cards
										key={data.id}
										dataId={data.id}
										product={data.name}
										price={data.price}
										image={data.image}
									/>
								</Col>
						  ))}
				</Row>
			</div>
		</>
	);
}

export default Featured;
