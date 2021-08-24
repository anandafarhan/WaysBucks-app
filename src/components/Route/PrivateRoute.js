import { useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import ErrorModal from '../Modal/ErrorModal';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const [state] = useContext(AppContext);
	const [modalState, setModalState] = useState(false);

	return (
		<>
			<Route
				{...rest}
				render={(props) => {
					if (state.isLogin === true) {
						return <Component {...props} />;
					} else {
						setModalState(true);
						return <Redirect to='/' />;
					}
				}}
			/>
			<ErrorModal show={modalState} handleClose={() => setModalState(false)} />
		</>
	);
};

export default PrivateRoute;
