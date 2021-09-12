import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import LoginModal from '../Modal/LoginModal';
import RegisterModal from '../Modal/RegisterModal';
import User from './User';
import Guest from './Guest';
import Admin from './Admin';
import { AppContext } from '../../context/AppContext';

function Headers() {
	const [state, dispatch] = useContext(AppContext);

	const navStatus = () => {
		if (!state.isLogin) {
			return <Guest dispatch={dispatch} />;
		}
		switch (state.user.role) {
			case 'admin':
				return <Admin />;
			case 'user':
				return <User />;
			default:
				return <Guest dispatch={dispatch} />;
		}
	};

	return (
		<>
			<Navbar collapseOnSelect expand='lg' className='fixed-top shadow-sm' bg='white'>
				<Container className='d-flex justify-content-between'>
					<Link to='/'>
						<Navbar.Brand>
							<img
								src={`${process.env.PUBLIC_URL}/assets/img/Logo.svg`}
								alt='Waysbucks'
								width='70px'
							/>
						</Navbar.Brand>
					</Link>
					{navStatus()}
				</Container>
			</Navbar>
			<LoginModal
				handleClose={() => dispatch({ type: 'MODAL_LOGIN' })}
				switchModal={() => dispatch({ type: 'SWITCH_MODAL' })}
				show={state.modalLogin}
			/>
			<RegisterModal
				handleClose={() => dispatch({ type: 'MODAL_REGISTER' })}
				switchModal={() => dispatch({ type: 'SWITCH_MODAL' })}
				show={state.modalRegister}
			/>
		</>
	);
}

export default Headers;
