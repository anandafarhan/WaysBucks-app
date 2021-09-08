import React from 'react';
import { Nav, Button } from 'react-bootstrap';

function Guest({ dispatch }) {
	return (
		<div className='d-flex flex-row'>
			<Button
				variant='outline-danger'
				className='mx-2'
				size='sm'
				style={{ width: '100px' }}
				onClick={() => dispatch({ type: 'MODAL_LOGIN' })}
			>
				Login
			</Button>

			<Button
				variant='danger'
				className='mx-2 bg-overide'
				size='sm'
				style={{ width: '100px' }}
				onClick={() => dispatch({ type: 'MODAL_REGISTER' })}
			>
				Register
			</Button>
		</div>
	);
}

export default Guest;
