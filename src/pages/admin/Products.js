import React, { useEffect, useState } from 'react';
import { Button, Table, Image, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { deleteProduct, getProducts } from '../../config/server';

function Products() {
	const title = 'List of Products';
	document.title = `Waysbucks | ${title}`;
	const route = useHistory();
	const [wait, setWait] = useState(false);
	const [loading, setLoading] = useState(true);
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
		setLoading(false);
	}

	const initialModal = { show: false, id: '', name: '' };
	const [modalConfirm, setModalConfirm] = useState(initialModal);
	function handleConfirmModal(id, name) {
		setModalConfirm({ show: true, id, name });
	}

	function handleClose() {
		setModalConfirm(initialModal);
	}

	async function handleDelete(id) {
		setWait(true);
		await deleteProduct(id);
		setModalConfirm(initialModal);
		setWait(false);
	}

	useEffect(() => {
		getAllProducts();
	}, [wait]);

	let n = 0;

	return loading ? (
		<Loading />
	) : (
		<div className='d-block mx-auto' style={{ width: '70%' }}>
			<Row>
				<Col md={6}>
					<h2 className='text-overide'>{title}</h2>
				</Col>
				<Col md={6} className='d-flex justify-content-end'>
					<Link to='/addProduct'>
						<Button variant='outline-danger'>Add Product</Button>
					</Link>
				</Col>
			</Row>
			{!products ? (
				''
			) : (
				<Table className='mt-4 align-middle' bordered hover>
					<thead>
						<tr>
							<th className='text-center'>No</th>
							<th width='100px'>Image</th>
							<th>Product Name</th>
							<th>Price</th>
							<th>Sold</th>
							<th width='200px'>Action</th>
						</tr>
					</thead>
					<tbody className='align-items-center'>
						{products.map((product) => {
							return (
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
											width='100%'
										/>
									</td>
									<td>{product.name}</td>
									<td>{formatPrice(product.price)}</td>
									<td>
										{product.TransactionProducts.length < 1
											? 0
											: product.TransactionProducts.reduce(
													(a, b) => parseInt(a) + parseInt(b.qty),
													0
											  )}
									</td>
									<td>
										<div className='d-flex justify-content-evenly flex-column'>
											<Button
												variant='outline-danger'
												size='sm'
												className='mb-1'
												onClick={() => route.push(`/editProduct/${product.id}`)}
											>
												Edit
											</Button>
											<Button
												variant='danger'
												size='sm'
												className='mb-1'
												onClick={() => handleConfirmModal(product.id, product.name)}
											>
												Delete
											</Button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			)}
			<ConfirmModal
				show={modalConfirm.show}
				name={modalConfirm.name}
				body="Warning, this action can't be undone!"
				variant='danger'
				actionName='Delete!'
				action={() => handleDelete(modalConfirm.id)}
				handleClose={handleClose}
			/>
		</div>
	);
}

export default Products;
