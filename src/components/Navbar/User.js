import React, { useContext } from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

function User() {
	const [state, dispatch] = useContext(AppContext);

	function handleLogout() {
		dispatch({
			type: 'LOGOUT',
		});
	}

	const avatar = state.user.avatar
		? state.user.avatar
		: `https://avatars.dicebear.com/api/initials/${state.user.name.split(' ').join('+')}.svg`;

	return (
		<>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav' style={{ flexGrow: '0' }}>
				<Nav>
					<div className='position-relative mx-3 my-auto'>
						{state.carts.length > 0 && (
							<span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
								{state.carts.length}
								<span className='visually-hidden'>product in cart</span>
							</span>
						)}
						<Link to='/cart'>
							<img
								src={`${process.env.PUBLIC_URL}/assets/img/icons/cart.svg`}
								className='icons-img'
								width='40rem'
								alt='Cart'
							/>
						</Link>
					</div>
					<Dropdown as={Nav.Item} className='ml-3'>
						<Dropdown.Toggle as={Nav.Link} className='text-white'>
							<img
								className='rounded-circle'
								src={avatar}
								alt='user pic'
								width='50px'
								height='50px'
								style={{ position: 'relative', border: '2px solid #bd0707' }}
							/>
						</Dropdown.Toggle>
						<Dropdown.Menu align='end'>
							<Dropdown.Item as={Link} to='/profile'>
								<img
									src={`${process.env.PUBLIC_URL}/assets/img/icons/user.svg`}
									className='icons-img mx-3'
									width='30rem'
									alt='Profile'
								/>
								Profile
							</Dropdown.Item>
							<Dropdown.Item onClick={handleLogout}>
								<img
									src={`${process.env.PUBLIC_URL}/assets/img/icons/logout.svg`}
									className='icons-img mx-3'
									width='30rem'
									alt='Logout'
								/>
								Logout
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Nav>
			</Navbar.Collapse>
		</>
	);
}

export default User;
