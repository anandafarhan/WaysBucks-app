import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

function ToppingCard({ ...props }) {
	const { id, name, image } = props.topping;
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (props.checked) {
			setChecked(true);
		} else {
			setChecked(false);
		}
	}, [props.checked]);

	return (
		<Card
			border='white'
			className='my-1'
			style={{ filter: checked ? 'drop-shadow(0 0 2px #dddddd)' : 'drop-shadow(0 0 0 #dddddd)' }}
		>
			<Card.Body>
				<label className='block-check'>
					<img src={image} alt={name} className='img-topping' />
					<input
						type='checkbox'
						id={id}
						className='hidden-check'
						onChange={props.onChange}
						checked={props.checked}
					/>
					<span className='checkmark'></span>
				</label>
			</Card.Body>
			<Card.Text
				className='fw-normal text-center text-nowrap text-overide'
				style={{ fontSize: '.9rem' }}
			>
				<span>{name}</span>
			</Card.Text>
		</Card>

		// <Card>
		// 	<Card.Img
		// 		className='img-topping'
		// 		variant='top'
		// 		src={`../assets/img/toppings/${imgUrl}`}
		// 		alt={name}
		// 	/>
		// 	<label className='block-check' for={id}>
		// 		<input
		// 			type='checkbox'
		// 			controlId={id}
		// 			className='hidden-check'
		// 			onChange={props.onChange}
		// 			checked={props.checked}
		// 		/>
		// 		<span className='checkmark'></span>
		// 	</label>
		// 	<Card.Body>
		// 		<Card.Text className='fs-6' style={{ textDecoration: 'none' }}>
		// 			<span>{name}</span>
		// 		</Card.Text>
		// 	</Card.Body>
		// </Card>
	);
}

export default ToppingCard;
