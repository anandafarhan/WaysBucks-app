import { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = {
	isLogin: false,
	carts: [],
	transaction: [],
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_CART':
			const addedCarts = [...state.carts];
			addedCarts.push(action.payload);
			return {
				...state,
				carts: [...addedCarts],
			};

		case 'REMOVE_CART':
			const newCarts = [...state.carts];
			newCarts.splice(action.payload, 1);
			return {
				...state,
				carts: [...newCarts],
			};

		case 'CLEAR_CART':
			return {
				...state,
				carts: [],
			};

		case 'ADD_TRANSACTION':
			const transaction = [...state.transaction];
			transaction.push(action.payload);
			return {
				...state,
				transaction: [...transaction],
			};

		case 'LOGIN':
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				isLogin: true,
				isLoading: false,
				user: {
					id: action.payload.id,
					name: action.payload.name,
					email: action.payload.email,
					role: action.payload.role,
					avatar:
						action.payload.avatar === 'false' ? null : action.payload.avatar,
				},
			};

		case 'USER_LOADED':
			return {
				...state,
				isLogin: true,
				isLoading: false,
				user: {
					id: action.payload.id,
					name: action.payload.name,
					email: action.payload.email,
					role: action.payload.role,
					avatar:
						action.payload.avatar === 'false' ? null : action.payload.avatar,
				},
			};

		case 'REGISTER':
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				isLogin: true,
				isLoading: false,
				user: {
					id: action.payload.id,
					name: action.payload.name,
					email: action.payload.email,
					role: action.payload.role,
					avatar: null,
				},
			};

		case 'AUTH_ERROR':
		case 'LOGOUT':
			localStorage.removeItem('token');

			return {
				...state,
				isLogin: false,
				isLoading: false,
				user: null,
			};

		default:
			throw new Error();
	}
};

export const AppContextProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AppContext.Provider value={[state, dispatch]}>
			{props.children}
		</AppContext.Provider>
	);
};
