//USER ACCESS
export async function getProducts() {
	try {
		const products = await JSON.parse(
			window.localStorage.getItem('dataAllProducts')
		);
		return products;
	} catch (err) {
		console.log('ERR_CONFIG GET PRODUCTS:', err);
	}
}

export async function getProduct(id) {
	try {
		const products = await JSON.parse(
			window.localStorage.getItem('dataAllProducts')
		);
		let product = null;
		products.forEach((prod) => {
			if (prod.id === id) {
				product = prod;
			}
		});
		return product;
	} catch (err) {
		console.log('ERR_CONFIG GET PRODUCT:', err);
	}
}

export async function registerUser(inputData) {
	try {
		const dataAllUser = await JSON.parse(
			window.localStorage.getItem('dataAllUsers')
		);
		dataAllUser.push(inputData);
		window.localStorage.setItem('dataAllUsers', JSON.stringify(dataAllUser));
		return inputData;
	} catch (err) {
		console.log('ERR_CONFIG REGISTER USER:', err);
	}
}

export async function loginUser(inputData) {
	try {
		const dataAllUser = await JSON.parse(
			window.localStorage.getItem('dataAllUsers')
		);
		let currentUser = null;
		await dataAllUser.forEach((user) => {
			if (
				user.email === inputData.email &&
				user.password === inputData.password
			) {
				currentUser = user;
			}
		});
		return currentUser;
	} catch (err) {
		console.log('ERR_CONFIG LOGIN:', err);
	}
}
