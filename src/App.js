import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import './App.css';
import Headers from './components/Navbar/Headers';
import PrivateRoute from './components/Route/PrivateRoute';
import PrivateAdminRoute from './components/Route/PrivateAdminRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Transaction from './pages/Transaction';
import AddProduct from './pages/AddProduct';
import AddTopping from './pages/AddTopping';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Loading from './components/Loading';
import { AppContext } from './context/AppContext';

function App() {
	const [state, dispatch] = useContext(AppContext);
	const [loading, setLoading] = useState(true);
	init();

	async function init() {
		const dataAllUser = await require('./data/Users.json');
		const dataAllProduct = await require('./data/Products.json');
		const dataAllTopping = await require('./data/Toppings.json');
		const currentAllUserData = await JSON.parse(
			localStorage.getItem('dataAllUsers')
		);
		const initialData = JSON.parse(dataAllUser);

		if (!currentAllUserData) {
			localStorage.setItem('dataAllUsers', JSON.stringify(dataAllUser));
		} else if (initialData.length !== currentAllUserData.length) {
			const newData = [...currentAllUserData, ...dataAllUser];
			localStorage.setItem('dataAllUsers', JSON.stringify(newData));
		} else {
			localStorage.setItem('dataAllUsers', JSON.stringify(dataAllUser));
		}

		const ProductnTopping = dataAllProduct.map((data) => ({
			...data,
			toppings: dataAllTopping,
		}));
		window.localStorage.setItem(
			'dataAllProducts',
			JSON.stringify(ProductnTopping)
		);
	}

	async function loadUser() {
		const response = JSON.parse(localStorage.getItem('token'));
		if (response) {
			setLoading(true);
			dispatch({
				type: 'LOAD_USER',
				payload: response,
			});
			setLoading(false);
		} else {
			setLoading(false);
			dispatch({
				type: 'AUTH_ERROR',
			});
		}
	}

	useEffect(() => {
		loadUser();
		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return loading ? (
		<Loading />
	) : (
		<Router>
			<Headers />
			<div style={{ marginTop: '120px' }}>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/signin' component={Home} />
					<PrivateRoute exact path='/cart' component={Cart} />
					<PrivateRoute exact path='/profile' component={Profile} />
					<PrivateRoute exact path='/product/:id' component={Product} />
					<PrivateAdminRoute exact path='/addTopping' component={AddTopping} />
					<PrivateAdminRoute exact path='/addProduct' component={AddProduct} />
					<PrivateAdminRoute
						exact
						path='/transaction'
						component={Transaction}
					/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
