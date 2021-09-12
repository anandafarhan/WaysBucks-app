import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import FormProduct from '../../components/Product/FormProduct';
import { getProduct, updateProduct, updateProductImg } from '../../config/server';
import { AppContext } from '../../context/AppContext';

function EditProduct() {
	const title = 'Product';
	let { id } = useParams();
	const [product, setProduct] = useState(null);
	const [state, dispatch] = useContext(AppContext);

	async function loadProduct() {
		try {
			let product = await getProduct(parseInt(id));
			setProduct(product);
			document.title = `Waysbucks | Edit ${product.name ? product.name : title}`;
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
			await updateProductImg(form, id);
		} else {
			await updateProduct({ name: formData.name, price: formData.price }, id);
		}
		route.push('/products');
		dispatch({ type: 'IS_LOADING_FALSE' });
	}

	useEffect(() => {
		loadProduct();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return state.isLoading || !product ? (
		<Loading />
	) : (
		<div>
			<FormProduct prefix='Edit' suffix='Product' payload={product} handleSubmit={handleSubmit} />
		</div>
	);
}

export default EditProduct;
