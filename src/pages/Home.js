import React, { useContext } from 'react';
import Hero from '../components/Hero';
import Featured from '../components/Product/Featured';
import { AppContext } from '../context/AppContext';
import Transaction from './admin/Transaction';

function Home() {
	const [state] = useContext(AppContext);
	document.title = `Waysbucks`;

	return (
		<>
			{state.user ? (
				state.user.role === 'admin' ? (
					<>
						<Transaction />
					</>
				) : (
					<>
						<Hero />
						<Featured />
					</>
				)
			) : (
				<>
					<Hero />
					<Featured />
				</>
			)}
		</>
	);
}

export default Home;
