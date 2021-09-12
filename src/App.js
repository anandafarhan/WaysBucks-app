import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import PrivateAdminRoute from './components/Route/PrivateAdminRoute';
import PrivateRoute from './components/Route/PrivateRoute';
import { API, setAuthToken } from './config/server';
import { AppContext } from './context/AppContext';
import ScrollToTop from 'react-router-scroll-top';

import Transaction from './pages/admin/Transaction';
import Headers from './components/Navbar/Headers';
import AddProduct from './pages/admin/AddProduct';
import AddTopping from './pages/admin/AddTopping';
import Products from './pages/admin/Products';
import Toppings from './pages/admin/Toppings';
import Profile from './pages/user/Profile';
import Product from './pages/user/Product';
import Loading from './components/Loading';
import Cart from './pages/user/Cart';
import Home from './pages/Home';
import './App.css';
import EditProduct from './pages/admin/EditProduct';
import EditTopping from './pages/admin/EditTopping';

function App() {
	const [state, dispatch] = useContext(AppContext);

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	const loadUser = async () => {
		dispatch({ type: 'IS_LOADING_TRUE' });
		try {
			const response = await API('/auth');

			dispatch({
				type: 'LOAD_USER',
				payload: response.data.data,
			});
		} catch (err) {
			dispatch({
				type: 'AUTH_ERROR',
			});
		}
		dispatch({ type: 'IS_LOADING_FALSE' });
	};

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return state.isLoading ? (
		<Loading />
	) : (
		<Router>
			<ScrollToTop />
			<Headers />
			<div style={{ marginTop: '100px' }}>
				<Switch>
					<Route exact path='/' component={Home} />
					<PrivateRoute exact path='/cart' component={Cart} />
					<PrivateRoute exact path='/profile' component={Profile} />
					<PrivateRoute exact path='/product/:id' component={Product} />
					<PrivateAdminRoute exact path='/products' component={Products} />
					<PrivateAdminRoute exact path='/toppings' component={Toppings} />
					<PrivateAdminRoute exact path='/addProduct' component={AddProduct} />
					<PrivateAdminRoute exact path='/addTopping' component={AddTopping} />
					<PrivateAdminRoute exact path='/editProduct/:id' component={EditProduct} />
					<PrivateAdminRoute exact path='/editTopping/:id' component={EditTopping} />
					<PrivateAdminRoute exact path='/transaction' component={Transaction} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
