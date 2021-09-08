import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProducts } from '../../config/server';
import { AppContext } from '../../context/AppContext';

function Products() {
	const title = 'List of Products';
	document.title = `Waysbucks | ${title}`;
	const [wait, setWait] = useState(false);
	const [products, setProducts] = useState(null);
	function formatPrice(price) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0,
		}).format(price);
	}

	async function getAllProducts() {
		const response = await getProducts();
		setProducts(response);
	}

	useEffect(() => {
		getAllProducts();
	}, [wait]);

	let n = 0;

	return (
		<div className='d-block mx-auto' style={{ width: '70%' }}>
			<Row>
				<Col md={6}>
					<h2 className='text-overide'>{title}</h2>
				</Col>
				<Col md={6} className='d-flex justify-content-end'>
					<Link to='/addProduct'>
						<Button variant='success'>Add Product</Button>
					</Link>
				</Col>
			</Row>
			{!products ? (
				''
			) : (
				<Table className='mt-4' bordered hover>
					<thead className='bg-dark bg-gradient text-white'>
						<tr>
							<th className='text-center'>No</th>
							<th>Image</th>
							<th>Product Name</th>
							<th>Price</th>
							<th>Sold</th>
							<th width='200px'>Action</th>
						</tr>
					</thead>
					<tbody className='align-items-center'>
						{products.map((product) => (
							<tr key={product.id}>
								<td className='text-center'>{(n += 1)}</td>
								<td>
									<Image
										src={
											product.image
												? product.image
												: `${process.env.PUBLIC_URL}/assets/img/icons/product.svg`
										}
										alt={product.name}
										width='80px'
									/>
								</td>
								<td>{product.name}</td>
								<td>{formatPrice(product.price)}</td>
								<td>x</td>
								<td className='d-flex justify-content-evenly flex-column'>
									<Button variant='warning' size='sm' className='mb-1' disabled>
										Edit
									</Button>
									<Button variant='danger' size='sm' className='mb-1' disabled>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
}

export default Products;
