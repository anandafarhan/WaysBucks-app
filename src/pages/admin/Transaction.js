import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Loading from '../../components/Loading';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { getTransactions, updateTransaction } from '../../config/server';
import { FaCheckCircle, FaTimesCircle, FaStumbleuponCircle } from 'react-icons/fa';

function Transaction() {
	const title = 'List of Income Transactions';
	document.title = `Waysbucks | ${title}`;
	const [wait, setWait] = useState(false);
	const [loading, setLoading] = useState(true);
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
		setLoading(false);
	}

	const initialModal = {
		show: false,
		id: '',
		name: '',
		action: null,
		actionName: '',
		variant: 'danger',
	};
	const [modalConfirm, setModalConfirm] = useState(initialModal);

	function handleConfirmModal(id, name, action, actionName, variant = 'danger') {
		setModalConfirm({ show: true, id, name, action, actionName, variant });
	}

	function handleClose() {
		setModalConfirm(initialModal);
	}

	async function handleApprove(id) {
		setWait(true);
		const body = { status: 'On The Way' };
		await updateTransaction(id, body);
		handleClose();
		setWait(false);
	}

	async function handleDecline(id) {
		setWait(true);
		const body = { status: 'Canceled' };
		await updateTransaction(id, body);
		handleClose();
		setWait(false);
	}

	useEffect(() => {
		getAllTransactions();
	}, [wait]);

	let n = 0;

	return loading ? (
		<Loading />
	) : (
		<div className='d-block mx-auto' style={{ width: '70%' }}>
			<h2 className='text-overide'>{title}</h2>
			{!transactions ? (
				''
			) : (
				<Table className='mt-4 align-middle' bordered hover>
					<thead>
						<tr>
							<th className='text-center'>No</th>
							<th>Name</th>
							<th>Address</th>
							<th>Post Code</th>
							<th>Income</th>
							<th>Attachment</th>
							<th>Status</th>
							<th width='230px'>Action</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((transaction) => (
							<tr key={transaction.id} style={{ height: '50px' }}>
								<td className='text-center'>{(n += 1)}</td>
								<td>{transaction.name}</td>
								<td>{transaction.address}</td>
								<td>{transaction.postCode}</td>
								<td style={{ color: '#061E99' }}>{formatPrice(transaction.income)}</td>
								<td style={{ color: '#061E99' }}>
									<a href={transaction.attachment}>Attachment</a>
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
								<td>
									<div className='d-flex justify-content-evenly'>
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
														onClick={() =>
															handleConfirmModal(
																transaction.id,
																transaction.name,
																() => handleDecline(transaction.id),
																'Decline'
															)
														}
													>
														Decline
													</Button>
													<Button
														variant='success'
														size='sm'
														onClick={() =>
															handleConfirmModal(
																transaction.id,
																transaction.name,
																() => handleApprove(transaction.id),
																'Approve',
																'warning'
															)
														}
													>
														Approve
													</Button>
												</>
											)
										) : transaction.status === 'Canceled' ? (
											<FaTimesCircle size='1.5rem' className='text-cancel' />
										) : transaction.status === 'On The Way' ? (
											<FaStumbleuponCircle size='1.5rem' className='text-otw' />
										) : (
											<FaCheckCircle size='1.5rem' className='text-scs' />
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
			<ConfirmModal
				show={modalConfirm.show}
				name=''
				body="Warning, this action can't be undone!"
				variant={modalConfirm.variant}
				actionName={modalConfirm.actionName}
				action={modalConfirm.action}
				handleClose={handleClose}
			/>
		</div>
	);
}

export default Transaction;
