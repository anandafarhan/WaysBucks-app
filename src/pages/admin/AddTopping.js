import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AddDataProduct from '../../components/Product/AddDataProduct';
import { addTopping } from '../../config/server';
import { AppContext } from '../../context/AppContext';

function AddTopping() {
	document.title = `Waysbucks | Add Topping`;
	const [state, dispatch] = useContext(AppContext);

	const route = useHistory();
	async function handleSubmit(e, formData) {
		e.preventDefault();
		dispatch({ type: 'IS_LOADING_TRUE' });

		const form = new FormData();

		form.set('name', formData.name);
		form.set('price', formData.price);
		form.set('image', formData.image[0], formData.image[0].name);

		const response = await addTopping(form);

		route.push('/toppings');
		dispatch({ type: 'IS_LOADING_FALSE' });
	}
	return (
		<div>
			<AddDataProduct suffix='Topping' handleSubmit={handleSubmit} />
		</div>
	);
}

export default AddTopping;
