import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { getTransactions, updateTransaction } from '../../config/server';
import { AppContext } from '../../context/AppContext';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function Transaction() {
	const title = 'List of Income Transactions';
	document.title = `Waysbucks | ${title}`;
	const [wait, setWait] = useState(false);
	const [transactions, setTransactions] = useState(null);
	function formatPrice(price) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0,
		}).format(price);
	}

	async function getAllTransactions() {
		const response = await getTransactions();

		setTransactions(response);

		console.log(response);
	}

	async function handleApprove(id) {
		setWait(true);
		const body = { status: 'On The Way' };
		const response = await updateTransaction(id, body);
		setWait(false);
	}

	async function handleDecline(id) {
		setWait(true);
		const body = { status: 'Canceled' };
		const response = await updateTransaction(id, body);
		setWait(false);
	}

	useEffect(() => {
		getAllTransactions();
	}, [wait]);

	let n = 0;

	return (
		<div className='d-block mx-auto' style={{ width: '70%' }}>
			<h2 className='text-overide'>{title}</h2>
			{!transactions ? (
				''
			) : (
				<Table className='mt-4' bordered hover>
					<thead className='bg-dark bg-gradient text-white'>
						<tr>
							<th className='text-center'>No</th>
							<th>Name</th>
							<th>Address</th>
							<th>Post Code</th>
							<th>Income</th>
							<th>Status</th>
							<th width='230px'>Action</th>
						</tr>
					</thead>
					<tbody className='align-items-center'>
						{transactions.map((transaction) => (
							<tr key={transaction.id}>
								<td className='text-center'>{(n += 1)}</td>
								<td>{transaction.name}</td>
								<td>{transaction.address}</td>
								<td>{transaction.postCode}</td>
								<td style={{ color: '#061E99' }}>
									{formatPrice(transaction.income)}
								</td>
								<td
									className={
										transaction.status === 'Waiting Approval'
											? 'text-wa'
											: transaction.status === 'On The Way'
											? 'text-otw'
											: transaction.status === 'Success'
											? 'text-scs'
											: 'text-cancel'
									}
								>
									{transaction.status}
								</td>
								<td className='d-flex justify-content-evenly'>
									{transaction.status === 'Waiting Approval' ? (
										wait ? (
											<>
												<Button variant='danger' size='sm' disabled>
													Decline
												</Button>
												<Button variant='success' size='sm' disabled>
													Approve
												</Button>
											</>
										) : (
											<>
												<Button
													variant='danger'
													size='sm'
													onClick={() => handleDecline(transaction.id)}
												>
													Decline
												</Button>
												<Button
													variant='success'
													size='sm'
													onClick={() => handleApprove(transaction.id)}
												>
													Approve
												</Button>
											</>
										)
									) : transaction.status === 'Canceled' ? (
										<FaTimesCircle size='1.5rem' color='#E24C4B' />
									) : (
										<FaCheckCircle size='1.5rem' color='#3BB54A' />
									)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
}

export default Transaction;
