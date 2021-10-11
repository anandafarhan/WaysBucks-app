import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

function FormProduct({ prefix, suffix, payload, handleSubmit }) {
	const [preview, setPreview] = useState(null);
	const [formData, setFormData] = useState({
		name: '',
		price: '',
		image: '',
	});

	function handleChange(e) {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
		}));

		if (e.target.type === 'file') {
			let url = e.target.files.length < 1 ? null : URL.createObjectURL(e.target.files[0]);
			setPreview(url);
		}
	}

	useEffect(() => {
		if (prefix === 'Edit') {
			setFormData({ name: payload.name, price: payload.price, image: '' });
			payload.image && setPreview(payload.image);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Row className='mx-auto mt-5 pt-4 justify-content-between' style={{ width: '70%' }}>
			<Col md={7}>
				<h1 className='text-overide mt-3 mb-5'>
					{prefix} {suffix}
				</h1>
				<Form onSubmit={(e) => handleSubmit(e, formData)}>
					<Form.Group className='mb-5' controlId='productName'>
						<Form.Control
							type='text'
							name='name'
							placeholder={`${suffix} Name`}
							value={formData.name}
							onChange={(e) => handleChange(e)}
							className='input-overide'
							required
						/>
					</Form.Group>

					<Form.Group className='mb-5' controlId='Price'>
						<Form.Control
							type='number'
							name='price'
							step='1000'
							placeholder='Price'
							value={formData.price}
							onChange={(e) => handleChange(e)}
							className='input-overide'
							required
						/>
					</Form.Group>

					<Form.Group className='mb-4' controlId='productImg'>
						<label htmlFor='productImg' style={{ width: '100%' }}>
							<div
								className='d-flex justify-content-between align-items-center input-overide text-muted'
								style={{ borderRadius: '5px', padding: '5px', height: '40px' }}
							>
								<span>
									{formData.image === null || formData.image.length < 1
										? 'Select Image'
										: formData.image[0].name}
								</span>
								<Image src={`${process.env.PUBLIC_URL}/assets/img/icons/clippy.svg`} alt='clippy' />
							</div>
						</label>
						<Form.Control
							type='file'
							name='image'
							placeholder='Product Image'
							onChange={(e) => handleChange(e)}
							className='input-overide'
							style={{ display: 'none' }}
							accept='.jpg,.jpeg,.png,.svg'
						/>
					</Form.Group>
					<div className='d-grid gap-2 mt-5'>
						<Button variant='danger' className='bg-overide' type='submit'>
							Submit {suffix}
						</Button>
					</div>
				</Form>
			</Col>
			<Col md={5} className='text-center mt-5'>
				<Image
					src={preview ? preview : `${process.env.PUBLIC_URL}/assets/img/${suffix}.png`}
					width='80%'
					rounded
				></Image>
			</Col>
		</Row>
	);
}

export default FormProduct;
