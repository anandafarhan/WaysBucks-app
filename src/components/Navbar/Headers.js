import React, { useReducer, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Logo from '../../assets/Logo.svg';
import LoginModal from '../Modal/LoginModal';
import RegisterModal from '../Modal/RegisterModal';
import User from './User';
import Guest from './Guest';
import Admin from './Admin';
import { AppContext } from '../../context/AppContext';

function Headers() {
	const [state, dispatch] = useContext(AppContext);

	// const initialState = {
	// 	modalLogin: false,
	// 	modalRegister: false,
	// };

	// function reducer(state, action) {
	// 	switch (action.type) {
	// 		case 'ModalL':
	// 			return {
	// 				modalLogin: !state.modalLogin,
	// 			};
	// 		case 'ModalR':
	// 			return {
	// 				modalRegister: !state.modalRegister,
	// 			};
	// 		case 'switchModal':
	// 			return {
	// 				modalRegister: !state.modalRegister,
	// 				modalLogin: !state.modalLogin,
	// 			};
	// 		case 'forceRender':
	// 			return {};
	// 		default:
	// 			throw new Error();
	// 	}
	// }

	// const [modalState, modalDispatch] = useReducer(reducer, initialState);

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
				throw new Error();
		}
	};

	return (
		<>
			<Navbar
				collapseOnSelect
				expand='lg'
				className='fixed-top shadow-sm'
				bg='white'
			>
				<Container>
					<Link to='/'>
						<Navbar.Brand>
							<img src={Logo} alt='...' width='70px' />
						</Navbar.Brand>
					</Link>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='me-auto'></Nav>
						<Nav>
							{navStatus()}
							{/* {isLogedIn === 'true' ? (
								<User handleLogout={handleLogout} />
							) : (
								<Guest dispatch={dispatch} />
							)} */}
						</Nav>
					</Navbar.Collapse>
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
