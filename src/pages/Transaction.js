import React, { useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';

function Transaction() {
	const [state, dispatch] = useContext(AppContext);
	function formatPrice(price) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0,
		}).format(price);
	}

	return (
		<div className='d-block mx-auto' style={{ width: '70%' }}>
			<h2 className='text-overide'>Income Transaction</h2>
			<Table className='mt-4' bordered hover>
				<thead>
					<tr>
						<th>No</th>
						<th>Name</th>
						<th>Address</th>
						<th>Post Code</th>
						<th>Income</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{state.transaction.map((trans, id) => (
						<tr key={id}>
							<td>{trans.transactionId}</td>
							<td>{trans.dataUser.name}</td>
							<td>{trans.dataUser.address}</td>
							<td>{trans.dataUser.postCode}</td>
							<td>
								{formatPrice(
									trans.products
										.map((product) => product.subTotal)
										.reduce((a, b) => a + b, 0)
								)}
							</td>
							<td className='text-warning'>Waiting Approval</td>
							<td className='d-flex justify-content-evenly'>
								<Button variant='danger' size='sm'>
									Decline
								</Button>
								<Button variant='success' size='sm'>
									Approve
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Transaction;
