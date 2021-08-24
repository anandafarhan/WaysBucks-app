import React from 'react';
import { Nav, Button } from 'react-bootstrap';

function Guest({ dispatch }) {
	return (
		<>
			<Nav.Link>
				<Button
					variant='outline-danger'
					size='sm'
					style={{ width: '100px' }}
					onClick={() => dispatch({ type: 'ModalL' })}
				>
					Login
				</Button>
			</Nav.Link>
			<Nav.Link>
				<Button
					variant='danger'
					size='sm'
					className='bg-overide'
					style={{ width: '100px' }}
					onClick={() => dispatch({ type: 'ModalR' })}
				>
					Register
				</Button>
			</Nav.Link>
		</>
	);
}

export default Guest;
