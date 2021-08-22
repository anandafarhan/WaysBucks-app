import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { getProducts } from '../../config/server';
import Loading from '../Loading';
import Cards from './Cards';

function Featured() {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		setLoading(true);
		let data = await getProducts();
		setProducts(data);
		setLoading(false);
	}, []);

	return loading || !products ? (
		<Loading />
	) : (
		<div className='d-block mx-auto' style={{ width: '70%' }}>
			<h1 className='text-overide'>Let's order</h1>
			<Row>
				{products?.map((data) => (
					<Col key={data.id} md={3}>
						<Cards
							key={data.id}
							dataId={data.id}
							product={data.name}
							price={data.price}
							img={data.img}
						/>
					</Col>
				))}
			</Row>
		</div>
	);
}

export default Featured;
