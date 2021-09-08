import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Image, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getToppings } from '../../config/server';
import { AppContext } from '../../context/AppContext';

function Toppings() {
	const title = 'List of Toppings';
	document.title = `Waysbucks | ${title}`;
	const [wait, setWait] = useState(false);
	const [toppings, setToppings] = useState(null);
	function formatPrice(price) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0,
		}).format(price);
	}

	async function getAllToppings() {
		const response = await getToppings();
		setToppings(response);
	}

	useEffect(() => {
		getAllToppings();
	}, [wait]);

	let n = 0;

	return (
		<div className='d-block mx-auto' style={{ width: '70%' }}>
			<Row>
				<Col md={6}>
					<h2 className='text-overide'>{title}</h2>
				</Col>
				<Col md={6} className='d-flex justify-content-end'>
					<Link to='/addTopping'>
						<Button variant='success'>Add Topping</Button>
					</Link>
				</Col>
			</Row>
			{!toppings ? (
				''
			) : (
				<Table className='mt-4' bordered hover>
					<thead className='bg-dark bg-gradient text-white'>
						<tr>
							<th className='text-center'>No</th>
							<th>Image</th>
							<th>Topping Name</th>
							<th>Price</th>
							<th>Sold</th>
							<th width='200px'>Action</th>
						</tr>
					</thead>
					<tbody className='align-items-center'>
						{toppings.map((topping) => (
							<tr key={topping.id}>
								<td className='text-center'>{(n += 1)}</td>
								<td>
									<Image
										src={
											topping.image
												? topping.image
												: `${process.env.PUBLIC_URL}/assets/img/icons/topping.svg`
										}
										alt={topping.name}
										width='80px'
									/>
								</td>
								<td>{topping.name}</td>
								<td>{formatPrice(topping.price)}</td>
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

export default Toppings;
