import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';
import FormProduct from '../../components/Product/FormProduct';
import { addProduct } from '../../config/server';
import { AppContext } from '../../context/AppContext';

function AddProduct() {
	document.title = `Waysbucks | Add Product`;
	const [state, dispatch] = useContext(AppContext);

	const route = useHistory();
	async function handleSubmit(e, formData) {
		e.preventDefault();
		dispatch({ type: 'IS_LOADING_TRUE' });

		const form = new FormData();

		form.set('name', formData.name);
		form.set('price', formData.price);
		try {
			form.set('image', formData.image[0], formData.image[0].name);
		} catch (error) {}

		await addProduct(form);

		route.push('/products');
		dispatch({ type: 'IS_LOADING_FALSE' });
	}
	return state.isLoading ? (
		<Loading />
	) : (
		<div>
			<FormProduct prefix='Add' suffix='Product' handleSubmit={handleSubmit} />
		</div>
	);
}

export default AddProduct;
