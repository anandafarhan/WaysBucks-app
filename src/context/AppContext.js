import { createContext, useReducer } from 'react';

export const AppContext = createContext();

function isArrMatch(a, b) {
	let match = JSON.stringify(a) === JSON.stringify(b);
	return match;
}

const initialState = {
	isLoading: false,
	isLogin: false,
	modalLogin: false,
	modalRegister: false,
	carts: [],
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_CART':
			const isExist = state.carts.find(
				(product) =>
					product.id + JSON.stringify(product.toppings) ===
					action.payload.id + JSON.stringify(action.payload.toppings)
			);
			if (isExist) {
				return {
					...state,
					carts: state.carts.map((product) => {
						const matchedArray =
							product.toppings.length < 1 ? true : isArrMatch(product.toppings, action.payload.toppings);
						if (product.id === action.payload.id && matchedArray) {
							return {
								...product,
								qty: product.qty < 50 ? product.qty + 1 : product.qty,
								subTotal: (product.qty < 50 ? product.qty + 1 : product.qty) * product.initialPrice,
							};
						} else {
							return product;
						}
					}),
				};
			} else {
				const addedCarts = [...state.carts];
				addedCarts.push(action.payload);
				return {
					...state,
					carts: [...addedCarts],
				};
			}

		case 'DECREASE_QTY':
			return {
				...state,
				carts: state.carts.map((product) => {
					const matchedArray =
						product.toppings.length < 1 ? true : isArrMatch(product.toppings, action.payload.toppings);
					if (product.id === action.payload.id && matchedArray) {
						return {
							...product,
							qty: product.qty > 1 ? product.qty - 1 : product.qty,
							subTotal: (product.qty > 1 ? product.qty - 1 : product.qty) * product.initialPrice,
						};
					} else {
						return product;
					}
				}),
			};

		case 'INCREASE_QTY':
			return {
				...state,
				carts: state.carts.map((product) => {
					const matchedArray =
						product.toppings.length < 1 ? true : isArrMatch(product.toppings, action.payload.toppings);
					if (product.id === action.payload.id && matchedArray) {
						return {
							...product,
							qty: product.qty < 50 ? product.qty + 1 : product.qty,
							subTotal: (product.qty < 50 ? product.qty + 1 : product.qty) * product.initialPrice,
						};
					} else {
						return product;
					}
				}),
			};

		case 'CHANGE_QTY':
			return {
				...state,
				carts: state.carts.map((product) => {
					const matchedArray =
						product.toppings.length < 1 ? true : isArrMatch(product.toppings, action.payload.toppings);
					if (product.id === action.payload.id && matchedArray) {
						return {
							...product,
							qty: action.payload.qty < 1 ? 1 : action.payload.qty > 50 ? 50 : action.payload.qty,
							subTotal:
								(action.payload.qty < 1 ? 1 : action.payload.qty > 50 ? 50 : action.payload.qty) *
								product.initialPrice,
						};
					} else {
						return product;
					}
				}),
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

		case 'REGISTER':
			localStorage.setItem('token', action.payload.token);
			console.log(action.payload);
			return {
				...state,
				isLogin: true,
				isLoading: false,
				user: {
					id: action.payload.id,
					name: action.payload.fullName,
					email: action.payload.email,
					role: action.payload.role,
					avatar: null,
				},
			};

		case 'LOGIN':
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				isLogin: true,
				isLoading: false,
				user: {
					id: action.payload.id,
					name: action.payload.fullName,
					email: action.payload.email,
					role: action.payload.role,
					avatar: action.payload.avatar === 'false' ? null : action.payload.avatar,
				},
			};

		case 'LOAD_USER':
			return {
				...state,
				isLogin: true,
				isLoading: false,
				user: {
					id: action.payload.id,
					name: action.payload.fullName,
					email: action.payload.email,
					role: action.payload.role,
					avatar: action.payload.avatar === 'false' ? null : action.payload.avatar,
				},
			};

		case 'AUTH_ERROR':
			localStorage.removeItem('token');
			return {
				...state,
				isLogin: false,
				isLoading: false,
				user: null,
			};

		case 'LOGOUT':
			localStorage.removeItem('token');

			return {
				...state,
				isLogin: false,
				isLoading: false,
				user: null,
				carts: [],
			};

		case 'MODAL_LOGIN':
			return {
				...state,
				modalLogin: !state.modalLogin,
			};
		case 'MODAL_REGISTER':
			return {
				...state,
				modalRegister: !state.modalRegister,
			};
		case 'SWITCH_MODAL':
			return {
				...state,
				modalRegister: !state.modalRegister,
				modalLogin: !state.modalLogin,
			};

		case 'IS_LOADING_TRUE':
			return {
				...state,
				isLoading: true,
			};
		case 'IS_LOADING_FALSE':
			return {
				...state,
				isLoading: false,
			};

		default:
			throw new Error();
	}
};

export const AppContextProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return <AppContext.Provider value={[state, dispatch]}>{props.children}</AppContext.Provider>;
};
