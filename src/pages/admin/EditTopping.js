import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import FormProduct from '../../components/Product/FormProduct';
import { getTopping, updateTopping, updateToppingImg } from '../../config/server';
import { AppContext } from '../../context/AppContext';

function EditTopping() {
	const title = 'Topping';
	let { id } = useParams();
	const [topping, setTopping] = useState(null);
	const [state, dispatch] = useContext(AppContext);

	async function loadTopping() {
		try {
			let topping = await getTopping(parseInt(id));
			setTopping(topping);
			document.title = `Waysbucks | Edit ${topping.name ? topping.name : title}`;
		} catch (error) {
			console.error(error, state);
		}
	}

	const route = useHistory();
	async function handleSubmit(e, formData) {
		e.preventDefault();
		dispatch({ type: 'IS_LOADING_TRUE' });
		if (formData.image) {
			const form = new FormData();
			form.set('name', formData.name);
			form.set('price', formData.price);
			try {
				form.set('image', formData.image[0], formData.image[0].name);
			} catch (error) {}
			await updateToppingImg(form, id);
		} else {
			await updateTopping({ name: formData.name, price: formData.price }, id);
		}
		route.push('/toppings');
		dispatch({ type: 'IS_LOADING_FALSE' });
	}

	useEffect(() => {
		loadTopping();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return state.isLoading || !topping ? (
		<Loading />
	) : (
		<div>
			<FormProduct prefix='Edit' suffix='Topping' payload={topping} handleSubmit={handleSubmit} />
		</div>
	);
}

export default EditTopping;
