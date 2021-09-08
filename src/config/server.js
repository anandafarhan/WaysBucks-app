import axios from 'axios';

//*------------------------------  Initiate Axios  ------------------------------*//
const baseURL = 'http://localhost:5000/api/v1';

export const API = axios.create({
	baseURL,
});

const configJSON = {
	headers: {
		'Content-Type': 'application/json',
	},
};

const configMultiPart = {
	headers: {
		'Content-Type': 'multipart/form-data',
	},
};

//*------------------------------  Set Auth Header  ------------------------------*//
export const setAuthToken = (token) => {
	if (token) {
		API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.common['Authorization'];
	}
};

//*------------------------------  Register User  ------------------------------*//
export async function registerUser(inputData) {
	try {
		const response = await API.post('/auth/register', inputData, configJSON);
		setAuthToken(response.data.data.token);
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Login User  ------------------------------*//

export async function loginUser(inputData) {
	try {
		const response = await API.post('/auth/login', inputData, configJSON);
		setAuthToken(response.data.data.token);
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Update User  ------------------------------*//

export async function updateUser(inputData) {
	try {
		const response = await API.patch('/user', inputData, configMultiPart);
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Get All Products  ------------------------------*//
export async function getProducts() {
	try {
		const response = await API.get('/products');

		return response.data.data.products;
	} catch (err) {
		console.error('ERR_CONFIG GET PRODUCTS:', err);
	}
}

//*------------------------------  Get Product by Id  ------------------------------*//
export async function getProduct(id) {
	try {
		const response = await API.get(`/product/${id}`);

		return response.data.data.product;
	} catch (err) {
		console.error('ERR_CONFIG GET PRODUCT:', err);
	}
}

//*------------------------------  Add Product  ------------------------------*//
export async function addProduct(inputData) {
	try {
		const response = await API.post('/product', inputData, configMultiPart);

		return response.data.data;
	} catch (err) {
		console.error('ERR_CONFIG ADD PRODUCT:', err);
	}
}

//*------------------------------  Get All Toppings  ------------------------------*//
export async function getToppings() {
	try {
		const response = await API.get(`/toppings`);

		return response.data.data.toppings;
	} catch (err) {
		console.error('ERR_CONFIG GET TOPPINGS:', err);
	}
}

//*------------------------------  Add Topping  ------------------------------*//
export async function addTopping(inputData) {
	try {
		const response = await API.post('/topping', inputData, configMultiPart);

		return response.data.data;
	} catch (err) {
		console.error('ERR_CONFIG ADD TOPPING:', err);
	}
}

//*------------------------------  Get All Transaction  ------------------------------*//
export async function getTransactions(inputData) {
	try {
		const response = await API.get('/transactions');

		return response.data.data.transactions;
	} catch (err) {
		console.error('ERR_CONFIG GET ALL TRANSACTION:', err);
	}
}

//*------------------------------  Get User Transaction  ------------------------------*//
export async function getUserTransactions(inputData) {
	try {
		const response = await API.get('/my-transactions');

		return response.data.data.transaction;
	} catch (err) {
		console.error('ERR_CONFIG GET USER TRANSACTION:', err);
	}
}

//*------------------------------  Add User Transaction  ------------------------------*//
export async function addTransaction(inputData) {
	try {
		const response = await API.post('/transaction', inputData, configMultiPart);

		return response.data.data;
	} catch (err) {
		console.error('ERR_CONFIG ADD USER TRANSACTION:', err);
	}
}

//*------------------------------  Update Transaction Status  ------------------------------*//
export async function updateTransaction(id, status) {
	try {
		const response = await API.patch(`/transaction/${id}`, status, configJSON);

		return response.data.data;
	} catch (err) {
		console.error('ERR_CONFIG CONFIRM TRANSACTION:', err);
	}
}
