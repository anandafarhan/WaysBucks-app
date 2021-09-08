import React, { useContext } from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

function Admin() {
	const [state, dispatch] = useContext(AppContext);

	function handleLogout() {
		dispatch({
			type: 'LOGOUT',
		});
	}

	const avatar = state.user.avatar
		? state.user.avatar
		: `https://avatars.dicebear.com/api/initials/${state.user.name
				.split(' ')
				.join('+')}.svg`;

	return (
		<>
			<Nav className='text-overide fw-bold'>
				<Nav.Link as={Link} to='/'>
					Transaction
				</Nav.Link>

				<Nav.Link as={Link} to='/products'>
					Product
				</Nav.Link>
				<Nav.Link as={Link} to='/toppings'>
					Topping
				</Nav.Link>
			</Nav>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav' style={{ flexGrow: '0' }}>
				<Nav>
					<Dropdown as={Nav.Item} className='ml-3'>
						<Dropdown.Toggle as={Nav.Link} className='text-white'>
							<img
								className='rounded-circle'
								src={avatar}
								alt='user pic'
								width='50px'
								style={{ position: 'relative', border: '2px solid #bd0707' }}
							/>
						</Dropdown.Toggle>
						<Dropdown.Menu
							align='end'
							className='shadow-sm'
							style={{ border: 0 }}
						>
							<Dropdown.Item as={Link} to='/addProduct'>
								<img
									src={`${process.env.PUBLIC_URL}/assets/img/icons/product.svg`}
									className='icons-img'
									width='30rem'
									alt='Product'
								/>{' '}
								Add Product
							</Dropdown.Item>
							<Dropdown.Item as={Link} to='/addTopping'>
								<img
									src={`${process.env.PUBLIC_URL}/assets/img/icons/topping.svg`}
									className='icons-img'
									width='30rem'
									alt='Topping'
								/>{' '}
								Add Topping
							</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item onClick={handleLogout}>
								<img
									src={`${process.env.PUBLIC_URL}/assets/img/icons/logout.svg`}
									className='icons-img'
									width='30rem'
									alt='Logout'
								/>{' '}
								Logout
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Nav>
			</Navbar.Collapse>
		</>
	);
}

export default Admin;
