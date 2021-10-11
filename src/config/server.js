import axios from 'axios';

//*------------------------------  Initiate Axios  ------------------------------*//
const baseURL = 'https://afr-waysbucks.herokuapp.com/api/v1';

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

//*------------------------------  Get All Available Products  ------------------------------*//
export async function getAvlProducts() {
	try {
		const response = await API.get('/avlProducts');

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

//*------------------------------  Update Product with Img  ------------------------------*//
export async function updateProductImg(inputData, id) {
	try {
		const response = await API.patch(`/productImg/${id}`, inputData, configMultiPart);

		return response.data.data;
	} catch (err) {
		console.error('ERR_CONFIG UPDATE PRODUCT:', err);
	}
}

//*------------------------------  Update Product  ------------------------------*//
export async function updateProduct(inputData, id) {
	try {
		const response = await API.patch(`/product/${id}`, inputData, configJSON);

		return response.data.data;
	} catch (err) {
		console.error('ERR_CONFIG UPDATE PRODUCT:', err);
	}
}

//*------------------------------  Delete Product  ------------------------------*//
export async function deleteProduct(id) {
	try {
		const response = await API.delete(`/product/${id}`);

		return response;
	} catch (err) {
		console.error('ERR_CONFIG DELETE PRODUCT:', err);
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

//*------------------------------  Get All Available Toppings  ------------------------------*//
export async function getAvlToppings() {
	try {
		const response = await API.get(`/avlToppings`);

		return response.data.data.toppings;
	} catch (err) {
		console.error('ERR_CONFIG GET TOPPINGS:', err);
	}
}

//*------------------------------  Get Product by Id  ------------------------------*//
export async function getTopping(id) {
	try {
		const response = await API.get(`/topping/${id}`);

		return response.data.data.topping;
	} catch (err) {
		console.error('ERR_CONFIG GET TOPPING:', err);
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

//*------------------------------  Update Topping with Img  ------------------------------*//
export async function updateToppingImg(inputData, id) {
	try {
		const response = await API.patch(`/toppingImg/${id}`, inputData, configMultiPart);

		return response.data.data;
	} catch (err) {
		console.error('ERR_CONFIG UPDATE TOPPING:', err);
	}
}

//*------------------------------  Update Topping  ------------------------------*//
export async function updateTopping(inputData, id) {
	try {
		const response = await API.patch(`/topping/${id}`, inputData, configJSON);

		return response.data.data;
	} catch (err) {
		console.error('ERR_CONFIG UPDATE TOPPING:', err);
	}
}

//*------------------------------  Delete Topping  ------------------------------*//
export async function deleteTopping(id) {
	try {
		const response = await API.delete(`/topping/${id}`);

		return response;
	} catch (err) {
		console.error('ERR_CONFIG DELETE TOPPING:', err);
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

//*------------------------------  Get Transaction Product Count  ------------------------------*//
export async function getTPCount(id) {
	try {
		const response = await API.get(`/tProductCount/${id}`);

		return response.data.data.count;
	} catch (err) {
		console.error('ERR_CONFIG GET PRODUCT TRANSACTION COUNT:', err);
	}
}

//*------------------------------  Get Transaction Topping Count  ------------------------------*//
export async function getTTCount(id) {
	try {
		const response = await API.get(`/tToppingCount/${id}`);

		return response.data.data.count;
	} catch (err) {
		console.error('ERR_CONFIG GET TOPPING TRANSACTION COUNT:', err);
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

//*------------------------------  Get User Addresses  ------------------------------*//
export async function getUserAddresses() {
	try {
		const response = await API.get(`/my-addresses/`);

		return response.data.data.addresses;
	} catch (err) {
		console.error('ERR_CONFIG GET USER ADDRESSES:', err);
	}
}

//*------------------------------  Add User Addresses  ------------------------------*//
export async function addUserAddress(inputData) {
	try {
		const response = await API.post(`/address`, inputData, configJSON);

		return response;
	} catch (err) {
		console.error('ERR_CONFIG GET USER ADDRESSES:', err);
	}
}

//*------------------------------  Update Address  ------------------------------*//
export async function updateAddress(inputData, id) {
	try {
		const response = await API.patch(`/address/${id}`, inputData, configJSON);

		return response.data.data;
	} catch (err) {
		console.error('ERR_CONFIG UPDATE ADDRESS:', err);
	}
}

//*------------------------------  Set Primary Address  ------------------------------*//
export async function setPrimaryAddress(id) {
	try {
		const response = await API.patch(`/setPrimaryAddress/${id}`);

		return response.data.data;
	} catch (err) {
		console.error('ERR_CONFIG UPDATE ADDRESS:', err);
	}
}

//*------------------------------  Delete Address  ------------------------------*//
export async function deleteAddress(id) {
	try {
		const response = await API.delete(`/address/${id}`);

		return response;
	} catch (err) {
		console.error('ERR_CONFIG DELETE ADDRESS:', err);
	}
}
