import { Card } from 'react-bootstrap';

function ToppingCard({ ...props }) {
	const { id, name, imgUrl } = props.topping;

	return (
		<Card border='white' className='my-1'>
			<Card.Body>
				<label className='block-check'>
					<img
						src={`../assets/img/toppings/${imgUrl}`}
						alt={name}
						className='img-topping'
					/>
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
			<Card.Text className='fs-6 fw-normal text-center text-nowrap text-overide'>
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
