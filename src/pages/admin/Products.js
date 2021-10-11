import React, { useEffect, useState } from 'react';
import { Button, Table, Image, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { deleteProduct, getProducts, updateProduct } from '../../config/server';

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
	const [modalStatus, setModalStatus] = useState(initialModal);

	async function handleDelete(id) {
		setWait(true);
		await deleteProduct(id);
		setModalConfirm(initialModal);
		setWait(false);
	}

	async function handleChangeStatus(action, id) {
		setWait(true);
		switch (action) {
			case 'setAvailable':
				await updateProduct({ status: 1 }, id);
				setModalStatus(initialModal);
				return setWait(false);

			case 'setNotAvailable':
				await updateProduct({ status: 0 }, id);
				setModalStatus(initialModal);
				return setWait(false);

			default:
				return new Error();
		}
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
							<th width='150px'>Status</th>
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
												product.image ? product.image : `${process.env.PUBLIC_URL}/assets/img/icons/product.svg`
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
											: product.TransactionProducts.reduce((a, b) => parseInt(a) + parseInt(b.qty), 0)}
									</td>
									<td className={product.status ? 'text-scs' : 'text-cancel'}>
										{product.status ? 'Available' : 'Not Available'}
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
											{product.status ? (
												<Button
													variant='danger'
													size='sm'
													className='mb-1'
													onClick={() =>
														setModalStatus({
															show: true,
															id: product.id,
															name: product.name,
															action: 'setNotAvailable',
														})
													}
												>
													Set as Not Available
												</Button>
											) : (
												<Button
													variant='success'
													size='sm'
													className='mb-1'
													onClick={() =>
														setModalStatus({
															show: true,
															id: product.id,
															name: product.name,
															action: 'setAvailable',
														})
													}
												>
													Set as Available
												</Button>
											)}
											<Button
												variant='danger'
												size='sm'
												className='mb-1'
												onClick={() => setModalConfirm({ show: true, id: product.id, name: product.name })}
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
				handleClose={() => setModalConfirm(initialModal)}
			/>
			<ConfirmModal
				show={modalStatus.show}
				name={modalStatus.name}
				body={`You're about to change product ${modalStatus.name} status!`}
				variant='danger'
				actionName='Change Status'
				action={() => handleChangeStatus(modalStatus.action, modalStatus.id)}
				handleClose={() => setModalStatus(initialModal)}
			/>
		</div>
	);
}

export default Products;
